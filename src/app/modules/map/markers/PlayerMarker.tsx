import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Circle, LatLng, Marker } from "react-native-maps";
import styles from './PlayerMarker.scss';

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
          <View style={styles.playerMarker as StyleProp<ViewStyle>} />
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

export default PlayerMarker;
