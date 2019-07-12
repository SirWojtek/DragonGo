import React from 'react';
import { Text } from 'react-native-paper';

interface IProps {
  current: number;
  max: number;
}

class CharacterXpView extends React.Component<IProps> {
  public render() {
    return <Text>CHARACTER XP</Text>
  }
}

export default CharacterXpView;
