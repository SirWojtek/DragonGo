import { flatten, uniq } from 'lodash';
import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { concat, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import SpawnAreaService from '../../services/SpawnAreaService';
import monstersSlice from '../slices/monstersSlice';
import spawnAreasSlice from '../slices/spawnAreasSlice';
import { SET_LOCATION, SetLocationAction } from '../slices/userSlice';
import { ISpawnArea } from '../types/ISpawnArea';

function extractMonsterIds(spawnAreas: ISpawnArea[]): string[] {
  return uniq(flatten(spawnAreas.map(a => a.monsters.map(m => m.id))));
}

const fetchSpawnAreasEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    ofType<Action, SetLocationAction>(SET_LOCATION),
    flatMap(a => SpawnAreaService.getSpawnAreas(a.payload)),
    map(areas =>
      areas.map(a => ({
        id: a.id,
        name: a.name,
        viewport: a.rect,
        monsters: []
      }))
    ),
    flatMap(spawnAreas =>
      concat(
        of(spawnAreasSlice.actions.setSpawnAreas(spawnAreas)),
        of(monstersSlice.actions.fetchMonsters(extractMonsterIds(spawnAreas)))
      )
    )
  );

export default fetchSpawnAreasEpic;
