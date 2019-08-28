import { Module } from '@nestjs/common';
import { SpawnAreasController } from './spawn-areas.controller';
import { SpawnAreasService } from './spawn-areas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpawnAreaEnity } from '../models/db/spawn-area.entity';
import { MapFragmentEntity } from '../models/db/map-fragment.entity';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpawnAreaEnity, MapFragmentEntity]),
    ServicesModule,
  ],
  controllers: [SpawnAreasController],
  providers: [SpawnAreasService],
  exports: [SpawnAreasService],
})
export class SpawnAreasModule {}
