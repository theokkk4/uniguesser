function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function validatePanorama(
  svc: google.maps.StreetViewService,
  lat: number,
  lng: number
): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      svc.getPanorama(
        {
          location: { lat, lng },
          radius: 100,
          source: 'outdoor' as google.maps.StreetViewSource,
        },
        (data, status) => {
          if (
            status === google.maps.StreetViewStatus.OK &&
            data &&
            data.links &&
            data.links.length > 0
          ) {
            const panoLat = data.location?.latLng?.lat();
            const panoLng = data.location?.latLng?.lng();
            if (panoLat != null && panoLng != null) {
              const dist = haversineDistance(lat, lng, panoLat, panoLng);
              if (dist > 60) {
                resolve(false);
                return;
              }
            }
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    } catch {
      resolve(false);
    }
  });
}
