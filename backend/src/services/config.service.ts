import * as dotenv from 'dotenv';
import * as fs from 'fs';

export enum ConfigKeyEnum {
  GOOGLE_MAPS_MAX_PAGES = 'GOOGLE_MAPS_MAX_PAGES',
  GOOGLE_MAPS_API_KEY = 'GOOGLE_MAPS_API_KEY',
  SPAWN_AREAS_LOCATION_RADIUS = 'SPAWN_AREAS_LOCATION_RADIUS',
  SPAWN_AREAS_MAP_FRAGMENT_SIZE = 'SPAWN_AREAS_MAP_FRAGMENT_SIZE',
}

export class ConfigService {
  private readonly envConfig: {
    [key in keyof typeof ConfigKeyEnum]: string | number
  };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: ConfigKeyEnum): string | number {
    return this.envConfig[key];
  }
}
