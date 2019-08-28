import * as dotenv from 'dotenv';
import * as fs from 'fs';

export enum ConfigKeyEnum {
  GOOGLE_MAPS_MAX_PAGES = 'GOOGLE_MAPS_MAX_PAGES',
  GOOGLE_MAPS_API_KEY = 'GOOGLE_MAPS_API_KEY',
  SPAWN_AREAS_LOCATION_RADIUS = 'SPAWN_AREAS_LOCATION_RADIUS',
  SPAWN_AREAS_MAP_FRAGMENT_SIZE = 'SPAWN_AREAS_MAP_FRAGMENT_SIZE',
  MONSTER_INSTANCES_MIN_MONSTERS = 'MONSTER_INSTANCES_MIN_MONSTERS',
  MONSTER_INSTANCES_MAX_MONSTERS = 'MONSTER_INSTANCES_MAX_MONSTERS',
}

export class ConfigService {
  private readonly envConfig: {
    [key in keyof typeof ConfigKeyEnum]: string | number
  };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    const allPresent = Object.values(ConfigKeyEnum).every(
      value => !!this.envConfig[value],
    );

    if (!allPresent) {
      throw new Error('Some of config values are missing');
    }
  }

  get(key: ConfigKeyEnum): string | number {
    return this.envConfig[key];
  }
}
