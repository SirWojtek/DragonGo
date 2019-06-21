import {combineReducers, createStore, Store} from 'redux';
import userSlice from './slices/userSlice';
import {IUser} from './types/IUser';

export interface IStoreState {
  user: IUser;
}

const reducers = combineReducers({
  user: userSlice.reducer,
});

const store: Store<IStoreState> = createStore(reducers);

export default store;
