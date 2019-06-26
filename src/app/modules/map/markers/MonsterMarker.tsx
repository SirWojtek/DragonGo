import React, { BaseSyntheticEvent } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { LatLng, MapEvent, Marker } from "react-native-maps";
import { IMonster } from "../../../store/types/IMonster";

interface IProps {
  coordinate: LatLng;
  monster: IMonster;
  onPress: (event: MapEvent<{ action: "marker-press"; id: string; }>) => void;
}

class MonsterMarker extends React.Component<IProps> {

  public render() {
    return (
      <Marker
        coordinate={this.props.coordinate}
        title={`${this.props.monster.name} (${this.props.monster.level} lvl)`}
        onPress={this.props.onPress}
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
