import { merge } from 'lodash';
import { Action, createSlice, PayloadAction } from 'redux-starter-kit';
import { RecursivePartial } from '../../utils/RecursivePartial';
import { ILocation } from '../types/ILocation';
import { IUser } from '../types/IUser';

export const SET_LOCATION = 'user/setLocation';
export const SET_USER = 'user/setUser';
export const SET_CREDENTIALS = 'user/setCredentials';
export const LOAD_CREDENTIALS = 'user/loadCredentials';

const userSlice = createSlice({
  slice: 'user',
  initialState: {
    credentials: {
      rememberCredentials: false
    }
  } as IUser,
  reducers: {
    setLocation: (state, action: SetLocationAction) => ({
      ...state,
      location: { ...action.payload }
    }),
    setUser: (state, action: SetUserAction) => {
      merge(state, action.payload);
    },
    loadCredentials: () => {}
  }
});

export type SetLocationAction = PayloadAction<ILocation, string>;
export type SetUserAction = PayloadAction<RecursivePartial<IUser>, string>;
export type LoadCredentialsAction = Action;
export type UserActions =
  | SetLocationAction
  | SetUserAction
  | LoadCredentialsAction;

export default userSlice;
