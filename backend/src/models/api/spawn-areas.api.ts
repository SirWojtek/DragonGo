import { Monster } from './monsters.api';

export class LatLng {
  lat: number;
  lng: number;
}

export class Rect {
  northeast: LatLng;
  southwest: LatLng;
}

export class GetSpawnAreas {
  location: LatLng;
}

export class SpawnArea {
  id: string;
  rect: Rect;
  name: string;
  monsters: Monster[];
}
