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
      {/* Base gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 via-60% to-zinc-900 animate-gradient bg-[length:200%_200%]" />

      {/* Subtle dot grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Animated glow orbs */}
      <div className="fixed top-1/4 -left-32 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] animate-glowPulse pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] animate-glowPulse pointer-events-none" style={{ animationDelay: '1.5s' }} />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-9 w-full max-w-sm animate-fadeIn">
          {/* Logo area */}
          <div className="space-y-5">
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-300 border border-white/20 flex items-center justify-center shadow-lg shadow-white/5 animate-logoReveal">
                <span className="text-zinc-900 text-sm font-bold">U</span>
              </div>
              <span className="text-white/25 text-[10px] font-mono tracking-[0.35em] uppercase border border-white/5 rounded-full px-2.5 py-0.5">
                Beta
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-none">
              Uni<span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Guesser</span>
            </h1>

            <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />

            <p className="text-zinc-500 text-sm font-mono tracking-wide">
              Explore US campuses. Guess the location.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3.5">
            <button
              onClick={() => router.push('/game')}
              className="group relative w-full overflow-hidden rounded-2xl bg-white text-black font-semibold py-4 px-6 active:scale-[0.97] transition-all duration-200 text-sm shadow-lg shadow-white/10"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Singleplayer
              </span>
            </button>

            <div className="relative group">
              <button
                disabled
                className="w-full bg-zinc-900/80 text-zinc-600 font-semibold py-4 px-6 rounded-2xl text-sm border border-zinc-800 cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Multiplayer
                </span>
              </button>
              <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-zinc-700 to-zinc-600 text-zinc-300 text-[9px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-lg">
                Coming Soon
              </div>
            </div>
          </div>

          {/* How to play */}
          <button
            onClick={() => setShowOnboarding(true)}
            className="inline-flex items-center gap-1.5 text-zinc-600 text-xs font-mono hover:text-zinc-400 transition-colors group"
          >
            <span className="w-4 h-px bg-zinc-700 group-hover:w-6 transition-all duration-300" />
            How to Play
            <span className="w-4 h-px bg-zinc-700 group-hover:w-6 transition-all duration-300" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-6 text-center">
        <p className="text-zinc-800 text-[10px] font-mono tracking-wider">
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
