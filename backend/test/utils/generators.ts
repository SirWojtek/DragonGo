import { Point } from 'geojson';
import { random } from 'lodash';
import { v4 } from 'uuid';
import { LatLng, Rect } from '../../../api/spawn-areas.api';
import { MapFragmentEntity } from '../../src/models/db/map-fragment.entity';
import { MonsterInstanceEntity } from '../../src/models/db/monster-instance.entity';
import { MonsterMetadataEntity } from '../../src/models/db/monster-metadata.entity';
import { SpawnAreaEntity } from '../../src/models/db/spawn-area.entity';
import { UserEntity } from '../../src/models/db/user.entity';
import { hash } from '../../src/utils/bcrypt';
import { toPoint, toPolygon } from '../../src/utils/geojson';

export async function generateUser(password?: string): Promise<UserEntity> {
  return {
    id: v4(),
    username: v4(),
    level: 1,
    password: password ? await hash(password) : undefined,
    hashPassword: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function generateSpawnArea(coords?: Rect): SpawnAreaEntity {
  return {
    id: v4(),
    name: v4(),
    coords: coords ? toPolygon(coords) : undefined,
    monsterInstances: [],
    mapFragment: null,
    updatedAt: new Date(),
    createdAt: new Date(),
  };
}

export function generateMapFragment(coords: Rect): MapFragmentEntity {
  return {
    id: v4(),
    coords: coords ? toPolygon(coords) : undefined,
    spawnAreas: [],
    updatedAt: new Date(),
    createdAt: new Date(),
  };
}

export function generateMonsterMetadata(): MonsterMetadataEntity {
  return {
    id: v4(),
    name: v4(),
    description: 'This is test monster',
    minLevel: 1,
    maxLevel: 2,
    monsterInstances: [],
    updatedAt: new Date(),
    createdAt: new Date(),
  };
}

export function generateMonsterInstance(): MonsterInstanceEntity {
  const monsterMetadata = generateMonsterMetadata();
  return {
    id: v4(),
    level: 1,
    monsterMetadataId: monsterMetadata.id,
    monsterMetadata,
    latLng: generatePoint(),
    updatedAt: new Date(),
    createdAt: new Date(),
  };
}

export function generatePoint(): Point {
  return toPoint(generateLatLng());
}

export function generateLatLng(): LatLng {
  return {
    lat: random(-180, 180, true),
    lng: random(-90, 90, true),
  };
}

export function generateRect(): Rect {
  return {
    northeast: generateLatLng(),
    southwest: generateLatLng(),
  };
}
