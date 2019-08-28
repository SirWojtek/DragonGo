import { Injectable } from '@nestjs/common';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';
import { SpawnAreasService } from '../spawn-areas/spawn-areas.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MonsterMetadataEntity } from '../models/db/monster-metadata.entity';
import { Repository } from 'typeorm';
import { ConfigService, ConfigKeyEnum } from '../services/config.service';
import { SpawnAreaEnity } from '../models/db/spawn-area.entity';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class MonsterInstancesService {
  private spawnAreaToMonsterInstancesBS: {
    [spawnAreaId: string]: BehaviorSubject<SpawnAreaEnity>;
  } = {};

  constructor(
    private spawnAreasService: SpawnAreasService,
    @InjectRepository(MonsterInstanceEntity)
    private monsterInstanceRepository: Repository<MonsterInstanceEntity>,
    @InjectRepository(MonsterMetadataEntity)
    private monsterMetadataRepository: Repository<MonsterMetadataEntity>,
    private configService: ConfigService,
  ) {}

  async observeSpawnAreaMonsters(
    spawnAreaId: string,
    userLevel: number,
  ): Promise<Observable<MonsterInstanceEntity[]>> {
    const spawnAreaBS = this.spawnAreaToMonsterInstancesBS[spawnAreaId];

    if (spawnAreaBS) {
      return spawnAreaBS.asObservable().pipe(map(sa => sa.monsterInstances));
    }

    const newSubject = await this.createSubject(spawnAreaId, userLevel);
    this.spawnAreaToMonsterInstancesBS[spawnAreaId] = newSubject;
    return newSubject.asObservable().pipe(map(sa => sa.monsterInstances));
  }

  private async createSubject(
    spawnAreaId: string,
    userLevel: number,
  ): Promise<BehaviorSubject<SpawnAreaEnity>> {
    let spawnArea = await this.spawnAreasService.getSpawnArea(spawnAreaId);

    if (!spawnArea) {
      throw Error('Cannot find spawn area with given id');
    }

    const currentMonsterCount = spawnArea.monsterInstances.length;
    if (
      currentMonsterCount <
      this.configService.get(ConfigKeyEnum.MONSTER_INSTANCES_MIN_MONSTERS)
    ) {
      const monsters = await this.getMonsterWithLevel(
        userLevel,
        currentMonsterCount,
      );
      spawnArea = await this.spawnAreasService.setMonsters(spawnArea, [
        ...spawnArea.monsterInstances,
        ...monsters,
      ]);
    }

    return new BehaviorSubject<SpawnAreaEnity>(spawnArea);
  }

  private async getMonsterWithLevel(
    level: number,
    currentMonsterCount: number,
  ): Promise<MonsterInstanceEntity[]> {
    return [];
  }
}
