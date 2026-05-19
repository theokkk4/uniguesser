'use client';

import { useEffect, useState, useRef } from 'react';

interface RoundTimerProps {
  duration: number;
  running: boolean;
  onTimeUp: () => void;
}

export default function RoundTimer({ duration, running, onTimeUp }: RoundTimerProps) {
  const [remaining, setRemaining] = useState(duration);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const warning = remaining <= 15;
  const critical = remaining <= 10;

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`text-xs font-mono tabular-nums transition-colors duration-300 ${
          critical
            ? 'text-red-400 animate-timerPulse'
            : warning
              ? 'text-yellow-400'
              : 'text-white/60'
        }`}
      >
        {remaining}s
      </div>
      <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            critical ? 'bg-red-400' : warning ? 'bg-yellow-400' : 'bg-white/40'
          }`}
          style={{ width: `${(remaining / duration) * 100}%` }}
        />
      </div>
    </div>
  );
}
