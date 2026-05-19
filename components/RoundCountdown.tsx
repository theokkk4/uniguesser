'use client';

import { useState, useEffect } from 'react';

export default function RoundCountdown({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const delay = count === 1 ? 700 : 800;
    const timer = setTimeout(() => {
      if (count === 1) {
        onComplete();
      } else {
        setCount(c => c - 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 animate-fadeIn pointer-events-none">
      <span key={count} className="text-white text-5xl font-bold animate-countIn">
        {count}
      </span>
    </div>
  );
}
