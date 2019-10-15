import { Monster } from '../../../api/monsters.api';
import { SpawnArea } from '../../../api/spawn-areas.api';
import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';
import { SpawnAreaEntity } from '../models/db/spawn-area.entity';
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
