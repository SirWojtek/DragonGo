import {combineReducers, createStore} from 'redux';
import userSlice from './slices/userSlice';

const reducers = combineReducers({
  user: userSlice.reducer,
});

const store = createStore(reducers);

export default store;
