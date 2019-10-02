import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';
import { Monster } from '../models/api/monsters.api';
import { SpawnAreaEntity } from '../models/db/spawn-area.entity';
import { SpawnArea } from '../models/api/spawn-areas.api';
import { toRect } from './geojson';

export function toMonster(entity: MonsterInstanceEntity): Monster {
  return {
    id: entity.id,
    name: entity.monsterMetadata.name,
    description: entity.monsterMetadata.description,
    level: entity.level,
  };
}

export function toSpawnArea(entity: SpawnAreaEntity): SpawnArea {
  return {
    id: entity.id,
    name: entity.name,
    rect: toRect(entity.coords),
  };
}
