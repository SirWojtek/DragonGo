import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MonsterMetadataEntity } from '../models/db/monster-metadata.entity';
import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';

@Injectable()
export class MonstersService {
  constructor(
    @InjectRepository(MonsterMetadataEntity)
    private monstersMetadataRepository: Repository<MonsterMetadataEntity>,
    @InjectRepository(MonsterInstanceEntity)
    private monstersInstanceRepository: Repository<MonsterInstanceEntity>,
  ) {}

  async findAllMonsterInstances(
    ids: string[],
  ): Promise<MonsterInstanceEntity[]> {
    return this.monstersInstanceRepository.findByIds(ids);
  }

  async generateMonsterInstances(
    metadataIds: string[],
  ): Promise<MonsterInstanceEntity[]> {
    const metadatas = await this.monstersMetadataRepository.findByIds(
      metadataIds,
    );

    const monsterInstances = metadatas.map(metadata =>
      this.monstersInstanceRepository.create({
        level: this.generateLevel(metadata.minLevel, metadata.maxLevel),
        monsterMetadata: metadata,
      }),
    );

    return this.monstersInstanceRepository.save(monsterInstances);
  }

  private generateLevel(minLevel: number, maxLevel: number): number {
    return Math.floor(Math.random() * (maxLevel - minLevel)) + minLevel;
  }
}
