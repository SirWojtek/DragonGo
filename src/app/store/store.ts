import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import fetchMonstersEpic from './epics/fetchMonstersEpic';
import fetchSpawnAreasEpic from './epics/fetchSpawnAreasEpic';
import monstersSlice, {MonstersActions} from './slices/monstersSlice';
import spawnAreasSlice, {SpawnAreaActions} from './slices/spawnAreasSlice';
import userSlice, {UserActions} from './slices/userSlice';
import {ISpawnArea} from './types/ISpawnArea';
import {IUser} from './types/IUser';

export interface IStoreState {
  user: IUser;
  spawnAreas: ISpawnArea[];
}

const reducers = combineReducers({
  user: userSlice.reducer,
  spawnAreas: spawnAreasSlice.reducer,
  monsters: monstersSlice.reducer,
});

const epics = combineEpics(fetchSpawnAreasEpic, fetchMonstersEpic);

const epicMiddleware = createEpicMiddleware();

const store: Store<IStoreState> = createStore(
  reducers,
  applyMiddleware(epicMiddleware),
);

epicMiddleware.run(epics);

export type Actions = UserActions | SpawnAreaActions | MonstersActions;

export default store;
