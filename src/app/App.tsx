import React from 'react';
import { Modal, Portal, Provider as PaperProvider, Text } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { Provider as StoreProvider } from 'react-redux'
import AppNavigator from './AppNavigator';
import ModalContainer from './modules/components/ModalContainer';
import SnackbarContainer from './modules/components/SnackbarContainer';
import MapContainer from './modules/map/MapContainer';
import LocationService from './services/LocationService';
import store from './store/store';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  public componentWillMount() {
    LocationService.init().then(() => {});
  }

  public render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
            <AppContainer />
            <SnackbarContainer />
            <ModalContainer />
        </PaperProvider>
      </StoreProvider>
    );
  }
}
