import {InitialProps} from 'expo/build/launch/withExpoRoot.types';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux'
import ContentContainer from './ContentContainer';
import ModalContainer from './modules/components/ModalContainer';
import SnackbarContainer from './modules/components/SnackbarContainer';
import LocationService from './services/LocationService';
import StorageService from './services/StorageService';
import store from './store/store';


export default class App extends React.Component<InitialProps> {
  public componentWillMount() {
    LocationService.init().then(() => {});
    StorageService.loadCredentials().then(() => {});
  }

  public render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
            <ContentContainer />
            <SnackbarContainer />
            <ModalContainer />
        </PaperProvider>
      </StoreProvider>
    );
  }
}

