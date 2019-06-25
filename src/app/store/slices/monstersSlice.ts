import {createSlice, PayloadAction} from 'redux-starter-kit';
import {IMonster} from '../types/IMonster';

export const UPDATE_MONSTERS = 'monstersSlice/updateMonsters';
export const FETCH_MONSTERS = 'monstersSlice/fetchMonsters';

export interface IMonsterStore {
  [id: string]: IMonster;
}

const monstersSlice = createSlice({
  slice: 'monstersSlice',
  initialState: {} as IMonsterStore,
  reducers: {
    updateMonsters: (state, action: UpdateMonstersAction) =>
      action.payload.reduce(
        (store, m) => ({
          [m.id]: m,
          ...store,
        }),
        state,
      ),
    fetchMonsters: (state, action: FetchMonstersAction) => {
      // NOTE: fetching logic in the epic
    },
  },
});

export type UpdateMonstersAction = PayloadAction<IMonster[], string>;

export type FetchMonstersAction = PayloadAction<string[], string>;

export type MonstersActions = UpdateMonstersAction | FetchMonstersAction;

export default monstersSlice;
