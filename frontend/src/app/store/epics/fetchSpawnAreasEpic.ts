import {flatten, uniq} from 'lodash';
import {Epic, ofType} from 'redux-observable';
import {Action} from 'redux-starter-kit';
import {concat, of} from 'rxjs';
import {filter, flatMap, map, tap} from 'rxjs/operators';
import SpawnAreaService from '../../services/SpawnAreaService';
import monstersSlice from '../slices/monstersSlice';
import spawnAreasSlice, {SetSpawnAreasAction} from '../slices/spawnAreasSlice';
import {SET_LOCATION, SetLocationAction} from '../slices/userSlice';
import store, {Actions, IStoreState} from '../store';
import {ISpawnArea} from '../types/ISpawnArea';

function extractMonsterIds(spawnAreas: ISpawnArea[]): string[] {
  return uniq(flatten(spawnAreas.map(a => a.monsters.map(m => m.id))));
}

const fetchSpawnAreasEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    ofType<Action, SetLocationAction>(SET_LOCATION),
    flatMap(a => SpawnAreaService.getSpawnAreas(a.payload)),
    flatMap(spawnAreas =>
      concat(
        of(spawnAreasSlice.actions.setSpawnAreas(spawnAreas)),
        of(monstersSlice.actions.fetchMonsters(extractMonsterIds(spawnAreas))),
      ),
    ),
  );

export default fetchSpawnAreasEpic;
