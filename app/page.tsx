'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingModal from '@/components/OnboardingModal';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('uniguesser_onboarded') !== 'true';
    }
    return true;
  });
  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col bg-black text-white overflow-hidden safe-top safe-bottom">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 animate-gradient bg-[length:200%_200%]" />

      {/* Radial glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-10 w-full max-w-sm">
          {/* Logo area */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <span className="text-white/70 text-sm font-bold">U</span>
              </div>
              <span className="text-white/30 text-xs font-mono tracking-[0.3em] uppercase">
                Beta
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
              UniGuesser
            </h1>
            <p className="text-zinc-500 text-sm font-mono">
              Explore US campuses. Guess the location.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.push('/game')}
              className="w-full bg-white text-black font-semibold py-4 px-6 rounded-2xl hover:bg-zinc-200 active:scale-[0.97] transition-all duration-200 text-sm shadow-lg shadow-white/10"
            >
              Singleplayer
            </button>

            <div className="relative group">
              <button
                disabled
                className="w-full bg-zinc-900/80 text-zinc-600 font-semibold py-4 px-6 rounded-2xl text-sm border border-zinc-800 cursor-not-allowed transition-all duration-200"
              >
                Multiplayer
              </button>
              <div className="absolute -top-2.5 right-3 bg-zinc-800 text-zinc-400 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                Coming Soon
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-300 text-[10px] font-mono px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Multiplayer launches soon
              </div>
            </div>
          </div>

          {/* How to play */}
          <button
            onClick={() => setShowOnboarding(true)}
            className="text-zinc-600 text-xs font-mono hover:text-zinc-400 transition-colors"
          >
            How to Play
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-6 text-center">
        <p className="text-zinc-800 text-[10px] font-mono">
          UniGuesser · v0.1.0
        </p>
      </div>

      {showOnboarding && (
        <OnboardingModal
          forceOpen
          onClose={() => setShowOnboarding(false)}
        />
      )}
    </div>
  );
}
