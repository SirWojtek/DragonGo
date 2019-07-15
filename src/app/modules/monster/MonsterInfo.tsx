import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Avatar, Button, Card, Paragraph, Title } from 'react-native-paper';
import { defaultIfEmpty } from 'rxjs/operators';
import { IMonster } from '../../store/types/IMonster';
import styles from './MonsterInfo.scss';

interface IProps {
  monster: IMonster;
  onExitClick: () => void;
  onFightClick?: () => void;
}

class MonsterInfo extends React.Component<IProps> {

  public render() {
    if (!this.props.monster) {
      return null;
    }

    return (
      <Card>
        <Card.Title
          title="Monster Information"
          left={props => <Avatar.Icon {...props} icon="info" />}
        />
        <Card.Content>
          <Title>{this.props.monster.name}</Title>
          <Paragraph>Monster level: {this.props.monster.level}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actionsStyle as StyleProp<ViewStyle>}>
          <Button
            style={styles.buttonStyle as StyleProp<ViewStyle>}
            mode="contained"
            onPress={() => this.props.onExitClick() }
          >Exit</Button>
          <Button
            style={styles.buttonStyle as StyleProp<ViewStyle>}
            mode="contained"
            disabled={true}
          >Fight</Button>
        </Card.Actions>
      </Card>
    )
  }
}

export default MonsterInfo;
