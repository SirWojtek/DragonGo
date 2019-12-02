import { createSlice, PayloadAction } from 'redux-starter-kit';
import { ILocation } from '../types/ILocation';
import { ISpawnArea } from '../types/ISpawnArea';

export const SET_SPAWN_AREAS = 'spawnAreas/setSpawnAreas';

export interface ISpawnAreasStore {
  spawnAreas: ISpawnArea[];
  lastFetchLocation: ILocation | undefined;
}

const spawnAreasSlice = createSlice({
  slice: 'spawnAreas',
  initialState: {
    spawnAreas: [],
    lastFetchLocation: undefined
  } as ISpawnAreasStore,
  reducers: {
    setSpawnAreas: (_, action: SetSpawnAreasAction) => action.payload
  }
});

interface ISetSpawnAreas {
  spawnAreas: ISpawnArea[];
  lastFetchLocation: ILocation;
}

export type SetSpawnAreasAction = PayloadAction<ISetSpawnAreas, string>;

export type SpawnAreaActions = SetSpawnAreasAction;

export default spawnAreasSlice;
