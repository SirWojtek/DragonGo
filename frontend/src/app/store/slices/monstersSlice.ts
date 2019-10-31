import { createSlice, PayloadAction } from 'redux-starter-kit';
import { IMonster } from '../types/IMonster';

export const UPDATE_MONSTERS = 'monstersSlice/updateMonsters';
export const FETCH_MONSTERS = 'monstersSlice/fetchMonsters';

export type IMonsterStore = IMonster[];

const monstersSlice = createSlice({
  slice: 'monstersSlice',
  initialState: [] as IMonster[],
  reducers: {
    updateMonsters: (state, action: UpdateMonstersAction) => [
      ...state,
      ...action.payload
    ],
    // NOTE: fetch logic in epic
    fetchMonsters: (state, _: FetchMonstersAction) => state
  }
});

export type UpdateMonstersAction = PayloadAction<IMonster[], string>;

export type FetchMonstersAction = PayloadAction<string[], string>;

export type MonstersActions = UpdateMonstersAction | FetchMonstersAction;

export default monstersSlice;
