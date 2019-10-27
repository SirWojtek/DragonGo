import { merge } from 'lodash';
import { createSlice, PayloadAction } from 'redux-starter-kit';
import { ISpawnArea } from '../types/ISpawnArea';

export const SET_SPAWN_AREAS = 'spawnAreas/setSpawnAreas';

const spawnAreasSlice = createSlice({
  slice: 'spawnAreas',
  initialState: [] as ISpawnArea[],
  reducers: {
    setSpawnAreas: (state, action: SetSpawnAreasAction) => {
      merge(state, action.payload);
    }
  }
});

export type SetSpawnAreasAction = PayloadAction<ISpawnArea[], string>;

export type SpawnAreaActions = SetSpawnAreasAction;

export default spawnAreasSlice;
