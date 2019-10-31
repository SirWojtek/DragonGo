import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Polygon } from 'geojson';
import { random, range } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';
import { MonsterMetadataEntity } from '../models/db/monster-metadata.entity';
import { SpawnAreaEntity } from '../models/db/spawn-area.entity';
import { ConfigKeyEnum, ConfigService } from '../services/config.service';
import { SpawnAreasService } from '../spawn-areas/spawn-areas.service';
import { generatePointWithinPolygon } from '../utils/geojson';

@Injectable()
export class MonsterInstancesService {
  private spawnAreaToMonsterInstancesBS: {
    [spawnAreaId: string]: BehaviorSubject<SpawnAreaEntity>;
  } = {};

  private logger = new Logger(MonsterInstancesService.name);

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
  ): Promise<BehaviorSubject<SpawnAreaEntity>> {
    let spawnArea = await this.spawnAreasService.getSpawnAreaWithMonsters(
      spawnAreaId,
    );

    if (!spawnArea) {
      throw new BadRequestException('Cannot find spawn area with given id');
    }

    const currentMonsterCount = spawnArea.monsterInstances.length;
    if (
      currentMonsterCount <
      this.configService.get(ConfigKeyEnum.MONSTER_INSTANCES_MIN_MONSTERS)
    ) {
      const monsters = await this.getMonstersWithLevel(
        userLevel,
        currentMonsterCount,
        spawnArea.coords,
      );
      spawnArea = await this.spawnAreasService.setMonsters(spawnArea, [
        ...spawnArea.monsterInstances,
        ...monsters,
      ]);
    }

    return new BehaviorSubject<SpawnAreaEntity>(spawnArea);
  }

  private async getMonstersWithLevel(
    level: number,
    currentMonsterCount: number,
    bounds: Polygon,
  ): Promise<MonsterInstanceEntity[]> {
    const maxMonsters = this.configService.get(
      ConfigKeyEnum.MONSTER_INSTANCES_MAX_MONSTERS,
    ) as number;
    const countToBeGenerated = random(1, maxMonsters - currentMonsterCount);

    const matchingMonstersMetadata = await this.monsterMetadataRepository.find({
      minLevel: LessThanOrEqual(level),
      maxLevel: MoreThanOrEqual(level),
    });

    if (!matchingMonstersMetadata.length) {
      this.logger.warn(
        `Cannot find matching monster metadata for level ${level}`,
      );
      return [];
    }

    return this.generateMonsters(
      matchingMonstersMetadata,
      countToBeGenerated,
      bounds,
    );
  }

  private async generateMonsters(
    metadata: MonsterMetadataEntity[],
    count: number,
    bounds: Polygon,
  ): Promise<MonsterInstanceEntity[]> {
    const monsterInstances = range(count).map(() => {
      const indexOfMetadata = random(0, metadata.length - 1);
      const pickedMetadata = metadata[indexOfMetadata];
      const level = random(pickedMetadata.minLevel, pickedMetadata.maxLevel);

      return this.monsterInstanceRepository.create({
        monsterMetadataId: pickedMetadata.id,
        level,
        latLng: generatePointWithinPolygon(bounds),
      });
    });

    return this.monsterInstanceRepository.save(monsterInstances);
  }
}
