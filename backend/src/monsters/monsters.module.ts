import { Module } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterMetadataEntity } from '../models/db/monster-metadata.entity';
import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';
import { MonstersGateway } from './monsters.gateway';
import { MonsterInstancesService } from './monster-instances.service';
import { SpawnAreasModule } from '../spawn-areas/spawn-areas.module';
import { UsersModule } from '../users/users.module';
import { ServicesModule } from '../services/services.module';

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
