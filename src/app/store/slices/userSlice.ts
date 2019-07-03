import {Location} from 'expo';
import {Action, createSlice, PayloadAction} from 'redux-starter-kit';
import {ILocation} from '../types/ILocation';
import {IUser} from '../types/IUser';

export const SET_LOCATION = 'user/setLocation';
export const SET_USER = 'user/setUser';
export const FETCH_USER = 'user/fetchUser';

const USER_MAX_RANGE = 100;

const userSlice = createSlice({
  slice: 'user',
  initialState: {
    maxRange: 100,
  } as IUser,
  reducers: {
    setLocation: (state, action: SetLocationAction) => ({
      ...state,
      location: {...action.payload},
    }),
    setUser: (state, action: SetUserAction) => ({
      ...state,
      ...action.payload,
    }),
    // NOTE: fetch logic in epic
    fetchUser: (state, action: FetchUserAction) => state,
  },
});

export type SetLocationAction = PayloadAction<ILocation, string>;
export type SetUserAction = PayloadAction<Partial<IUser>, string>;
export type FetchUserAction = Action;
export type UserActions = SetLocationAction | SetUserAction;

export default userSlice;
