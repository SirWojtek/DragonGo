import { Module } from '@nestjs/common';
import { SpawnAreasController } from './spawn-areas.controller';
import { SpawnAreasService } from './spawn-areas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpawnAreaEnity } from '../models/db/spawn-area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpawnAreaEnity])],
  controllers: [SpawnAreasController],
  providers: [SpawnAreasService],
})
export class SpawnAreasModule {}
