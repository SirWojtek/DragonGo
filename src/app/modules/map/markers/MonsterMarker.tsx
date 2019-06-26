import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { LatLng, Marker } from "react-native-maps";
import { IMonster } from "../../../store/types/IMonster";

interface IProps {
  coordinate: LatLng;
  monster: IMonster;
}

class MonsterMarker extends React.Component<IProps> {

  public render() {
    return (
      <Marker
        coordinate={this.props.coordinate}
        title={this.getTitle()}
      >
        <View style={markerStyle} />
      </Marker>
    );
  }

  private getTitle() {
    return `${this.props.monster.name} (${this.props.monster.level})`;
  }

}

const markerStyle: StyleProp<ViewStyle> = {
  height: 8,
  width: 8,
  backgroundColor: 'orange',
  borderRadius: 4,
};

export default MonsterMarker;
