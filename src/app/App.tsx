import React from 'react';
import { Provider } from 'react-redux'
import MapContainer from './modules/map/MapContainer';
import LocationService from './services/LocationService';
import store from './store/store';

export default class App extends React.Component {
  public componentWillMount() {
    LocationService.init().then(() => {});
  }

  public render() {
    return (
      <Provider store={store}>
        <MapContainer />
      </Provider>
    );
  }
}
