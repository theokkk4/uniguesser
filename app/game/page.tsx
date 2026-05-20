'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import StreetView from '@/components/StreetView';
import MiniMap from '@/components/MiniMap';
import ScoreModal from '@/components/ScoreModal';
import RoundCountdown from '@/components/RoundCountdown';
import RoundTimer from '@/components/RoundTimer';
import { getRandomLocations, getSchoolCenters, getSchools } from '@/data/locations';
import { validatePanorama, type ValidationResult } from '@/lib/validateLocation';
import { haversineDistance, calculateScore, calculateBonuses } from '@/lib/haversine';
import { reverseGeocode } from '@/lib/geocode';
import type { Location } from '@/data/locations';
import type { BonusInfo } from '@/lib/haversine';

interface ValidatedLocation {
  location: Location;
  panoLat: number;
  panoLng: number;
}

const libraries: ('places' | 'geometry')[] = [];
const TIMER_DURATION = 90;

export default function GamePage() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [validatedLocations, setValidatedLocations] = useState<ValidatedLocation[] | null>(null);
  const [validating, setValidating] = useState(true);
  const [currentRound, setCurrentRound] = useState(0);
  const [guessPosition, setGuessPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [roundResults, setRoundResults] = useState<
    { distance: number; score: number; school: string; locationName: string; difficulty: string }[]
  >([]);
  const [finished, setFinished] = useState(false);
  const [streetViewReady, setStreetViewReady] = useState(false);
  const [countdownActive, setCountdownActive] = useState(false);
  const [currentBonus, setCurrentBonus] = useState<BonusInfo | null>(null);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const schoolCenters = getSchoolCenters();
  const schools = getSchools();

  const router = useRouter();
  const cancelledRef = useRef(false);
  const guessPositionRef = useRef<{ lat: number; lng: number } | null>(null);
  const streetViewReadyRef = useRef(false);
  const currentLocationRef = useRef<Location | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.google) return;

    cancelledRef.current = false;

    async function doValidation() {
      const svc = new window.google.maps.StreetViewService();
      const valid: ValidatedLocation[] = [];
      let attempts = 0;

      while (valid.length < 5 && attempts < 15 && !cancelledRef.current) {
        const candidates = getRandomLocations(20);
        for (const loc of candidates) {
          if (valid.length >= 5 || cancelledRef.current) break;
          const result = await validatePanorama(svc, loc.lat, loc.lng);
          if (result.valid && result.panoLat != null && result.panoLng != null) {
            const dup = valid.find(v => v.location.lat === loc.lat && v.location.lng === loc.lng);
            if (!dup) {
              valid.push({ location: loc, panoLat: result.panoLat, panoLng: result.panoLng });
            }
          }
        }
        attempts++;
      }

      if (!cancelledRef.current) {
        setValidatedLocations(valid.slice(0, 5));
        setValidating(false);
      }
    }

    doValidation();
    return () => {
      cancelledRef.current = true;
    };
  }, [isLoaded]);

  const currentValidated = validatedLocations?.[currentRound] ?? null;
  const currentLocation: Location | null = currentValidated?.location ?? null;
  const isLastRound = currentRound === 4;

  useEffect(() => {
    currentLocationRef.current = currentLocation;
  }, [currentLocation]);

  const handleStreetViewReady = useCallback(() => {
    streetViewReadyRef.current = true;
    setStreetViewReady(true);
  }, []);

  const handleGuess = useCallback((lat: number, lng: number) => {
    const pos = { lat, lng };
    guessPositionRef.current = pos;
    setGuessPosition(pos);
  }, []);

  const processSubmit = useCallback(
    async (guessedPos: { lat: number; lng: number } | null) => {
      const loc = currentLocationRef.current;
      if (!loc || !guessedPos) return;

      const distance = haversineDistance(loc.lat, loc.lng, guessedPos.lat, guessedPos.lng);
      const baseScore = calculateScore(distance);
      setCurrentDistance(distance);

      let bonus: BonusInfo = { stateMatch: false, cityRadius: false, stateBonus: 0, cityBonus: 0 };
      let totalBonus = 0;
      const result = await reverseGeocode(guessedPos.lat, guessedPos.lng);
      if (result.state) {
        const stateMatch = result.state === loc.state;
        const cityBonuses = calculateBonuses(guessedPos.lat, guessedPos.lng, loc.state, loc.cityLat, loc.cityLng);
        bonus = {
          stateMatch,
          cityRadius: cityBonuses.cityRadius,
          stateBonus: stateMatch ? 1000 : 0,
          cityBonus: cityBonuses.cityBonus,
        };
        totalBonus = bonus.stateBonus + bonus.cityBonus;
      }
      const totalRoundScore = baseScore + totalBonus;
      setCurrentScore(totalRoundScore);
      setBonusPoints(totalBonus);
      setCurrentBonus(bonus);
      setTotalScore(prev => prev + totalRoundScore);
      setRoundResults(prev => [
        ...prev,
        { distance, score: totalRoundScore, school: loc.school, locationName: loc.name, difficulty: loc.difficulty },
      ]);
      setShowModal(true);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (!guessPositionRef.current || !streetViewReadyRef.current) return;
    processSubmit(guessPositionRef.current);
  }, [processSubmit]);

  const handleTimeUp = useCallback(() => {
    const guessed = guessPositionRef.current;
    if (guessed) {
      processSubmit(guessed);
    } else {
      const loc = currentLocationRef.current;
      if (!loc) return;
      const fallbackGuess = { lat: 24 + Math.random() * 25, lng: -125 + Math.random() * 60 };
      guessPositionRef.current = fallbackGuess;
      setGuessPosition(fallbackGuess);
      processSubmit(fallbackGuess);
    }
  }, [processSubmit]);

  const handleNext = useCallback(() => {
    setShowModal(false);
    setGuessPosition(null);
    guessPositionRef.current = null;
    setStreetViewReady(false);
    streetViewReadyRef.current = false;
    if (isLastRound) {
      setFinished(true);
    } else {
      setCurrentRound(prev => prev + 1);
      setCountdownActive(true);
    }
  }, [isLastRound]);

  const handleCountdownComplete = useCallback(() => {
    setCountdownActive(false);
  }, []);

  const handleRestart = useCallback(() => {
    window.location.reload();
  }, []);

  const formatDistance = (d: number) =>
    d < 1000 ? `${d.toFixed(0)}m` : `${(d / 1000).toFixed(2)}km`;

  const timerKey = `${currentRound}-${currentLocation?.lat}-${currentLocation?.lng}`;
  const showTimer = streetViewReady && !showModal && !countdownActive && !finished;

  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-black p-4 safe-top safe-bottom">
        <div className="bg-zinc-900/95 border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl text-center space-y-4">
          <div className="text-3xl text-zinc-600">⚠</div>
          <h2 className="text-white font-bold text-lg">Failed to load</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Google Maps couldn&apos;t load. Check your API key configuration and ensure the
            Maps JavaScript API and Street View API are enabled.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-zinc-200 active:scale-[0.97] transition-all duration-200 text-sm"
            >
              Retry
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full border border-white/10 text-zinc-300 font-medium py-3 px-6 rounded-xl hover:bg-zinc-800 active:scale-[0.97] transition-all duration-200 text-sm"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-black safe-top safe-bottom">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-white/40 text-xs font-mono">Loading Google Maps...</span>
        </div>
      </div>
    );
  }

  if (validating || !validatedLocations) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-black safe-top safe-bottom">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <div className="text-center space-y-1">
            <p className="text-white/50 text-sm font-mono">Validating locations...</p>
            <p className="text-white/30 text-[10px] font-mono">Checking Street View coverage</p>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const bestScore = roundResults.length > 0
      ? Math.max(...roundResults.map(r => r.score))
      : 0;
    const avgDistance = roundResults.length > 0
      ? roundResults.reduce((a, r) => a + r.distance, 0) / roundResults.length
      : 0;

    return (
      <div className="h-full w-full flex items-center justify-center bg-black p-4 safe-top safe-bottom">
        <div className="bg-zinc-900/95 border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl animate-fadeIn">
          <div className="text-center space-y-6">
            <div>
              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono mb-1">
                Game Over
              </p>
              <h2 className="text-4xl font-bold text-white">{totalScore}</h2>
              <p className="text-zinc-500 text-[10px] font-mono mt-1 uppercase tracking-wider">
                Total Points
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-4 space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Best Round</span>
                <span className="font-mono text-white">{bestScore}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Avg Distance</span>
                <span className="font-mono text-white">{formatDistance(avgDistance)}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {roundResults.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-zinc-800/30 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-zinc-600 font-mono shrink-0">R{i + 1}</span>
                    <span className="text-zinc-400 truncate">{r.school}</span>
                  </div>
                  <span className="font-mono text-zinc-300 shrink-0 ml-2">
                    {formatDistance(r.distance)} · {r.score}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleRestart}
                className="w-full bg-white text-black font-semibold py-3.5 px-6 rounded-xl hover:bg-zinc-200 active:scale-[0.97] transition-all duration-200 text-sm"
              >
                Play Again
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full border border-white/10 text-zinc-300 font-medium py-3.5 px-6 rounded-xl hover:bg-zinc-800 active:scale-[0.97] transition-all duration-200 text-sm"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentLocation) return null;

  return (
    <div className="h-full w-full relative bg-black overflow-hidden safe-top safe-bottom">
      <StreetView
        key={`${currentValidated!.panoLat}-${currentValidated!.panoLng}`}
        lat={currentValidated!.panoLat}
        lng={currentValidated!.panoLng}
        isLoaded={isLoaded}
        onReady={handleStreetViewReady}
      />

      <div className="absolute top-0 left-0 right-0 z-10 px-3 sm:px-4 pt-3 sm:pt-4 pb-8 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-white/40 hover:text-white/80 transition-colors text-xs font-mono"
          >
            ← Home
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            {showTimer && (
              <RoundTimer
                key={timerKey}
                duration={TIMER_DURATION}
                running={showTimer}
                onTimeUp={handleTimeUp}
              />
            )}
            <span className="text-white/50 text-[10px] sm:text-xs font-mono">
              {currentRound + 1} / 5
            </span>
            <span className="text-white font-bold text-xs sm:text-sm font-mono">
              {totalScore}
            </span>
          </div>
        </div>
      </div>

      {countdownActive && currentRound > 0 && (
        <RoundCountdown onComplete={handleCountdownComplete} />
      )}

      {/* College dropdown */}
      <div ref={dropdownRef} className="absolute bottom-3 left-3 z-20">
        <div className="backdrop-blur-xl bg-black/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl w-44 sm:w-52">
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-xs font-mono text-white/70 hover:text-white transition-colors"
          >
            <span className="truncate">{selectedCollege || 'All Colleges'}</span>
            <svg
              className={`w-3 h-3 shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="border-t border-white/5 max-h-40 overflow-y-auto">
              <button
                onClick={() => { setSelectedCollege(null); setDropdownOpen(false); }}
                className={`w-full text-left px-3 py-2 text-[11px] font-mono transition-colors ${
                  !selectedCollege ? 'text-white bg-white/5' : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                All Colleges
              </button>
              {schools.map(school => (
                <button
                  key={school}
                  onClick={() => { setSelectedCollege(school); setDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-[11px] font-mono transition-colors ${
                    selectedCollege === school ? 'text-white bg-white/5' : 'text-zinc-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {school}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <MiniMap
        isLoaded={isLoaded}
        onGuess={handleGuess}
        guessPosition={guessPosition}
        actualPosition={showModal ? currentLocation : null}
        showResult={showModal}
        onSubmit={handleSubmit}
        canSubmit={!!guessPosition && streetViewReady && !showModal}
        streetViewReady={streetViewReady}
        mapCenter={selectedCollege ? schoolCenters[selectedCollege] : undefined}
        mapZoom={selectedCollege ? 13 : undefined}
      />

      <ScoreModal
        key={currentRound}
        visible={showModal}
        roundScore={currentScore}
        totalScore={totalScore}
        distance={currentDistance}
        round={currentRound + 1}
        isLastRound={isLastRound}
        onNext={handleNext}
        school={currentLocation.school}
        difficulty={currentLocation.difficulty}
        locationName={currentLocation.name}
        bonus={currentBonus}
        bonusPoints={bonusPoints}
      />
    </div>
  );
}
