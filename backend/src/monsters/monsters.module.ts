import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';
import { MonsterMetadataEntity } from '../models/db/monster-metadata.entity';
import { ServicesModule } from '../services/services.module';
import { SpawnAreasModule } from '../spawn-areas/spawn-areas.module';
import { UsersModule } from '../users/users.module';
import { MonsterInstancesService } from './monster-instances.service';
import { MonstersController } from './monsters.controller';
import { MonstersGateway } from './monsters.gateway';
import { MonstersService } from './monsters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonsterMetadataEntity, MonsterInstanceEntity]),
    SpawnAreasModule,
    UsersModule,
    ServicesModule,
  ],
  providers: [MonstersService, MonsterInstancesService, MonstersGateway],
  controllers: [MonstersController],
})
export class MonstersModule {}
