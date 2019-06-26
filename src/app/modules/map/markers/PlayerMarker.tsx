import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Circle, LatLng, Marker } from "react-native-maps";

interface IProps {
  coordinate: LatLng;
  range: number;
}

class PlayerMarker extends React.Component<IProps> {

  public render() {
    return (
      <View>
        <Marker
          coordinate={this.props.coordinate}
        >
          <View style={markerStyle} />
        </Marker>
        <Circle
          center={this.props.coordinate}
          radius={this.props.range}
          strokeWidth={3}
          strokeColor={'rgba(0, 0, 150, 0.5)'}
        />
      </View>
    );
  }
}

const markerStyle: StyleProp<ViewStyle> = {
  height: 12,
  width: 12,
  backgroundColor: 'red',
  borderRadius: 6,
};

export default PlayerMarker;
