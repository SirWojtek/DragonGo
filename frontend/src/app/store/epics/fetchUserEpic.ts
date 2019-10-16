import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { flatMap, map } from 'rxjs/operators';
import UserService from '../../services/UserService';
import userSlice, { FETCH_USER, FetchUserAction } from '../slices/userSlice';

const fetchUserEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    ofType<Action, FetchUserAction>(FETCH_USER),
    flatMap(() => UserService.fetchUser()),
    map(user =>
      userSlice.actions.setUser({
        name: user.username,
        levelInfo: {
          level: user.level
        }
      })
    )
  );

export default fetchUserEpic;
