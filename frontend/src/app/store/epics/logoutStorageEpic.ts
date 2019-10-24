import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { ignoreElements, mergeMap } from 'rxjs/operators';

import StorageService from '../../services/StorageService';
import { LOGOUT, LogoutAction } from '../slices/userSlice';
import { IStoreState } from '../store';

const logoutStorageEpic: Epic<Action, Action, IStoreState> = action =>
  action.pipe(
    ofType<Action, LogoutAction>(LOGOUT),
    mergeMap(() => StorageService.clearCredentials()),
    ignoreElements() // NOTE: do not emit action
  );

export default logoutStorageEpic;
