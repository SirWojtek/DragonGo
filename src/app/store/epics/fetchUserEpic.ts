import {Epic, ofType} from 'redux-observable';
import {Action} from 'redux-starter-kit';
import {filter, flatMap, map, tap} from 'rxjs/operators';
import UserService from '../../services/UserService';
import userSlice, {FETCH_USER, FetchUserAction} from '../slices/userSlice';
import {Actions, IStoreState} from '../store';

const fetchUserEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    ofType<Action, FetchUserAction>(FETCH_USER),
    flatMap(a => UserService.fetchUser()),
    map(user => userSlice.actions.setUser(user)),
  );

export default fetchUserEpic;
