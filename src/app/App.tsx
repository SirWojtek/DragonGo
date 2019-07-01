import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux'
import SnackbarContainer from './modules/components/SnackbarContainer';
import MapContainer from './modules/map/MapContainer';
import LocationService from './services/LocationService';
import store from './store/store';

export default class App extends React.Component {
  public componentWillMount() {
    LocationService.init().then(() => {});
  }

  public render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
            <MapContainer />
            <SnackbarContainer />
        </PaperProvider>
      </StoreProvider>
    );
  }
}
