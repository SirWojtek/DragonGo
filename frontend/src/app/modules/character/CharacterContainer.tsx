import Constants from 'expo-constants';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/store';
import { IUser } from '../../store/types/IUser';
import CharacterNameView from './views/CharacterNameView';

interface IProps {
  user: IUser;
}

function mapStateToProps(state: IStoreState): IProps {
  return {
    user: state.user
  }
}

class CharacterContainer extends React.Component<IProps> {
  public render() {
    if (!this.props.user.levelInfo) {
      return <Card style={cardStyle}>
        <Text>Loading user</Text>
      </Card>
    }

    return <Card style={cardStyle}>
      <CharacterNameView
        name={this.props.user.name}
        logoUrl={this.props.user.logoUrl}
      />
    </Card>
  }
}

const cardStyle: StyleProp<ViewStyle> = {
  marginTop: Constants.statusBarHeight
};

export default connect(mapStateToProps)(CharacterContainer);
