import {Epic, ofType} from 'redux-observable';
import {Action} from 'redux-starter-kit';
import {flatMap, map} from 'rxjs/operators';
import SpawnAreaService from '../../services/SpawnAreaService';
import spawnAreasSlice, {SetSpawnAreasAction} from '../slices/spawnAreasSlice';
import {SET_LOCATION, SetLocationAction} from '../slices/userSlice';
import {Actions, IStoreState} from '../store';

const fetchSpawnAreasEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    ofType<Action, SetLocationAction>(SET_LOCATION),
    flatMap(a => SpawnAreaService.getSpawnAreas(a.payload)),
    map(spawnAreas => spawnAreasSlice.actions.setSpawnAreas(spawnAreas)),
  );

export default fetchSpawnAreasEpic;
