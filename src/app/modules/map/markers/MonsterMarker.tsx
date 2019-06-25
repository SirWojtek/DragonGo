import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { LatLng, Marker } from "react-native-maps";

interface IProps {
  coordinate: LatLng;
}

class MonsterMarker extends React.Component<IProps> {

  public render() {
    return (
      <Marker
        coordinate={this.props.coordinate}
      >
        <View style={markerStyle} />
      </Marker>
    );
  }
}

const markerStyle: StyleProp<ViewStyle> = {
  height: 8,
  width: 8,
  backgroundColor: 'yellow',
  borderRadius: 4,
};

export default MonsterMarker;
