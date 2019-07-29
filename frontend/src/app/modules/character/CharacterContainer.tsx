import Constants from 'expo-constants';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Card, DefaultTheme, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import userSlice from '../../store/slices/userSlice';
import store, { IStoreState } from '../../store/store';
import { IUser } from '../../store/types/IUser';
import CharacterNameView from './views/CharacterNameView';
import CharacterStatsView from './views/CharacterStatsView';
import CharacterXpView from './views/CharacterXpView';

interface IProps {
  user: IUser;
}

function mapStateToProps(state: IStoreState): IProps {
  return {
    user: state.user
  }
}

class CharacterContainer extends React.Component<IProps> {
  public componentDidMount() {
    store.dispatch(userSlice.actions.fetchUser({}));
  }

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
      <CharacterXpView
        current={this.props.user.levelInfo.exp}
        max={this.props.user.levelInfo.expToNextLvl}
      />
      <CharacterStatsView stats={this.props.user.stats} />
    </Card>
  }
}

const cardStyle: StyleProp<ViewStyle> = {
  marginTop: Constants.statusBarHeight
};

export default connect(mapStateToProps)(CharacterContainer);
