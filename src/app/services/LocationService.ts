import {Constants, Location, Permissions} from 'expo';
import userSlice from '../store/slices/userSlice';
import store from '../store/store';

const LocationService = {
  async init() {
    const {status} = await Location.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // TODO: set state
      return;
    }
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 100,
        mayShowUserSettingsDialog: true,
      },
      LocationService._onLocationUpdate,
    );
  },

  _onLocationUpdate(location: Location) {
    store.dispatch(userSlice.actions.setLocation(location));
  },
};

export default LocationService;
