import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';
import { IMonster } from '../../store/types/IMonster';

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
          title={this.props.monster.name}
          left={props => <Avatar.Icon {...props} icon="info" />}
        />
        <Card.Content>
          <Paragraph>Monster level: {this.props.monster.level}</Paragraph>
        </Card.Content>
        <Card.Actions style={actionsStyle}>
          <Button
            style={buttonStyle}
            mode="contained"
            onPress={() => this.props.onExitClick()}
          >
            Exit
          </Button>
          <Button style={buttonStyle} mode="contained" disabled={true}>
            Fight
          </Button>
        </Card.Actions>
      </Card>
    );
  }
}

const actionsStyle: StyleProp<ViewStyle> = {
  display: 'flex',
  justifyContent: 'center'
};

const buttonStyle: StyleProp<ViewStyle> = {
  marginRight: 8
};

export default MonsterInfo;
