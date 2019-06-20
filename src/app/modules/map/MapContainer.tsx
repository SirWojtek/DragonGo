import React from 'react';
import MapView from 'react-native-maps';

export default class MapContainer extends React.Component {
  public render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          latitudeDelta: 0.0922,
          longitude: -122.4324,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}
