import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  Button,
  Card,
  Checkbox,
  Headline,
  Text,
  TextInput,
  Theme,
  withTheme
} from 'react-native-paper';
import { connect } from 'react-redux';
import userSlice from '../../store/slices/userSlice';
import store, { IStoreState } from '../../store/store';

interface IProps {
  loginError?: string;
  theme: Theme;
}

interface IState {
  username?: string;
  password?: string;
  rememberCredentials: boolean;
}

function mapStateToProps(state: IStoreState): Partial<IProps> {
  return {
    loginError: state.user.credentials && state.user.credentials.loginError
  };
}

class LoginContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      username: undefined,
      password: undefined,
      rememberCredentials: false
    };
  }

  public onLogin() {
    store.dispatch(userSlice.actions.setCredentials(this.state));
  }

  public render() {
    const backgroundColor = this.props.theme.colors.background;

    return (
      <View style={{ ...(viewStyle as object), backgroundColor }}>
        <Card>
          <Card.Content style={cardContentStyle}>
            <Headline style={headlineStyles}>DragonGo</Headline>
            <View>
              <TextInput
                style={textInputStyle}
                label="Username"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />
              <TextInput
                style={textInputStyle}
                secureTextEntry={true}
                label="Password"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                  status={
                    this.state.rememberCredentials ? 'checked' : 'unchecked'
                  }
                  onPress={() =>
                    this.setState({
                      rememberCredentials: !this.state.rememberCredentials
                    })
                  }
                />
                <Text>Remember me</Text>
              </View>
            </View>
            <Button
              style={buttonStyle}
              mode="contained"
              onPress={() => this.onLogin()}
            >
              LOGIN
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const viewStyle: StyleProp<ViewStyle> = {
  height: '100%',
  width: '100%',
  paddingTop: '40%',
  paddingHorizontal: 8
};

const cardContentStyle: StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'column'
};

const headlineStyles: StyleProp<ViewStyle> = {
  alignSelf: 'center',
  marginVertical: 32
};

const textInputStyle: StyleProp<ViewStyle> = {
  marginVertical: 8
};

const buttonStyle: StyleProp<ViewStyle> = {
  marginTop: 32
};

export default connect(mapStateToProps)(withTheme(LoginContainer));
