import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

import { of } from 'rxjs';
import UserService from '../../services/UserService';
import snackbarSlice from '../slices/snackbarSlice';
import userSlice, { SET_USER, SetUserAction } from '../slices/userSlice';

const loginEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    ofType<Action, SetUserAction>(SET_USER),
    map(a => a.payload.credentials),
    filter(creds => !!creds && !creds.accessToken),
    mergeMap(creds =>
      UserService.login(creds).pipe(
        map(res =>
          userSlice.actions.setUser({
            maxRange: res.user.maxRange,
            levelInfo: {
              level: res.user.level
            },
            credentials: {
              accessToken: res.accessToken
            }
          })
        ),
        catchError(err =>
          of(
            snackbarSlice.actions.show({
              content: `Login failed. ${err && err.message}`,
              duration: 5000
            })
          )
        )
      )
    )
  );

export default loginEpic;
