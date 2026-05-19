'use client';

import { useCallback, useRef, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';

interface MiniMapProps {
  isLoaded: boolean;
  onGuess: (lat: number, lng: number) => void;
  guessPosition: { lat: number; lng: number } | null;
  actualPosition: { lat: number; lng: number } | null;
  showResult: boolean;
  onSubmit: () => void;
  canSubmit: boolean;
  streetViewReady: boolean;
}

const MAP_CENTER = { lat: 39.8283, lng: -98.5795 };

const mapOptions: google.maps.MapOptions = {
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  zoomControl: true,
  zoomControlOptions: { position: 1 },
  disableDefaultUI: true,
  clickableIcons: false,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ],
};

const MARKER_PATH = 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z';

export default function MiniMap({
  isLoaded,
  onGuess,
  guessPosition,
  actualPosition,
  showResult,
  onSubmit,
  canSubmit,
  streetViewReady,
}: MiniMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const showResultRef = useRef(showResult);

  useEffect(() => {
    showResultRef.current = showResult;
  }, [showResult]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    for (const m of markersRef.current) m.setMap(null);
    markersRef.current = [];
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    if (showResult && actualPosition) {
      if (guessPosition) {
        const guessMarker = new google.maps.Marker({
          position: guessPosition,
          map: mapRef.current,
          icon: { path: MARKER_PATH, anchor: new google.maps.Point(12, 22), scale: 1.2, fillColor: '#ef4444', strokeColor: '#ffffff', strokeWeight: 2 },
          animation: google.maps.Animation.DROP,
        });
        markersRef.current.push(guessMarker);
      }

      const actualMarker = new google.maps.Marker({
        position: actualPosition,
        map: mapRef.current,
        icon: { path: MARKER_PATH, anchor: new google.maps.Point(12, 22), scale: 1.2, fillColor: '#22c55e', strokeColor: '#ffffff', strokeWeight: 2 },
        animation: google.maps.Animation.DROP,
      });
      markersRef.current.push(actualMarker);

      if (guessPosition) {
        const line = new google.maps.Polyline({
          path: [guessPosition, actualPosition],
          map: mapRef.current,
          strokeColor: '#f59e0b',
          strokeOpacity: 0.8,
          strokeWeight: 2,
        });
        polylineRef.current = line;
      }

      const bounds = new google.maps.LatLngBounds();
      if (guessPosition) bounds.extend(guessPosition);
      bounds.extend(actualPosition);
      mapRef.current.fitBounds(bounds);
    } else if (guessPosition && !showResult) {
      const marker = new google.maps.Marker({
        position: guessPosition,
        map: mapRef.current,
        icon: { path: MARKER_PATH, anchor: new google.maps.Point(12, 22), scale: 1.2, fillColor: '#3b82f6', strokeColor: '#ffffff', strokeWeight: 2 },
        animation: google.maps.Animation.DROP,
      });
      markersRef.current.push(marker);
    }
  }, [guessPosition, actualPosition, showResult]);

  const handleClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (showResultRef.current || !e.latLng) return;
      onGuess(e.latLng.lat(), e.latLng.lng());
    },
    [onGuess]
  );

  if (!isLoaded) return null;

  return (
    <div className="absolute bottom-3 right-3 z-10 w-44 sm:w-52 md:w-60 lg:w-72">
      <div className="backdrop-blur-xl bg-black/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-32 sm:h-36 md:h-40 lg:h-48">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={MAP_CENTER}
            zoom={4}
            onClick={handleClick}
            onLoad={onMapLoad}
            options={mapOptions}
          />
        </div>

        <div className="px-3 pt-2 pb-3 border-t border-white/5 space-y-2">
          <p className="text-[10px] font-mono text-white/40 tracking-wider text-center leading-tight">
            {showResult
              ? 'Round complete'
              : guessPosition
                ? 'Guess placed — confirm below'
                : !streetViewReady
                  ? 'Waiting for Street View...'
                  : 'Tap map to place guess'}
          </p>
          {!showResult && (
            <button
              onClick={onSubmit}
              disabled={!canSubmit}
              className={`w-full py-2 rounded-xl font-semibold text-xs transition-all duration-200 ${
                canSubmit
                  ? 'bg-white text-black hover:bg-zinc-200 active:scale-[0.97] shadow-lg'
                  : 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
              }`}
            >
              Confirm Guess
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
