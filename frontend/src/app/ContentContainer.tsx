import React from 'react';
import { createAppContainer } from 'react-navigation';

import { connect } from 'react-redux';
import AppNavigator from './AppNavigator';
import LoginContainer from './modules/login/LoginContainer';
import { IStoreState } from './store/store';

interface IProps {
  isLogedIn: boolean;
}

const AppContainer = createAppContainer(AppNavigator);

function mapStateToProps(state: IStoreState): IProps {
  return {
    isLogedIn: !!state.user.credentials.accessToken
  };
}

class ContentContainer extends React.Component<IProps> {
  public render() {
    return this.props.isLogedIn ? <AppContainer /> : <LoginContainer />;
  }
}

export default connect(mapStateToProps)(ContentContainer);
