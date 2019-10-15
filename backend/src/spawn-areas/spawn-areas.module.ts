import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapFragmentEntity } from '../models/db/map-fragment.entity';
import { SpawnAreaEntity } from '../models/db/spawn-area.entity';
import { ServicesModule } from '../services/services.module';
import { SpawnAreasController } from './spawn-areas.controller';
import { SpawnAreasService } from './spawn-areas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpawnAreaEntity, MapFragmentEntity]),
    ServicesModule,
  ],
  controllers: [SpawnAreasController],
  providers: [SpawnAreasService],
  exports: [SpawnAreasService],
})
export class SpawnAreasModule {}
