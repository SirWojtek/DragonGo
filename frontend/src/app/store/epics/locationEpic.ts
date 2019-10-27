import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { map, mergeMap } from 'rxjs/operators';

import LocationService from '../../services/LocationService';

import userSlice, {
  LOGIN_SUCCEED,
  LoginSucceedAction
} from '../slices/userSlice';

const locationEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    ofType<Action, LoginSucceedAction>(LOGIN_SUCCEED),
    mergeMap(() => LocationService.startWatching()),
    map(loc =>
      userSlice.actions.setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      })
    )
  );

export default locationEpic;
