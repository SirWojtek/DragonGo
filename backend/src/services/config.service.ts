import * as dotenv from 'dotenv';
import * as fs from 'fs';

export enum ConfigKeyEnum {
  USE_JWT = 'USE_JWT',
  GOOGLE_MAPS_MAX_PAGES = 'GOOGLE_MAPS_MAX_PAGES',
  GOOGLE_MAPS_API_KEY = 'GOOGLE_MAPS_API_KEY',
  USER_RADIUS = 'USER_RADIUS',
  SPAWN_AREAS_LOCATION_RADIUS = 'SPAWN_AREAS_LOCATION_RADIUS',
  SPAWN_AREAS_MAP_FRAGMENT_SIZE = 'SPAWN_AREAS_MAP_FRAGMENT_SIZE',
  SPAWN_AREAS_MAX_AREAS = 'SPAWN_AREAS_MAX_AREAS',
  MONSTER_INSTANCES_MIN_MONSTERS = 'MONSTER_INSTANCES_MIN_MONSTERS',
  MONSTER_INSTANCES_MAX_MONSTERS = 'MONSTER_INSTANCES_MAX_MONSTERS',
}

type EnvConfig = { [key in keyof typeof ConfigKeyEnum]: string };

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath)) as EnvConfig;

    const allPresent = Object.values(ConfigKeyEnum).every(
      value => !!this.envConfig[value],
    );

    if (!allPresent) {
      throw new Error('Some of config values are missing');
    }
  }

  get(key: ConfigKeyEnum): string | number | boolean {
    const value = this.envConfig[key];

    if (!isNaN(+value)) {
      return +value;
    } else if (value.toLowerCase() === 'true') {
      return true;
    } else if (value.toLowerCase() === 'false') {
      return false;
    } else {
      return value;
    }
  }
}
