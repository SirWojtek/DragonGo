import { Monster } from '../../../api/monsters.api';
import { SpawnArea } from '../../../api/spawn-areas.api';
import { MapFragmentEntity } from '../models/db/map-fragment.entity';
import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';
import { SpawnAreaEntity } from '../models/db/spawn-area.entity';
import { IPlace } from '../services/google-maps.service';
import { toLatLng, toPolygon, toRect } from './geojson';

export function toMonster(entity: MonsterInstanceEntity): Monster {
  return {
    id: entity.id,
    name: entity.monsterMetadata && entity.monsterMetadata.name,
    description: entity.monsterMetadata && entity.monsterMetadata.description,
    level: entity.level,
    location: toLatLng(entity.latLng),
  };
}

export function toSpawnArea(entity: SpawnAreaEntity): SpawnArea {
  return {
    id: entity.id,
    name: entity.name,
    rect: toRect(entity.coords),
  };
}

export function toSpawnAreaEntity(
  place: IPlace,
  mapFragment: MapFragmentEntity,
): Partial<SpawnAreaEntity> {
  return {
    name: place.name,
    placeId: place.id,
    coords: toPolygon(place.viewport),
    mapFragment,
  };
}
