import { Module } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterMetadataEntity } from '../models/db/monster-metadata.entity';
import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonsterMetadataEntity, MonsterInstanceEntity]),
  ],
  providers: [MonstersService],
  controllers: [MonstersController],
})
export class MonstersModule {}
