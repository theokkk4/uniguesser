'use client';

import { useState } from 'react';

const ONBOARDING_KEY = 'uniguesser_onboarded';

interface OnboardingModalProps {
  forceOpen?: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: 'Explore',
    description: 'Look around the Street View panorama. Rotate, zoom, and find clues about the campus.',
    icon: '⟳',
  },
  {
    title: 'Guess',
    description: 'Tap on the minimap to place your guess marker. Zoom in to find the exact spot.',
    icon: '⊙',
  },
  {
    title: 'Confirm',
    description: 'Press "Confirm Guess" to lock in your answer. You can change your guess anytime before confirming.',
    icon: '✓',
  },
  {
    title: 'Score',
    description: 'Get points based on how close you are. Maximum 5,000 points per round. Closer = more points!',
    icon: '★',
  },
];

export default function OnboardingModal({ onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      localStorage.setItem(ONBOARDING_KEY, 'true');
      onClose();
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    onClose();
  };

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900/95 border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl animate-fadeIn">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">
              How to Play · {step + 1} / {steps.length}
            </span>
            <button
              onClick={handleDismiss}
              className="text-zinc-600 hover:text-zinc-400 transition-colors text-sm"
            >
              Skip
            </button>
          </div>

          <div className="text-center space-y-3">
            <div className="text-4xl text-white/80">{current.icon}</div>
            <h2 className="text-xl font-bold text-white">{current.title}</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">{current.description}</p>
          </div>

          <div className="flex gap-1.5 justify-center">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-white' : 'w-1 bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 text-sm"
          >
            {step < steps.length - 1 ? 'Next' : 'Start Playing'}
          </button>
        </div>
      </div>
    </div>
  );
}
