'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import StreetView from '@/components/StreetView';
import MiniMap from '@/components/MiniMap';
import ScoreModal from '@/components/ScoreModal';
import RoundCountdown from '@/components/RoundCountdown';
import RoundTimer from '@/components/RoundTimer';
import { getRandomLocations } from '@/data/locations';
import { validatePanorama } from '@/lib/validateLocation';
import { haversineDistance, calculateScore } from '@/lib/haversine';
import type { Location } from '@/data/locations';

const libraries: ('places' | 'geometry')[] = [];
const TIMER_DURATION = 90;

export default function GamePage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [validatedLocations, setValidatedLocations] = useState<Location[] | null>(null);
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

  const router = useRouter();
  const cancelledRef = useRef(false);
  const guessPositionRef = useRef<{ lat: number; lng: number } | null>(null);
  const streetViewReadyRef = useRef(false);
  const currentLocationRef = useRef<Location | null>(null);

  useEffect(() => {
    if (!isLoaded || !window.google) return;

    cancelledRef.current = false;

    async function doValidation() {
      const svc = new window.google.maps.StreetViewService();
      const valid: Location[] = [];
      let attempts = 0;

      while (valid.length < 5 && attempts < 15 && !cancelledRef.current) {
        const candidates = getRandomLocations(20);
        for (const loc of candidates) {
          if (valid.length >= 5 || cancelledRef.current) break;
          const ok = await validatePanorama(svc, loc.lat, loc.lng);
          if (ok && !valid.find(v => v.lat === loc.lat && v.lng === loc.lng)) {
            valid.push(loc);
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

  const currentLocation: Location | null = validatedLocations?.[currentRound] ?? null;
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
    (guessedPos: { lat: number; lng: number } | null) => {
      const loc = currentLocationRef.current;
      if (!loc || !guessedPos) return;

      const distance = haversineDistance(loc.lat, loc.lng, guessedPos.lat, guessedPos.lng);
      const score = calculateScore(distance);
      setCurrentDistance(distance);
      setCurrentScore(score);
      setTotalScore(prev => prev + score);
      setRoundResults(prev => [
        ...prev,
        { distance, score, school: loc.school, locationName: loc.name, difficulty: loc.difficulty },
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
        key={`${currentLocation.lat}-${currentLocation.lng}`}
        lat={currentLocation.lat}
        lng={currentLocation.lng}
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

      <MiniMap
        isLoaded={isLoaded}
        onGuess={handleGuess}
        guessPosition={guessPosition}
        actualPosition={showModal ? currentLocation : null}
        showResult={showModal}
        onSubmit={handleSubmit}
        canSubmit={!!guessPosition && streetViewReady && !showModal}
        streetViewReady={streetViewReady}
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
      />
    </div>
  );
}
