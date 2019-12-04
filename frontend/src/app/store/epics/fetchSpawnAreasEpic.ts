import { getDistance } from 'geolib';
import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { of, throwError } from 'rxjs';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import { getEnv } from '../../../environment/environment';
import SpawnAreaService from '../../services/SpawnAreaService';
import spawnAreasSlice from '../slices/spawnAreasSlice';
import { SET_LOCATION, SetLocationAction } from '../slices/userSlice';
import { IStoreState } from '../store';

const env = getEnv();

const fetchSpawnAreasEpic: Epic<Action, Action, IStoreState> = (
  action,
  state
) =>
  action.pipe(
    ofType<Action, SetLocationAction>(SET_LOCATION),
    filter(a => {
      const { lastFetchLocation } = state.value.spawnAreas;
      return (
        !lastFetchLocation ||
        getDistance(lastFetchLocation, a.payload) >
          env.SPAWN_AREA_FETCH_DISTANCE
      );
    }),
    flatMap(a => {
      const accessToken = state.value.user.credentials.accessToken;
      if (!accessToken) {
        return throwError({ message: 'Access token not present' });
      }

      return SpawnAreaService.getSpawnAreas(a.payload, accessToken).pipe(
        map(areas => ({ areas, lastFetchLocation: a.payload }))
      );
    }),
    catchError(() => of({ areas: [], lastFetchLocation: undefined })),
    map(({ areas, lastFetchLocation }) => ({
      spawnAreas: (areas || []).map(a => ({
        id: a.id,
        name: a.name,
        viewport: a.rect,
        monsters: []
      })),
      lastFetchLocation
    })),
    map(({ spawnAreas, lastFetchLocation }) =>
      spawnAreasSlice.actions.setSpawnAreas({ spawnAreas, lastFetchLocation })
    )
  );

export default fetchSpawnAreasEpic;
