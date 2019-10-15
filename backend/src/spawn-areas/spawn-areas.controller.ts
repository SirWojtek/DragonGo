import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetSpawnAreas, SpawnArea } from '../models/api/spawn-areas.api';
import { toRect } from '../utils/geojson';
import { toSpawnArea } from '../utils/mappers';
import { SpawnAreasService } from './spawn-areas.service';

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
