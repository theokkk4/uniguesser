export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Location {
  name: string;
  lat: number;
  lng: number;
  school: string;
  difficulty: Difficulty;
  state: string;
  cityLat: number;
  cityLng: number;
}

export const locations: Location[] = [
  // === Temple University (18) ===
  { name: 'Bell Tower', lat: 39.9815, lng: -75.1548, school: 'Temple University', difficulty: 'easy', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Paley Library', lat: 39.9820, lng: -75.1555, school: 'Temple University', difficulty: 'medium', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Liacouras Center', lat: 39.9796, lng: -75.1561, school: 'Temple University', difficulty: 'easy', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Mitten Hall', lat: 39.9810, lng: -75.1527, school: 'Temple University', difficulty: 'medium', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'TECH Center', lat: 39.9818, lng: -75.1536, school: 'Temple University', difficulty: 'medium', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Morgan Hall', lat: 39.9803, lng: -75.1582, school: 'Temple University', difficulty: 'medium', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: '1300 Residence Hall', lat: 39.9794, lng: -75.1601, school: 'Temple University', difficulty: 'hard', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Annenberg Hall', lat: 39.9816, lng: -75.1576, school: 'Temple University', difficulty: 'medium', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Tuttleman Learning Center', lat: 39.9823, lng: -75.1542, school: 'Temple University', difficulty: 'medium', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Gladfelter Hall', lat: 39.9819, lng: -75.1562, school: 'Temple University', difficulty: 'hard', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Barton Hall', lat: 39.9809, lng: -75.1558, school: 'Temple University', difficulty: 'hard', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Ritter Hall', lat: 39.9826, lng: -75.1572, school: 'Temple University', difficulty: 'medium', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Anderson Hall', lat: 39.9827, lng: -75.1562, school: 'Temple University', difficulty: 'medium', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Pearson/McGonigle Halls', lat: 39.9791, lng: -75.1533, school: 'Temple University', difficulty: 'hard', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Beury Hall', lat: 39.9824, lng: -75.1552, school: 'Temple University', difficulty: 'hard', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Wachman Hall', lat: 39.9814, lng: -75.1547, school: 'Temple University', difficulty: 'hard', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Science Education & Research Center', lat: 39.9817, lng: -75.1588, school: 'Temple University', difficulty: 'medium', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },
  { name: 'Howard Gittis Student Center', lat: 39.9815, lng: -75.1559, school: 'Temple University', difficulty: 'easy', state: 'Pennsylvania', cityLat: 39.9526, cityLng: -75.1652 },

  // === Penn State (14) ===
  { name: 'Old Main', lat: 40.7982, lng: -77.8599, school: 'Penn State', difficulty: 'easy', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Pattee Library', lat: 40.7963, lng: -77.8621, school: 'Penn State', difficulty: 'medium', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Hub-Robeson Center', lat: 40.7939, lng: -77.8644, school: 'Penn State', difficulty: 'medium', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Willard Building', lat: 40.7981, lng: -77.8636, school: 'Penn State', difficulty: 'hard', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Osmond Laboratory', lat: 40.7988, lng: -77.8605, school: 'Penn State', difficulty: 'hard', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Schwab Auditorium', lat: 40.7988, lng: -77.8628, school: 'Penn State', difficulty: 'medium', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Rec Hall', lat: 40.7981, lng: -77.8580, school: 'Penn State', difficulty: 'medium', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Engineering Hall', lat: 40.7995, lng: -77.8621, school: 'Penn State', difficulty: 'hard', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Forum Building', lat: 40.7972, lng: -77.8641, school: 'Penn State', difficulty: 'hard', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Burrowes Road', lat: 40.7975, lng: -77.8682, school: 'Penn State', difficulty: 'hard', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Curtin Road', lat: 40.8012, lng: -77.8635, school: 'Penn State', difficulty: 'medium', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Pollock Road', lat: 40.7951, lng: -77.8659, school: 'Penn State', difficulty: 'hard', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Beaver Stadium Entrance', lat: 40.8123, lng: -77.8550, school: 'Penn State', difficulty: 'easy', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },
  { name: 'Allen Street Gate', lat: 40.7932, lng: -77.8604, school: 'Penn State', difficulty: 'medium', state: 'Pennsylvania', cityLat: 40.7934, cityLng: -77.8600 },

  // === Rutgers (14) ===
  { name: 'Old Queens', lat: 40.4997, lng: -74.4476, school: 'Rutgers', difficulty: 'easy', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'Alexander Library', lat: 40.5006, lng: -74.4496, school: 'Rutgers', difficulty: 'medium', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'Scott Hall', lat: 40.5009, lng: -74.4510, school: 'Rutgers', difficulty: 'medium', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'Rutgers Student Center', lat: 40.5004, lng: -74.4502, school: 'Rutgers', difficulty: 'easy', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'College Hall', lat: 40.4996, lng: -74.4491, school: 'Rutgers', difficulty: 'medium', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'Gymnasium Building', lat: 40.5000, lng: -74.4525, school: 'Rutgers', difficulty: 'hard', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'Van Dyke Hall', lat: 40.5023, lng: -74.4519, school: 'Rutgers', difficulty: 'hard', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'River Road', lat: 40.5063, lng: -74.4561, school: 'Rutgers', difficulty: 'hard', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'George Street', lat: 40.5010, lng: -74.4530, school: 'Rutgers', difficulty: 'medium', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'Livingston Plaza', lat: 40.5225, lng: -74.4342, school: 'Rutgers', difficulty: 'medium', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'Cook Campus', lat: 40.5187, lng: -74.4562, school: 'Rutgers', difficulty: 'hard', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'Douglass Campus', lat: 40.5150, lng: -74.4408, school: 'Rutgers', difficulty: 'medium', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'Busch Campus Center', lat: 40.5233, lng: -74.4637, school: 'Rutgers', difficulty: 'medium', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },
  { name: 'College Avenue', lat: 40.4999, lng: -74.4505, school: 'Rutgers', difficulty: 'easy', state: 'New Jersey', cityLat: 40.4862, cityLng: -74.4518 },

  // === Ohio State (14) ===
  { name: 'The Oval', lat: 40.0000, lng: -83.0139, school: 'Ohio State', difficulty: 'easy', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'Thompson Library', lat: 39.9997, lng: -83.0142, school: 'Ohio State', difficulty: 'easy', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'Ohio Stadium', lat: 40.0018, lng: -83.0193, school: 'Ohio State', difficulty: 'easy', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'Bricker Hall', lat: 40.0005, lng: -83.0152, school: 'Ohio State', difficulty: 'medium', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'Orton Hall', lat: 40.0012, lng: -83.0133, school: 'Ohio State', difficulty: 'medium', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'University Hall', lat: 39.9993, lng: -83.0134, school: 'Ohio State', difficulty: 'medium', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'Wexner Center', lat: 40.0008, lng: -83.0119, school: 'Ohio State', difficulty: 'medium', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'RPAC', lat: 40.0003, lng: -83.0178, school: 'Ohio State', difficulty: 'medium', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'Knowlton Hall', lat: 40.0020, lng: -83.0067, school: 'Ohio State', difficulty: 'hard', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'Drackett Tower', lat: 39.9971, lng: -83.0129, school: 'Ohio State', difficulty: 'hard', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'Hagerty Hall', lat: 40.0011, lng: -83.0092, school: 'Ohio State', difficulty: 'hard', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'Journalism Building', lat: 40.0019, lng: -83.0100, school: 'Ohio State', difficulty: 'hard', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'Page Hall', lat: 40.0000, lng: -83.0125, school: 'Ohio State', difficulty: 'hard', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },
  { name: 'South Oval', lat: 39.9985, lng: -83.0142, school: 'Ohio State', difficulty: 'medium', state: 'Ohio', cityLat: 39.9612, cityLng: -83.0029 },

  // === UCLA (14) ===
  { name: 'Royce Hall', lat: 34.0726, lng: -118.4411, school: 'UCLA', difficulty: 'easy', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Powell Library', lat: 34.0720, lng: -118.4416, school: 'UCLA', difficulty: 'easy', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Pauley Pavilion', lat: 34.0711, lng: -118.4468, school: 'UCLA', difficulty: 'easy', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Ackerman Union', lat: 34.0691, lng: -118.4443, school: 'UCLA', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Bruin Plaza', lat: 34.0703, lng: -118.4434, school: 'UCLA', difficulty: 'easy', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Janss Steps', lat: 34.0736, lng: -118.4390, school: 'UCLA', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Bunche Hall', lat: 34.0735, lng: -118.4424, school: 'UCLA', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Young Research Library', lat: 34.0722, lng: -118.4396, school: 'UCLA', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Dickson Court', lat: 34.0732, lng: -118.4419, school: 'UCLA', difficulty: 'hard', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Kerckhoff Hall', lat: 34.0717, lng: -118.4442, school: 'UCLA', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Boelter Hall', lat: 34.0728, lng: -118.4381, school: 'UCLA', difficulty: 'hard', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Murphy Hall', lat: 34.0736, lng: -118.4413, school: 'UCLA', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Student Activities Center', lat: 34.0700, lng: -118.4423, school: 'UCLA', difficulty: 'hard', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Portola Plaza', lat: 34.0706, lng: -118.4401, school: 'UCLA', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },

  // === University of Michigan (14) ===
  { name: 'The Diag', lat: 42.2770, lng: -83.7391, school: 'University of Michigan', difficulty: 'easy', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Hatcher Graduate Library', lat: 42.2770, lng: -83.7390, school: 'University of Michigan', difficulty: 'medium', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Shapiro Library', lat: 42.2768, lng: -83.7384, school: 'University of Michigan', difficulty: 'medium', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Angell Hall', lat: 42.2762, lng: -83.7384, school: 'University of Michigan', difficulty: 'medium', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Michigan Union', lat: 42.2750, lng: -83.7406, school: 'University of Michigan', difficulty: 'easy', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Michigan Stadium', lat: 42.2651, lng: -83.7483, school: 'University of Michigan', difficulty: 'easy', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Rackham Building', lat: 42.2775, lng: -83.7378, school: 'University of Michigan', difficulty: 'medium', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Burton Tower', lat: 42.2780, lng: -83.7398, school: 'University of Michigan', difficulty: 'easy', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'West Hall', lat: 42.2789, lng: -83.7380, school: 'University of Michigan', difficulty: 'hard', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'East Hall', lat: 42.2765, lng: -83.7363, school: 'University of Michigan', difficulty: 'hard', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Mason Hall', lat: 42.2775, lng: -83.7403, school: 'University of Michigan', difficulty: 'medium', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Natural History Museum', lat: 42.2815, lng: -83.7365, school: 'University of Michigan', difficulty: 'medium', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Fleming Administration', lat: 42.2787, lng: -83.7400, school: 'University of Michigan', difficulty: 'hard', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },
  { name: 'Palmer Field', lat: 42.2800, lng: -83.7420, school: 'University of Michigan', difficulty: 'hard', state: 'Michigan', cityLat: 42.2808, cityLng: -83.7430 },

  // === Harvard (14) ===
  { name: 'Harvard Yard', lat: 42.3744, lng: -71.1176, school: 'Harvard', difficulty: 'easy', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Widener Library', lat: 42.3737, lng: -71.1172, school: 'Harvard', difficulty: 'easy', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Memorial Church', lat: 42.3740, lng: -71.1175, school: 'Harvard', difficulty: 'medium', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'University Hall', lat: 42.3747, lng: -71.1185, school: 'Harvard', difficulty: 'medium', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Massachusetts Hall', lat: 42.3748, lng: -71.1188, school: 'Harvard', difficulty: 'medium', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Johnston Gate', lat: 42.3740, lng: -71.1188, school: 'Harvard', difficulty: 'medium', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Science Center', lat: 42.3755, lng: -71.1185, school: 'Harvard', difficulty: 'easy', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Sever Hall', lat: 42.3735, lng: -71.1173, school: 'Harvard', difficulty: 'medium', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Emerson Hall', lat: 42.3737, lng: -71.1157, school: 'Harvard', difficulty: 'hard', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Wadsworth House', lat: 42.3745, lng: -71.1195, school: 'Harvard', difficulty: 'hard', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Lehman Hall', lat: 42.3717, lng: -71.1165, school: 'Harvard', difficulty: 'hard', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Lamont Library', lat: 42.3737, lng: -71.1190, school: 'Harvard', difficulty: 'medium', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Pusey Library', lat: 42.3743, lng: -71.1182, school: 'Harvard', difficulty: 'hard', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },
  { name: 'Holyoke Center', lat: 42.3725, lng: -71.1158, school: 'Harvard', difficulty: 'hard', state: 'Massachusetts', cityLat: 42.3736, cityLng: -71.1097 },

  // === University of Florida (14) ===
  { name: 'Plaza of the Americas', lat: 29.6517, lng: -82.3423, school: 'University of Florida', difficulty: 'easy', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Century Tower', lat: 29.6518, lng: -82.3418, school: 'University of Florida', difficulty: 'easy', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Library West', lat: 29.6506, lng: -82.3429, school: 'University of Florida', difficulty: 'medium', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Reitz Union', lat: 29.6491, lng: -82.3419, school: 'University of Florida', difficulty: 'easy', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Turlington Hall', lat: 29.6498, lng: -82.3427, school: 'University of Florida', difficulty: 'medium', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Ben Hill Griffin Stadium', lat: 29.6499, lng: -82.3498, school: 'University of Florida', difficulty: 'easy', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Criser Hall', lat: 29.6506, lng: -82.3410, school: 'University of Florida', difficulty: 'medium', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Weil Hall', lat: 29.6487, lng: -82.3465, school: 'University of Florida', difficulty: 'hard', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'New Engineering Building', lat: 29.6493, lng: -82.3449, school: 'University of Florida', difficulty: 'hard', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Little Hall', lat: 29.6489, lng: -82.3434, school: 'University of Florida', difficulty: 'hard', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Carlton Auditorium', lat: 29.6504, lng: -82.3436, school: 'University of Florida', difficulty: 'medium', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Bryan Hall', lat: 29.6513, lng: -82.3432, school: 'University of Florida', difficulty: 'hard', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Anderson Hall', lat: 29.6520, lng: -82.3430, school: 'University of Florida', difficulty: 'medium', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },
  { name: 'Marston Science Library', lat: 29.6476, lng: -82.3440, school: 'University of Florida', difficulty: 'medium', state: 'Florida', cityLat: 29.6516, cityLng: -82.3248 },

  // === Texas A&M (14) ===
  { name: 'Academic Plaza', lat: 30.6126, lng: -96.3406, school: 'Texas A&M', difficulty: 'easy', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Memorial Student Center', lat: 30.6113, lng: -96.3411, school: 'Texas A&M', difficulty: 'easy', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Kyle Field', lat: 30.6100, lng: -96.3397, school: 'Texas A&M', difficulty: 'easy', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Evans Library', lat: 30.6132, lng: -96.3417, school: 'Texas A&M', difficulty: 'medium', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Zachry Engineering', lat: 30.6180, lng: -96.3363, school: 'Texas A&M', difficulty: 'medium', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Military Walk', lat: 30.6105, lng: -96.3428, school: 'Texas A&M', difficulty: 'medium', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Rudder Tower', lat: 30.6118, lng: -96.3419, school: 'Texas A&M', difficulty: 'easy', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Blocker Building', lat: 30.6130, lng: -96.3387, school: 'Texas A&M', difficulty: 'hard', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Heldenfels Building', lat: 30.6146, lng: -96.3388, school: 'Texas A&M', difficulty: 'hard', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Harrington Tower', lat: 30.6141, lng: -96.3417, school: 'Texas A&M', difficulty: 'medium', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Langford Architecture', lat: 30.6144, lng: -96.3377, school: 'Texas A&M', difficulty: 'hard', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Nagle Hall', lat: 30.6151, lng: -96.3404, school: 'Texas A&M', difficulty: 'hard', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Scoates Hall', lat: 30.6166, lng: -96.3390, school: 'Texas A&M', difficulty: 'hard', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },
  { name: 'Spence Park', lat: 30.6095, lng: -96.3448, school: 'Texas A&M', difficulty: 'medium', state: 'Texas', cityLat: 30.6270, cityLng: -96.3344 },

  // === USC (14) ===
  { name: 'Tommy Trojan', lat: 34.0203, lng: -118.2854, school: 'USC', difficulty: 'easy', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Bovard Auditorium', lat: 34.0202, lng: -118.2857, school: 'USC', difficulty: 'easy', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Leavey Library', lat: 34.0211, lng: -118.2835, school: 'USC', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Doheny Library', lat: 34.0201, lng: -118.2841, school: 'USC', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Taper Hall', lat: 34.0197, lng: -118.2876, school: 'USC', difficulty: 'hard', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'SGM Hall', lat: 34.0198, lng: -118.2865, school: 'USC', difficulty: 'hard', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'KAP Building', lat: 34.0189, lng: -118.2838, school: 'USC', difficulty: 'hard', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'USC Village', lat: 34.0244, lng: -118.2854, school: 'USC', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'McCarthy Quad', lat: 34.0207, lng: -118.2852, school: 'USC', difficulty: 'easy', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Tutor Campus Center', lat: 34.0207, lng: -118.2862, school: 'USC', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Pardee Tower', lat: 34.0199, lng: -118.2881, school: 'USC', difficulty: 'hard', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Mudd Hall', lat: 34.0215, lng: -118.2865, school: 'USC', difficulty: 'medium', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Salvatori Hall', lat: 34.0221, lng: -118.2886, school: 'USC', difficulty: 'hard', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
  { name: 'Harris Hall', lat: 34.0205, lng: -118.2843, school: 'USC', difficulty: 'hard', state: 'California', cityLat: 34.0522, cityLng: -118.2437 },
];

export function getRandomLocations(count: number = 5): Location[] {
  const shuffled = [...locations];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export function getSchools(): string[] {
  const schoolSet = new Set(locations.map(l => l.school));
  return Array.from(schoolSet);
}
