import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { filter, map, mergeMap } from 'rxjs/operators';

import StorageService from '../../services/StorageService';
import userSlice, {
  LOAD_CREDENTIALS,
  LoadCredentialsAction
} from '../slices/userSlice';

const loadCredentialsEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    ofType<Action, LoadCredentialsAction>(LOAD_CREDENTIALS),
    mergeMap(() => StorageService.loadCredentials()),
    filter(creds => !!creds),
    map(creds => userSlice.actions.setCredentials(creds || {}))
  );

export default loadCredentialsEpic;
