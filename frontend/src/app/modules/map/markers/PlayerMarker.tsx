import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Circle, Marker } from 'react-native-maps';
import { ILocation } from '../../../store/types/ILocation';

interface IProps {
  coordinate: ILocation;
  range: number;
}

class PlayerMarker extends React.Component<IProps> {
  public render() {
    return (
      <View>
        <Marker
          coordinate={{
            latitude: this.props.coordinate.lat,
            longitude: this.props.coordinate.lng
          }}
        >
          <View style={markerStyle} />
        </Marker>
        <Circle
          center={{
            latitude: this.props.coordinate.lat,
            longitude: this.props.coordinate.lng
          }}
          radius={this.props.range}
          strokeWidth={2}
          strokeColor={'rgba(0, 0, 150, 0.3)'}
        />
      </View>
    );
  }
}

const markerStyle: StyleProp<ViewStyle> = {
  height: 12,
  width: 12,
  backgroundColor: 'red',
  borderRadius: 6
};

export default PlayerMarker;
