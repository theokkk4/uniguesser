'use client';

import { useEffect, useRef, useState } from 'react';

interface StreetViewProps {
  lat: number;
  lng: number;
  isLoaded: boolean;
  onReady?: () => void;
}

export default function StreetView({ lat, lng, isLoaded, onReady }: StreetViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const readyFired = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !isLoaded || !window.google) return;

    readyFired.current = false;

    const panorama = new window.google.maps.StreetViewPanorama(
      containerRef.current,
      {
        position: { lat, lng },
        pov: { heading: 0, pitch: 0 },
        zoom: 1,
        addressControl: false,
        showRoadLabels: false,
        motionTracking: false,
        motionTrackingControl: false,
        fullscreenControl: false,
        clickToGo: true,
        enableCloseButton: false,
        linksControl: true,
        panControl: true,
        zoomControl: true,
      }
    );

    panorama.addListener('status_changed', () => {
      const status = panorama.getStatus();
      if (status === 'OK') {
        setLoading(false);
        setError(false);
        if (!readyFired.current) {
          readyFired.current = true;
          onReady?.();
        }
      } else if (
        status === google.maps.StreetViewStatus.ZERO_RESULTS ||
        status === google.maps.StreetViewStatus.UNKNOWN_ERROR
      ) {
        setLoading(false);
        setError(true);
      }
    });

    panorama.addListener('pano_changed', () => {
      setLoading(false);
      setError(false);
    });

    return () => {
      window.google.maps.event.clearInstanceListeners(panorama);
    };
  }, [lat, lng, isLoaded, onReady]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-white/40 text-xs font-mono">Loading Street View...</span>
          </div>
        </div>
      )}
      {error && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20">
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/30 text-2xl">⊙</span>
            <p className="text-white/50 text-sm font-mono">
              No Street View available here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
