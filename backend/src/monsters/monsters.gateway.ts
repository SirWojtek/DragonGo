import { UseFilters, UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetSpawnAreaMonsters, Monster } from '../../../api/monsters.api';
import { HttpToWsExceptionFilter } from '../filters/HttpToWsExceptionFilter';
import { UserEntity } from '../models/db/user.entity';
import { WsJwtGuard } from '../users/auth/ws-jwt.guard';
import { toMonster } from '../utils/mappers';
import { MonsterInstancesService } from './monster-instances.service';

interface IHandleSpawnAreaMonstersData extends GetSpawnAreaMonsters {
  // NOTE: filled in `WsJswtGuard`
  user: UserEntity;
}

@WebSocketGateway({ namespace: 'monsters' })
@UseFilters(new HttpToWsExceptionFilter())
export class MonstersGateway {
  constructor(private monsterInstancesService: MonsterInstancesService) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('spawn-area-monsters')
  async handleSpawnAreaMonsters(
    data: IHandleSpawnAreaMonstersData,
  ): Promise<Observable<WsResponse<Monster[]>>> {
    const user: UserEntity = data.user;
    const monsters = await this.monsterInstancesService.observeSpawnAreaMonsters(
      data.spawnAreaId,
      user.level,
    );

    return monsters.pipe(
      map(monsterInstances => monsterInstances.map(toMonster)),
      map(m => ({ event: 'spawn-area-monsters', data: m })),
    );
  }
}
