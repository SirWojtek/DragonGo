import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import { GetSpawnAreas, SpawnArea } from '../models/api/spawn-areas.api';
import { AuthGuard } from '@nestjs/passport';
import { SpawnAreasService } from './spawn-areas.service';
import { toRect } from '../utils/geojson';

@Controller('spawn-areas')
export class SpawnAreasController {
  constructor(private spawnAreasService: SpawnAreasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('getSpawnAreas')
  async getSpawnAreas(
    @Body() getSpawnAreas: GetSpawnAreas,
  ): Promise<SpawnArea[]> {
    const spawnAreaEntities = await this.spawnAreasService.findSpawnAreasForLocation(
      getSpawnAreas.location,
    );

    return spawnAreaEntities.map(sa => ({
      id: sa.id,
      name: sa.name,
      rect: toRect(sa.coords),
    }));
  }
}
