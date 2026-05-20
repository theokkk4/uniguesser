function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function calculateScore(distanceMeters: number): number {
  return Math.max(0, Math.round(5000 / (1 + distanceMeters / 200)));
}

const CITY_RADIUS = 20000;
const CITY_BONUS = 2000;

export interface BonusInfo {
  stateMatch: boolean;
  cityRadius: boolean;
  stateBonus: number;
  cityBonus: number;
}

export function calculateBonuses(
  guessLat: number,
  guessLng: number,
  targetState: string,
  cityLat: number,
  cityLng: number
): BonusInfo {
  const distToCity = haversineDistance(guessLat, guessLng, cityLat, cityLng);
  const cityRadius = distToCity <= CITY_RADIUS;
  return {
    stateMatch: false,
    cityRadius,
    stateBonus: 0,
    cityBonus: cityRadius ? CITY_BONUS : 0,
  };
}
