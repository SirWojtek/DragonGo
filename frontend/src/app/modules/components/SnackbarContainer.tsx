import Constants from 'expo-constants';
import React from 'react';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';

import { StyleProp, ViewStyle } from 'react-native';
import snackbarSlice, {
  ISnackbarStore
} from '../../store/slices/snackbarSlice';
import store, { IStoreState } from '../../store/store';

const defaultDismissFunction = () =>
  store.dispatch(snackbarSlice.actions.hide({}));

interface IProps extends ISnackbarStore {
  onDismiss: () => any;
}

function mapStateToProps(state: IStoreState): IProps {
  return {
    ...state.snackbar,
    onDismiss: state.snackbar.onDismiss || defaultDismissFunction
  };
}

class SnackbarContainer extends React.Component<IProps> {
  public render() {
    return (
      <Snackbar
        style={snackbarStyles}
        visible={this.props.visible}
        duration={this.props.duration}
        action={this.props.action}
        onDismiss={this.props.onDismiss}
      >
        {this.props.content}
      </Snackbar>
    );
  }
}

const snackbarStyles: StyleProp<ViewStyle> = {
  marginBottom: 64
};

export default connect(mapStateToProps)(SnackbarContainer);
