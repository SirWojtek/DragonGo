import React from 'react';
import { Text } from 'react-native-paper';

interface IProps {
  logoUrl?: string;
  name: string;
}

class CharacterNameView extends React.Component<IProps> {
  public render() {
    return <Text>CHARACTER NAME</Text>
  }
}

export default CharacterNameView;
