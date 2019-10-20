import React from 'react';
import { Text } from 'react-native-paper';
import { IStats } from '../../../store/types/IStats';

interface IProps {
  stats: IStats;
}

class CharacterStatsView extends React.Component<IProps> {
  public render() {
    return <Text>CHARACTER STATS</Text>;
  }
}

export default CharacterStatsView;
