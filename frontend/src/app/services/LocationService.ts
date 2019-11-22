import {
  Accuracy,
  LocationData,
  LocationOptions,
  watchPositionAsync
} from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Observable } from 'rxjs';

const LOCATION_OPTIONS: LocationOptions = {
  accuracy: Accuracy.High,
  timeInterval: 5000,
  distanceInterval: 10,
  mayShowUserSettingsDialog: true
};

const LocationService = {
  startWatching(): Observable<LocationData> {
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
