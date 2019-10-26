import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetSpawnAreas, SpawnArea } from '../../../api/spawn-areas.api';
import { toSpawnArea } from '../utils/mappers';
import { SpawnAreasService } from './spawn-areas.service';

@Controller('spawn-areas')
export class SpawnAreasController {
  private logger = new Logger(SpawnAreasController.name);

  constructor(private spawnAreasService: SpawnAreasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('get-spawn-areas')
  async getSpawnAreas(
    @Body() getSpawnAreas: GetSpawnAreas,
  ): Promise<SpawnArea[]> {
    this.logger.debug('/spawn-areas/get-spawn-areas');

    const spawnAreaEntities = await this.spawnAreasService.findSpawnAreasForLocation(
      getSpawnAreas.location,
    );

    return spawnAreaEntities.map(toSpawnArea);
  }
}
