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

interface IState {
  previousPosition?: Point;
  previousTimestamp: number;
  heading: number;

}

const PAN_EVENT_TIMESTAMP_MAX_DELTA = 100;
const PANNING_SPEED = 0.1;

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
      previousTimestamp: 0,
    }
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
        rotateEnabled={false}
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
        onPanDrag={event => this.onPanDrag(event.nativeEvent.position, event.timeStamp)}
      >
        <PlayerMarker
          coordinate={this.props.user.location}
          range={this.props.user.maxRange}
      />
        <SpawnAreasContainer />
      </MapView>
    );
  }

  private onPanDrag(position: Point, timestamp: number) {
    if (timestamp - this.state.previousTimestamp < PAN_EVENT_TIMESTAMP_MAX_DELTA  && this.state.previousPosition) {
      const delta: Point = {
        x: position.x - this.state.previousPosition.x,
        y: position.y - this.state.previousPosition.y,
      };

      let alpha = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
      if (delta.x < 0) {
        alpha = - alpha;
      }
      const newHeading = this.state.heading + PANNING_SPEED * alpha;

      this.setState({ heading: newHeading});
    }

    this.setState({
      previousPosition: position,
      previousTimestamp: timestamp
    });
  }
}

export default connect(mapStateToProps)(MapContainer);

