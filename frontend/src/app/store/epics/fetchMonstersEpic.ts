import { flatten } from 'lodash';
import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { combineLatest, Observable, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import MonstersService from '../../services/MonstersService';
import monstersSlice from '../slices/monstersSlice';
import {
  SET_SPAWN_AREAS,
  SetSpawnAreasAction
} from '../slices/spawnAreasSlice';
import { IStoreState } from '../store';
import { IMonster } from '../types/IMonster';

const fetchMonstersEpic: Epic<Action, Action, IStoreState> = (action, state) =>
  action.pipe(
    ofType<Action, SetSpawnAreasAction>(SET_SPAWN_AREAS),
    map(a => a.payload),
    mergeMap(({ spawnAreas }) => {
      const accessToken = state.value.user.credentials.accessToken;
      if (!accessToken) {
        return throwError({ message: 'Access token not present' });
      }

      const monstersObs: Observable<IMonster[]>[] = spawnAreas.map(sa =>
        MonstersService.watchSpawnAreaMonsters(sa.id, accessToken).pipe(
          map(monsters =>
            monsters.map(m => ({
              ...m,
              spawnAreaId: sa.id
            }))
          )
        )
      );

      return combineLatest(monstersObs);
    }),
    map(monsters => {
      const flattenMonsters = flatten(monsters);
      return monstersSlice.actions.updateMonsters(flattenMonsters);
    })
  );

export default fetchMonstersEpic;
