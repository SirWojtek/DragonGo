import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { GetSpawnAreaMonsters, Monster } from '../../../../api/monsters.api';
import { getEnv } from '../../environment/environment';

const env = getEnv();

const MonstersService = {
  watchSpawnAreaMonsters(
    spawnAreaId: string,
    accessToken: string
  ): Observable<Monster[]> {
    const socket = io.connect(`${env.API_HOST}/monsters`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    } as SocketIOClient.ConnectOpts);

    return new Observable(observer => {
      socket.on('connect', () => {
        const request: GetSpawnAreaMonsters = { spawnAreaId };
        socket.emit('spawn-area-monsters', request);

        socket.on('spawn-area-monsters', (res: Monster[]) =>
          observer.next(res)
        );
        socket.on('exception', (err: Error) => observer.error(err));
        socket.on('disconnect', () => observer.complete());
      });
    });
  }
};

export default MonstersService;
