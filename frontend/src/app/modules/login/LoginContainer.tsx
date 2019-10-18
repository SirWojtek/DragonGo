import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Button, Card, Headline, Surface, Text, TextInput} from 'react-native-paper';
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
      <View style={viewStyle}>
        <Card>
          <Card.Content>
            <Headline>DragonGo</Headline>
            <View>
              <TextInput
                label='Username'
                onChangeText={this.setUsername}
              />
              <TextInput
                secureTextEntry={true}
                label='Password'
                onChangeText={this.setUsername}
              />
            </View>
            { this.props.loginError && <Text>{ this.props.loginError }</Text> }
            <Button mode='contained'>LOGIN</Button>
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
  paddingHorizontal: 8,
  backgroundColor: 'blue',
};

const surfaceStyle: StyleProp<ViewStyle> = {
  height: '50%',
  width: '90%',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly'
};

export default connect(mapStateToProps)(LoginContainer);
