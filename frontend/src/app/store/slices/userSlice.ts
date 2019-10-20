import { merge } from 'lodash';
import { Action, createSlice, PayloadAction } from 'redux-starter-kit';
import { RecursivePartial } from '../../utils/RecursivePartial';
import { ICredentials } from '../types/ICredentials';
import { ILocation } from '../types/ILocation';
import { IUser } from '../types/IUser';

export const SET_LOCATION = 'user/setLocation';
export const SET_USER = 'user/setUser';
export const SET_CREDENTIALS = 'user/setCredentials';

const USER_MAX_RANGE = 100;

const userSlice = createSlice({
  slice: 'user',
  initialState: {
    maxRange: USER_MAX_RANGE
  } as IUser,
  reducers: {
    setLocation: (state, action: SetLocationAction) => ({
      ...state,
      location: { ...action.payload }
    }),
    setUser: (state, action: SetUserAction) => merge(state, action.payload),
    setCredentials: (state, action: SetCredentialAction) => ({
      ...state,
      credentials: merge(state.credentials, action.payload)
    })
  }
});

export type SetLocationAction = PayloadAction<ILocation, string>;
export type SetUserAction = PayloadAction<RecursivePartial<IUser>, string>;
export type SetCredentialAction = PayloadAction<Partial<ICredentials>, string>;
export type FetchUserAction = Action;
export type UserActions =
  | SetLocationAction
  | SetUserAction
  | SetCredentialAction;

export default userSlice;
