import {Location} from 'expo';
import {createSlice} from 'redux-starter-kit';

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IUser {
  location: ILocation;
}

const userSlice = createSlice({
  slice: 'user',
  initialState: {} as IUser,
  reducers: {
    setLocation: (state, action: {payload: ILocation}) => {
      state.location = action.payload;
    },
  },
});

export default userSlice;
