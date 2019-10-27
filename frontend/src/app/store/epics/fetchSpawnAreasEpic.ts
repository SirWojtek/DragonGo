import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { throwError } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import SpawnAreaService from '../../services/SpawnAreaService';
import spawnAreasSlice from '../slices/spawnAreasSlice';
import { SET_LOCATION, SetLocationAction } from '../slices/userSlice';
import { IStoreState } from '../store';

const fetchSpawnAreasEpic: Epic<Action, Action, IStoreState> = (
  action,
  state
) =>
  action.pipe(
    ofType<Action, SetLocationAction>(SET_LOCATION),
    flatMap(a => {
      const accessToken = state.value.user.credentials.accessToken;
      if (!accessToken) {
        return throwError({ message: 'Access token not present' });
      }

      return SpawnAreaService.getSpawnAreas(a.payload, accessToken);
    }),
    map(areas =>
      areas.map(a => ({
        id: a.id,
        name: a.name,
        viewport: a.rect,
        monsters: []
      }))
    ),
    map(spawnAreas => spawnAreasSlice.actions.setSpawnAreas(spawnAreas))
  );

export default fetchSpawnAreasEpic;
