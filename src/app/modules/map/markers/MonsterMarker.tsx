import React, { BaseSyntheticEvent } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { LatLng, MapEvent, Marker } from "react-native-maps";
import { IMonster } from "../../../store/types/IMonster";

interface IProps {
  coordinate: LatLng;
  monster: IMonster;
  onPress: (markerRef: Marker | null, event: MapEvent<{ action: "marker-press"; id: string; }>) => void;
}

class MonsterMarker extends React.Component<IProps> {
  public markerRef: Marker | null = null;

  public render() {
    return (
      <Marker
        ref={ref => this.markerRef = ref}
        coordinate={this.props.coordinate}
        title={`${this.props.monster.name} (${this.props.monster.level} lvl)`}
        onPress={event => this.props.onPress(this.markerRef, event)}
      >
        <View style={markerStyle} />
      </Marker>
    );
  }
}

const markerStyle: StyleProp<ViewStyle> = {
  height: 8,
  width: 8,
  backgroundColor: 'orange',
  borderRadius: 4,
};

export default MonsterMarker;
