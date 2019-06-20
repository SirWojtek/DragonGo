import {Location} from 'expo';
import {createSlice} from 'redux-starter-kit';

export interface IUser {
  location: Location;
}

const userSlice = createSlice({
  slice: 'user',
  initialState: {} as IUser,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export default userSlice;
