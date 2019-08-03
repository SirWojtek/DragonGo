import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Polygon } from 'geojson';
import { SpawnAreaEnity } from '../models/db/spawn-area.entity';
import { Repository } from 'typeorm';
import { Rect } from '../models/api/spawn-areas.api';

@Injectable()
export class SpawnAreasService {
  constructor(
    @InjectRepository(SpawnAreaEnity)
    private spawnAreaRepository: Repository<SpawnAreaEnity>,
  ) {}

  async findSpawnAreasForRegion(region: Rect): Promise<SpawnAreaEnity[]> {
    return [];
  }
}
