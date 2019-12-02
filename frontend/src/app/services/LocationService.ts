import {
  Accuracy,
  LocationData,
  LocationOptions,
  watchPositionAsync
} from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Observable, of } from 'rxjs';
import { getEnv } from '../../environment/environment';

const env = getEnv();

const LOCATION_OPTIONS: LocationOptions = {
  accuracy: Accuracy.High,
  timeInterval: 5000,
  distanceInterval: 10,
  mayShowUserSettingsDialog: true
};

const LocationService = {
  startWatching(): Observable<LocationData> {
    if (env.INITIAL_LOCATION) {
      return of({
        coords: {
          ...env.INITIAL_LOCATION,
          altitude: 0,
          accuracy: 1,
          heading: 1,
          speed: 1
        },
        timestamp: new Date().getDate()
      });
    }

    return new Observable(observer => {
      Permissions.askAsync(Permissions.LOCATION).then(res => {
        if (res.status !== 'granted') {
          observer.error({ message: 'Permission for location not granted' });
        }
        watchPositionAsync(LOCATION_OPTIONS, data => observer.next(data));
      });
    });
  }
};

export default LocationService;
