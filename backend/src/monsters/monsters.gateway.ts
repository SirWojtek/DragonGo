import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
} from '@nestjs/websockets';
import { Client } from 'socket.io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Monster } from '../models/api/monsters.api';
import { MonsterInstancesService } from './monster-instances.service';
import { toMonster } from '../utils/mappers';

@WebSocketGateway(3000, { namespace: 'monsters' })
export class MonstersGateway {
  constructor(private monsterInstancesService: MonsterInstancesService) {}

  @SubscribeMessage('spawn-area-monsters')
  handleSpawnAreaMonsters(
    client: Client,
    spawnAreaId: string,
  ): Observable<WsResponse<Monster[]>> {
    return this.monsterInstancesService.observeSpawnArea(spawnAreaId).pipe(
      map(monsterInstances => monsterInstances.map(toMonster)),
      map(data => ({ event: 'spawn-area-monsters', data })),
    );
  }
}
