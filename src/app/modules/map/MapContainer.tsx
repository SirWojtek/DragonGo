import React from 'react';
import { Text } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

class MapContainer extends React.Component {
  public render() {
    if (!this.props.user.location) {
      return ( <Text>Loading location...</Text>);
    }

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.props.user.location.latitude,
          latitudeDelta: 0.0922,
          longitude: this.props.user.location.longitude,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

export default connect(mapStateToProps)(MapContainer);

