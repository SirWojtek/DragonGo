import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import MapView, { Point } from 'react-native-maps';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { getEnv } from '../../../environment/environment';
import { IStoreState } from '../../store/store';
import { IUser } from '../../store/types/IUser';
import { pointDistance } from '../../utils/distance';
import { mapStyle } from './data/mapStyle';
import DevLocationButtons from './DevLocationButtons';
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

const env = getEnv();

const PAN_EVENT_TIMESTAMP_MAX_DELTA = 100;
const PANNING_SPEED = 0.1;
const ZOOM_OUT = 16;
const ZOOM_IN = 19;

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
      <View style={{ flex: 1 }}>
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
        >
          <PlayerMarker
            coordinate={this.props.user.location}
            range={this.props.user.maxRange}
          />
          <SpawnAreasContainer />
        </MapView>
        <View style={zoomContainerStyles}>
          <FAB
            style={{ marginBottom: 8 }}
            small={true}
            icon="add"
            disabled={this.state.zoom === ZOOM_IN}
            onPress={() => this.onZoom(1)}
          />
          <FAB
            small={true}
            icon="remove"
            disabled={this.state.zoom === ZOOM_OUT}
            onPress={() => this.onZoom(-1)}
          />
        </View>
        {env.INITIAL_LOCATION && <DevLocationButtons />}
      </View>
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

  private onZoom(value: number) {
    const zoom = this.state.zoom + value;
    this.setState({ zoom });
  }
}

const zoomContainerStyles: StyleProp<ViewStyle> = {
  position: 'absolute',
  margin: 16,
  right: 0,
  bottom: 0
};

export default connect(mapStateToProps)(MapContainer);
