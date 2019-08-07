import { Module } from '@nestjs/common';
import { SpawnAreasController } from './spawn-areas.controller';
import { SpawnAreasService } from './spawn-areas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpawnAreaEnity } from '../models/db/spawn-area.entity';
import { MapFragmentEntity } from '../models/db/map-fragment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpawnAreaEnity, MapFragmentEntity])],
  controllers: [SpawnAreasController],
  providers: [SpawnAreasService],
})
export class SpawnAreasModule {}
