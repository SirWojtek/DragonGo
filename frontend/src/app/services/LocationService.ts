import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import userSlice from '../store/slices/userSlice';
import store from '../store/store';

const LocationService = {
  async init() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // TODO: set state
      return;
    }
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 100,
        mayShowUserSettingsDialog: true
      },
      LocationService._onLocationUpdate
    );
  },

  _onLocationUpdate(location: Location.LocationData) {
    store.dispatch(
      userSlice.actions.setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
    );
  }
};

export default LocationService;
