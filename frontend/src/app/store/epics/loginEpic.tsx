import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import UserService from '../../services/UserService';
import snackbarSlice from '../slices/snackbarSlice';
import userSlice, {
  SET_CREDENTIALS,
  SetCredentialAction
} from '../slices/userSlice';

const loginEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    // tap(console.log),
    ofType<Action, SetCredentialAction>(SET_CREDENTIALS),
    mergeMap(creds =>
      UserService.login({
        username: creds.payload.username,
        password: creds.payload.password
      }).pipe(
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
