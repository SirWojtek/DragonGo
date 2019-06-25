import {flatten, uniq} from 'lodash';
import {Epic, ofType} from 'redux-observable';
import {Action} from 'redux-starter-kit';
import {filter, flatMap, map, tap} from 'rxjs/operators';
import SpawnAreaService from '../../services/SpawnAreaService';
import monstersSlice from '../slices/monstersSlice';
import spawnAreasSlice, {SetSpawnAreasAction} from '../slices/spawnAreasSlice';
import {SET_LOCATION, SetLocationAction} from '../slices/userSlice';
import {Actions, IStoreState} from '../store';
import {ISpawnArea} from '../types/ISpawnArea';

function extractMonsterIds(spawnAreas: ISpawnArea[]): string[] {
  return uniq(flatten(spawnAreas.map(m => m.id)));
}

const fetchSpawnAreasEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    ofType<Action, SetLocationAction>(SET_LOCATION),
    flatMap(a => SpawnAreaService.getSpawnAreas(a.payload)),
    tap(spawnAreas =>
      monstersSlice.actions.fetchMonsters(extractMonsterIds(spawnAreas)),
    ),
    map(spawnAreas => spawnAreasSlice.actions.setSpawnAreas(spawnAreas)),
  );

export default fetchSpawnAreasEpic;
