import React from 'react';
import { createAppContainer } from 'react-navigation';

import {connect} from 'react-redux';
import AppNavigator from './AppNavigator';
import LoginContainer from './modules/login/LoginContainer';
import {IStoreState} from './store/store';

interface IProps {
  username: string | undefined;
}

const AppContainer = createAppContainer(AppNavigator);

function mapStateToProps(state: IStoreState) {
  return {
    username: state.user.name
  }
}

class ContentContainer extends React.Component<IProps> {

  public render() {
    return this.props.username ? <AppContainer /> : <LoginContainer />
  }
}

export default connect(mapStateToProps)(ContentContainer);
