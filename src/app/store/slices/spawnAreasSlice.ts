import {Location} from 'expo';
import {Action, createSlice, PayloadAction} from 'redux-starter-kit';
import {ILocation} from '../types/ILocation';
import {ISpawnArea} from '../types/ISpawnArea';

export const SET_SPAWN_AREAS = 'setSpawnAreas';

const spawnAreasSlice = createSlice({
  slice: 'spawnAreas',
  initialState: [] as ISpawnArea[],
  reducers: {
    setSpawnAreas: (state, action: {payload: ISpawnArea[]}) => {
      state = action.payload;
    },
  },
});

export type SetSpawnAreasAction = PayloadAction<ISpawnArea[], string>;

export type SpawnAreaActions = SetSpawnAreasAction;

export default spawnAreasSlice;
