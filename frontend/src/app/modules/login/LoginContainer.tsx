import React from 'react';
import {View} from 'react-native';
import {Button, Headline, Surface, Text, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import userSlice from '../../store/slices/userSlice';
import {IStoreState} from '../../store/store';

interface IProps {
  loginError?: string;
}

function mapStateToProps(state: IStoreState): IProps {
  return {
    loginError: state.user.credentials && state.user.credentials.loginError
  };
}

 class LoginContainer extends React.Component<IProps> {
   constructor(props: IProps) {
     super(props);

     this.state = {
       username: undefined,
       password: undefined
     };
   }

  public setUsername(username: string) {
    this.setState({ username });
  }

  public setPassword(password: string) {
    this.setState({ password });
  }

   public onLogin() {
     userSlice.actions.setCredentials(this.state);
   }

  public render() {
    return (
      <View>
        <Surface>
          <Headline>DragonGo</Headline>
          <TextInput
            label='Username'
            onChangeText={this.setUsername}
          />
          <TextInput
            secureTextEntry={true}
            label='Password'
            onChangeText={this.setUsername}
          />
          { this.props.loginError && <Text>{ this.props.loginError }</Text> }
          <Button mode='contained'>LOGIN</Button>
        </Surface>
      </View>
    );
  }
}

export default connect(mapStateToProps)(LoginContainer);
