import {Location} from 'expo';
import {createSlice} from 'redux-starter-kit';
import {ILocation} from '../types/ILocation';
import {IUser} from '../types/IUser';

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
