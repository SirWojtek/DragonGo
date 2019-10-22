import Constants from 'expo-constants';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import userSlice from '../../store/slices/userSlice';
import store, { IStoreState } from '../../store/store';
import CharacterNameView from './views/CharacterNameView';

interface IProps {
  username: string;
  logoUrl?: string;
}

function mapStateToProps(state: IStoreState): IProps {
  return {
    username: state.user.credentials.username,
    logoUrl: state.user.logoUrl
  };
}

class CharacterContainer extends React.Component<IProps> {
  public onLogout() {
    store.dispatch(userSlice.actions.setUser({ credentials: {} }));
  }

  public render() {
    return (
      <Card style={cardStyle}>
        <CharacterNameView
          name={this.props.username}
          logoUrl={this.props.logoUrl}
        />
        <Button onPress={() => this.onLogout()}>LOGOUT</Button>
      </Card>
    );
  }
}

const cardStyle: StyleProp<ViewStyle> = {
  marginTop: Constants.statusBarHeight
};

export default connect(mapStateToProps)(CharacterContainer);
