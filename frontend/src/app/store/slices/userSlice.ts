import { merge } from 'lodash';
import { Action, createSlice, PayloadAction } from 'redux-starter-kit';
import { RecursivePartial } from '../../utils/RecursivePartial';
import { ICredentials } from '../types/ICredentials';
import { ILocation } from '../types/ILocation';
import { IUser } from '../types/IUser';

export const SET_LOCATION = 'user/setLocation';
export const SET_USER = 'user/setUser';
export const SET_CREDENTIALS = 'user/setCredentials';

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
    setCredentials: (state, action: SetCredentialAction) => {
      merge(state.credentials, action.payload);
    }
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
