import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';

@Injectable()
export class MonsterInstancesService {
  private spawnAreaToMonsterInstancesOb: {
    [spawnAreaId: string]: Observable<MonsterInstanceEntity[]>;
  } = {};

  observeSpawnArea(spawnAreaId: string): Observable<MonsterInstanceEntity[]> {
    const monsterInstancesOb = this.spawnAreaToMonsterInstancesOb[spawnAreaId];

    if (monsterInstancesOb) {
      return monsterInstancesOb;
    } else {
      // TODO: check if spawn area exists and generate monsters
      return of([]);
    }
  }
}
