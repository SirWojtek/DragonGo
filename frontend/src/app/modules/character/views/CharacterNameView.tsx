import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Avatar, Title } from 'react-native-paper';

interface IProps {
  logoUrl?: string;
  name?: string;
}

class CharacterNameView extends React.Component<IProps> {
  public render() {
    const avatar = this.props.logoUrl ?
      <Avatar.Image size={64} source={{ uri: this.props.logoUrl }} /> :
      <Avatar.Icon size={64} icon='user' />;

    return <View style={containerStyle}>
      { avatar }
      <Title style={nameTextStyle}>{ this.props.name }</Title>
    </View>
  }
}

const containerStyle: StyleProp<ViewStyle> = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row'
};

const nameTextStyle: StyleProp<ViewStyle> = {
  marginLeft: 16,
};

export default CharacterNameView;
