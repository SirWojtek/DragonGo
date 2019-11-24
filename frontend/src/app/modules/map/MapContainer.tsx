import React from 'react';
import { Text } from 'react-native';
import MapView, { Point } from 'react-native-maps';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/store';
import { IUser } from '../../store/types/IUser';
import { pointDistance } from '../../utils/distance';
import { mapStyle } from './data/mapStyle';
import PlayerMarker from './markers/PlayerMarker';
import SpawnAreasContainer from './SpawnAreasContainer';

interface IProps {
  user: IUser;
}

interface IState {
  previousPosition?: Point;
  previousTimestamp: number;
  heading: number;
  zoom: number;
}

const PAN_EVENT_TIMESTAMP_MAX_DELTA = 100;
const PANNING_SPEED = 0.1;
const ZOOM_OUT = 16;
const ZOOM_IN = 20;

function mapStateToProps(state: IStoreState): IProps {
  return {
    user: state.user
  };
}

class MapContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      heading: 0,
      zoom: ZOOM_OUT,
      previousTimestamp: 0
    };
  }

  public render() {
    if (!this.props.user.location) {
      return <Text>Loading location...</Text>;
    }

    return (
      <MapView
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
        minZoomLevel={this.state.zoom}
        maxZoomLevel={this.state.zoom}
        scrollEnabled={false}
        pitchEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        showsCompass={false}
        moveOnMarkerPress={false}
        camera={{
          center: {
            latitude: this.props.user.location.lat,
            longitude: this.props.user.location.lng
          },
          pitch: 45,
          heading: this.state.heading,
          altitude: 1000,
          zoom: this.state.zoom
        }}
        onPanDrag={event =>
          this.onPanDrag(event.nativeEvent.position, event.timeStamp)
        }
        onDoublePress={() => this.onDoublePress()}
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
    if (
      timestamp - this.state.previousTimestamp <
        PAN_EVENT_TIMESTAMP_MAX_DELTA &&
      this.state.previousPosition
    ) {
      const deltaX = position.x - this.state.previousPosition.x;

      let alpha = pointDistance(position, this.state.previousPosition);
      if (deltaX < 0) {
        alpha = -alpha;
      }
      const newHeading = this.state.heading + PANNING_SPEED * alpha;

      this.setState({ heading: newHeading });
    }

    this.setState({
      previousPosition: position,
      previousTimestamp: timestamp
    });
  }

  private onDoublePress() {
    const zoom = this.state.zoom === ZOOM_OUT ? ZOOM_IN : ZOOM_OUT;
    this.setState({ zoom });
  }
}

export default connect(mapStateToProps)(MapContainer);
