import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import { GetSpawnAreas, SpawnArea } from '../models/api/spawn-areas.api';
import { AuthGuard } from '@nestjs/passport';
import { SpawnAreasService } from './spawn-areas.service';
import { toRect } from '../utils/geojson';
import { toSpawnArea } from '../utils/mappers';

@Controller('spawn-areas')
export class SpawnAreasController {
  constructor(private spawnAreasService: SpawnAreasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('get-spawn-areas')
  async getSpawnAreas(
    @Body() getSpawnAreas: GetSpawnAreas,
  ): Promise<SpawnArea[]> {
    const spawnAreaEntities = await this.spawnAreasService.findSpawnAreasForLocation(
      getSpawnAreas.location,
    );

    return spawnAreaEntities.map(toSpawnArea);
  }
}
