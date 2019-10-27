import { LatLng } from './spawn-areas.api';

export class Monster {
  id: string;
  name: string;
  description: string;
  level: number;
  location: LatLng;
}

export class GetMonstersRequest {
  monsterIds: string[];
}

export class GetSpawnAreaMonsters {
  spawnAreaId: string;
}
