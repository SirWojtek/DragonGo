import {Location} from 'expo';
import {createSlice, PayloadAction} from 'redux-starter-kit';
import {ILocation} from '../types/ILocation';
import {IUser} from '../types/IUser';

export const SET_LOCATION = 'user/setLocation';

const USER_MAX_RANGE = 100;

const userSlice = createSlice({
  slice: 'user',
  initialState: {
    maxRange: 100,
  } as IUser,
  reducers: {
    setLocation: (state, action: {payload: ILocation}) => ({
      ...state,
      location: {...action.payload},
    }),
  },
});

export type SetLocationAction = PayloadAction<ILocation, string>;

export type UserActions = SetLocationAction;

export default userSlice;
