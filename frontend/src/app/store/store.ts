import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import fetchMonstersEpic from './epics/fetchMonstersEpic';
import fetchSpawnAreasEpic from './epics/fetchSpawnAreasEpic';
import loadCredentialsEpic from './epics/loadCredentialsEpic';
import locationEpic from './epics/locationEpic';
import loginEpic from './epics/loginEpic';
import loginStorageEpic from './epics/loginStorageEpic';
import logoutStorageEpic from './epics/logoutStorageEpic';
import modalSlice, { IModalStore, ModalActions } from './slices/modalSlice';
import monstersSlice, {
  IMonsterStore,
  MonstersActions
} from './slices/monstersSlice';
import snackbarSlice, {
  ISnackbarStore,
  SnackbarActions
} from './slices/snackbarSlice';
import spawnAreasSlice, {
  ISpawnAreasStore,
  SpawnAreaActions
} from './slices/spawnAreasSlice';
import userSlice, { UserActions } from './slices/userSlice';
import { IUser } from './types/IUser';

export interface IStoreState {
  user: IUser;
  spawnAreas: ISpawnAreasStore;
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
  logoutStorageEpic,
  loadCredentialsEpic,
  locationEpic
);

const epicMiddleware = createEpicMiddleware();

const enhancer = composeWithDevTools({})(applyMiddleware(epicMiddleware));

const store: Store<IStoreState> = createStore(reducers, enhancer);

epicMiddleware.run(epics);

export type Actions =
  | UserActions
  | SpawnAreaActions
  | MonstersActions
  | SnackbarActions
  | ModalActions;

export default store;
