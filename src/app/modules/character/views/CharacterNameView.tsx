import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Avatar, Title } from 'react-native-paper';
import styles from './CharacterNameView.scss';

interface IProps {
  logoUrl?: string;
  name: string;
}

class CharacterNameView extends React.Component<IProps> {
  public render() {
    const avatar = this.props.logoUrl ?
      <Avatar.Image size={64} source={{ uri: this.props.logoUrl }} /> :
      <Avatar.Icon size={64} icon="user" />;

    return <View style={styles.container as StyleProp<ViewStyle>}>
      { avatar }
      <Title style={styles.nameText}>{ this.props.name }</Title>
    </View>
  }
}

export default CharacterNameView;
