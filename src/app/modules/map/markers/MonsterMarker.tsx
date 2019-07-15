import React, { BaseSyntheticEvent } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { LatLng, MapEvent, Marker } from "react-native-maps";
import { IMonster } from "../../../store/types/IMonster";
import styles from './MonsterMarker.scss';

interface IProps {
  monster: IMonster;
  coordinate: LatLng;
  onPress: (coordinate: LatLng, monster: IMonster) => void;
}

class MonsterMarker extends React.Component<IProps> {

  public render() {
    return (
      <Marker
        coordinate={this.props.coordinate}
        onPress={event => this.props.onPress(event.nativeEvent.coordinate, this.props.monster)}
      >
        <View style={styles.monsterMarker as StyleProp<ViewStyle>} />
      </Marker>
    );
  }
}

export default MonsterMarker;
