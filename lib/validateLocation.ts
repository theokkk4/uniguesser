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
