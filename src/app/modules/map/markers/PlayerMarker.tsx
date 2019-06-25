import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { LatLng, Marker } from "react-native-maps";

interface IProps {
  coordinate: LatLng;
}

class PlayerMarker extends React.Component<IProps> {

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
  height: 12,
  width: 12,
  backgroundColor: 'red',
  borderRadius: 6,
};

export default PlayerMarker;
