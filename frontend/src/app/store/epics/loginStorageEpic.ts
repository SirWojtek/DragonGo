import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { filter, ignoreElements, map, mergeMap } from 'rxjs/operators';

import StorageService from '../../services/StorageService';
import { SET_USER, SetUserAction } from '../slices/userSlice';
import { IStoreState } from '../store';

const loginStorageEpic: Epic<Action, Action, IStoreState> = (action, state) =>
  action.pipe(
    ofType<Action, SetUserAction>(SET_USER),
    map(a => state.value.user.credentials),
    filter(
      creds => !!creds && !!creds.rememberCredentials && !!creds.accessToken
    ),
    mergeMap(creds => StorageService.saveCredentials(creds)),
    ignoreElements() // NOTE: do not emit action
  );

export default loginStorageEpic;