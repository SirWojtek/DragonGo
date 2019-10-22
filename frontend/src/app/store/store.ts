import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import fetchMonstersEpic from './epics/fetchMonstersEpic';
import fetchSpawnAreasEpic from './epics/fetchSpawnAreasEpic';
import loadCredentialsEpic from './epics/loadCredentialsEpic';
import loginEpic from './epics/loginEpic';
import loginStorageEpic from './epics/loginStorageEpic';
import modalSlice, { IModalStore, ModalActions } from './slices/modalSlice';
import monstersSlice, {
  IMonsterStore,
  MonstersActions
} from './slices/monstersSlice';
import snackbarSlice, {
  ISnackbarStore,
  SnackbarActions
} from './slices/snackbarSlice';
import spawnAreasSlice, { SpawnAreaActions } from './slices/spawnAreasSlice';
import userSlice, { UserActions } from './slices/userSlice';
import { ISpawnArea } from './types/ISpawnArea';
import { IUser } from './types/IUser';

export interface IStoreState {
  user: IUser;
  spawnAreas: ISpawnArea[];
  monsters: IMonsterStore;
  snackbar: ISnackbarStore;
  modal: IModalStore;
}

const reducers = combineReducers({
  user: userSlice.reducer,
  spawnAreas: spawnAreasSlice.reducer,
  monsters: monstersSlice.reducer,
  snackbar: snackbarSlice.reducer,
  modal: modalSlice.reducer
});

const epics = combineEpics(
  fetchSpawnAreasEpic,
  fetchMonstersEpic,
  loginEpic,
  loginStorageEpic,
  loadCredentialsEpic
);

const epicMiddleware = createEpicMiddleware();

const store: Store<IStoreState> = createStore(
  reducers,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(epics);

export type Actions =
  | UserActions
  | SpawnAreaActions
  | MonstersActions
  | SnackbarActions
  | ModalActions;

export default store;
