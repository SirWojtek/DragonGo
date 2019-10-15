import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Monster } from '../models/api/monsters.api';
import { MonsterInstancesService } from './monster-instances.service';
import { toMonster } from '../utils/mappers';
import { UseGuards, UseFilters } from '@nestjs/common';
import { WsJwtGuard } from '../users/auth/ws-jwt.guard';
import { UserEntity } from '../models/db/user.entity';
import { HttpToWsExceptionFilter } from '../filters/HttpToWsExceptionFilter';

@WebSocketGateway({ namespace: 'monsters' })
@UseFilters(new HttpToWsExceptionFilter())
export class MonstersGateway {
  constructor(private monsterInstancesService: MonsterInstancesService) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('spawn-area-monsters')
  async handleSpawnAreaMonsters(
    data: any,
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
