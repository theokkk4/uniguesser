'use client';

import { useState, useEffect, useRef } from 'react';

interface BonusInfo {
  stateMatch: boolean;
  cityRadius: boolean;
  stateBonus: number;
  cityBonus: number;
}

interface ScoreModalProps {
  visible: boolean;
  roundScore: number;
  totalScore: number;
  distance: number;
  round: number;
  isLastRound: boolean;
  onNext: () => void;
  school: string;
  difficulty: string;
  locationName: string;
  bonus: BonusInfo | null;
  bonusPoints: number;
}

const difficultyLabel: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const difficultyColor: Record<string, string> = {
  easy: 'text-green-400',
  medium: 'text-yellow-400',
  hard: 'text-red-400',
};

const schoolColors: Record<string, string> = {
  'Temple University': 'bg-red-600',
  'Penn State': 'bg-blue-800',
  'Rutgers': 'bg-red-800',
  'Ohio State': 'bg-gray-800',
  'UCLA': 'bg-blue-600',
  'University of Michigan': 'bg-yellow-600',
  'Harvard': 'bg-red-700',
  'University of Florida': 'bg-orange-600',
  'Texas A&M': 'bg-rose-900',
  'USC': 'bg-red-500',
};

function getSchoolInitials(school: string): string {
  return school
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2);
}

function getSchoolColor(school: string): string {
  return schoolColors[school] || 'bg-zinc-600';
}

function AnimatedScore({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (value === 0) return;

    const startTime = performance.now();
    const duration = 800;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      }
    }

    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value]);

  return <span>{display}</span>;
}

export default function ScoreModal({
  visible,
  roundScore,
  totalScore,
  distance,
  round,
  isLastRound,
  onNext,
  school,
  difficulty,
  locationName,
  bonus,
  bonusPoints,
}: ScoreModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl animate-fadeIn">
        <div className="text-center space-y-5">
          <div className="space-y-1">
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono">
              Round {round} Complete
            </p>
            <h2 className="text-4xl font-bold text-white animate-countIn">
              +<AnimatedScore value={roundScore} />
            </h2>
          </div>

          <div className="animate-slideUp">
            <div className="flex items-center gap-3 bg-zinc-800/50 rounded-xl p-3">
              <div
                className={`w-10 h-10 rounded-full ${getSchoolColor(school)} flex items-center justify-center text-white text-xs font-bold shrink-0`}
              >
                {getSchoolInitials(school)}
              </div>
              <div className="text-left min-w-0">
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                  Campus Found
                </p>
                <p className="text-white text-sm font-semibold truncate">{school}</p>
                <p className={`text-[10px] font-mono ${difficultyColor[difficulty] || 'text-zinc-400'}`}>
                  ★ {difficultyLabel[difficulty] || difficulty} · {locationName}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-xl p-4 space-y-2.5 animate-slideUpDelayed">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Distance</span>
              <span className="font-mono text-white">
                {distance < 1000
                  ? `${distance.toFixed(0)}m`
                  : `${(distance / 1000).toFixed(2)}km`}
              </span>
            </div>
            {bonus && bonusPoints > 0 && (
              <div className="space-y-1.5 border-b border-white/5 pb-2.5">
                {bonus.stateMatch && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-green-400">+ State Bonus</span>
                    <span className="font-mono text-green-400">+{bonus.stateBonus}</span>
                  </div>
                )}
                {bonus.cityRadius && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-sky-400">+ City Radius Bonus</span>
                    <span className="font-mono text-sky-400">+{bonus.cityBonus}</span>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Round Score</span>
              <span className="font-mono text-white">{roundScore}</span>
            </div>
            <div className="border-t border-white/5 pt-2.5 flex justify-between items-center text-sm">
              <span className="text-zinc-300 font-semibold">Total Score</span>
              <span className="font-mono text-white font-bold text-lg">{totalScore}</span>
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 text-sm"
          >
            {isLastRound ? 'View Final Results' : 'Next Round'}
          </button>
        </div>
      </div>
    </div>
  );
}
