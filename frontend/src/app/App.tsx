import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { connect, Provider as StoreProvider } from 'react-redux'
import AppNavigator from './AppNavigator';
import ModalContainer from './modules/components/ModalContainer';
import SnackbarContainer from './modules/components/SnackbarContainer';
import LoginContainer from './modules/login/LoginContainer';
import LocationService from './services/LocationService';
import UserService from './services/UserService';
import store, {IStoreState} from './store/store';

const AppContainer = createAppContainer(AppNavigator);

interface IProps {
  username: string | undefined;
}

function mapStateToProps(state: IStoreState) {
  return {
    username: state.user.name
  }
}

class App extends React.Component<IProps> {
  public componentWillMount() {
    LocationService.init().then(() => {});
    UserService.init().then(() => {});
  }

  public render() {
    const element = this.props.username ?
      <AppContainer /> : <LoginContainer />

    return (
      <StoreProvider store={store}>
        <PaperProvider>
            { element }
            <SnackbarContainer />
            <ModalContainer />
        </PaperProvider>
      </StoreProvider>
    );
  }
}

export default connect(mapStateToProps)(App);
