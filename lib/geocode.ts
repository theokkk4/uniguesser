export function reverseGeocode(
  lat: number,
  lng: number
): Promise<{ state: string | null; city: string | null }> {
  return new Promise((resolve) => {
    try {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          let state: string | null = null;
          let city: string | null = null;
          for (const component of results[0].address_components) {
            if (component.types.includes('administrative_area_level_1')) {
              state = component.long_name;
            }
            if (
              component.types.includes('locality') ||
              component.types.includes('postal_town')
            ) {
              city = component.long_name;
            }
          }
          resolve({ state, city });
        } else {
          resolve({ state: null, city: null });
        }
      });
    } catch {
      resolve({ state: null, city: null });
    }
  });
}
