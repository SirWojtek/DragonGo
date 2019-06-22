import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import fetchSpawnAreasEpic from './epics/fetchSpawnAreasEpic';
import spawnAreasSlice, {SpawnAreaActions} from './slices/spawnAreasSlice';
import userSlice, {UserActions} from './slices/userSlice';
import {IUser} from './types/IUser';

export interface IStoreState {
  user: IUser;
}

const reducers = combineReducers({
  user: userSlice.reducer,
  spawnAreas: spawnAreasSlice.reducer,
});

const epics = combineEpics(fetchSpawnAreasEpic);

const epicMiddleware = createEpicMiddleware();

const store: Store<IStoreState> = createStore(
  reducers,
  applyMiddleware(epicMiddleware),
);

epicMiddleware.run(epics);

export type Actions = UserActions | SpawnAreaActions;

export default store;
