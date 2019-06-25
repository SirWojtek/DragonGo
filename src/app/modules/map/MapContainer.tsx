import React from 'react';
import { Text } from 'react-native';
import MapView, { Camera, LatLng, Marker, Point } from 'react-native-maps';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/store';
import { IUser } from '../../store/types/IUser';
import PlayerMarker from './markers/PlayerMarker';
import SpawnAreasContainer from './SpawnAreasContainer';

interface IProps {
  user: IUser;
}

function mapStateToProps(state: IStoreState): IProps {
  return {
    user: state.user,
  };
}

class MapContainer extends React.Component<IProps> {

  public render() {
    if (!this.props.user.location) {
      return ( <Text>Loading location...</Text>);
    }

    return (
      <MapView
        style={{ flex: 1 }}
        minZoomLevel={16}
        maxZoomLevel={16}
        scrollEnabled={false}
        pitchEnabled={false}
        zoomEnabled={false}
        showsCompass={false}
        moveOnMarkerPress={false}
        camera={{
          center: {
            latitude: this.props.user.location.latitude,
            longitude: this.props.user.location.longitude,
          },
          pitch: 45,
          heading: 0,
          altitude: 1000,
          zoom: 16
        }}
      >
        <PlayerMarker coordinate={this.props.user.location} />
        <SpawnAreasContainer />
      </MapView>
    );
  }
}

export default connect(mapStateToProps)(MapContainer);

