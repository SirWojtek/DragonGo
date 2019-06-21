import React from 'react';
import { Text } from 'react-native';
import MapView, { Camera, LatLng, Marker, Point } from 'react-native-maps';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/store';
import { IUser } from '../../store/types/IUser';
import PlayerMarker from './PlayerMarker';

interface IProps {
  user: IUser;
}

interface IState {
  heading: number;
  cord: LatLng;
}

function mapStateToProps(state: IStoreState): IProps {
  return {
    user: state.user,
  };
}

class MapContainer extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);


    this.state = {
      heading: 0,
      cord: {
        latitude: 0,
        longitude: 0,
      }
    };

  }

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
          heading: this.state.heading,
          altitude: 1000,
          zoom: 16
        }}
      >
        <PlayerMarker coordinate={this.props.user.location} />
      </MapView>
    );
  }
}

export default connect(mapStateToProps)(MapContainer);

