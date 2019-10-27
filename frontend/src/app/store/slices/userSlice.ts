import { merge } from 'lodash';
import { Action, createSlice, PayloadAction } from 'redux-starter-kit';
import { RecursivePartial } from '../../utils/RecursivePartial';
import { ICredentials } from '../types/ICredentials';
import { ILocation } from '../types/ILocation';
import { IUser } from '../types/IUser';

export const SET_LOCATION = 'user/setLocation';
export const LOAD_CREDENTIALS = 'user/loadCredentials';
export const LOGIN = 'user/login';
export const LOGIN_SUCCEED = 'user/loginSucceed';
export const LOGOUT = 'user/logout';

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
    loadCredentials: () => {},
    login: (state, action: LoginAction) => {
      merge(state.credentials, action.payload);
    },
    loginSucceed: (state, action: LoginSucceedAction) => {
      merge(state, action.payload);
    },
    logout: state => ({
      ...state,
      credentials: {
        rememberCredentials: false
      }
    })
  }
});

export type SetLocationAction = PayloadAction<ILocation, string>;
export type LoginSucceedAction = PayloadAction<RecursivePartial<IUser>, string>;
export type LoadCredentialsAction = Action;
export type LoginAction = PayloadAction<Partial<ICredentials>, string>;
export type LogoutAction = Action;

export type UserActions =
  | SetLocationAction
  | LoginSucceedAction
  | LoadCredentialsAction
  | LoginAction
  | LogoutAction;

export default userSlice;
