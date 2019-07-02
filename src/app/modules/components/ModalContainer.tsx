import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { connect } from 'react-redux';

import modalSlice, { IModalStore } from '../../store/slices/modalSlice';
import store, { IStoreState } from '../../store/store';

const defaultDismissFunction = () => store.dispatch(modalSlice.actions.hide({}));

interface IProps extends IModalStore {
  onDismiss: () => void;
}

function mapStateToProps(state: IStoreState): IProps {

  return {
    ...state.modal,
    onDismiss: state.modal.onDismiss || defaultDismissFunction
  }
}

class ModalContainer extends React.Component<IProps> {

  public render() {
    return <Portal>
        <Modal
          visible={this.props.visible}
          dismissable={this.props.dismissable}
          onDismiss={this.props.onDismiss}
        >{this.props.content}</Modal>
      </Portal>
  }
}

export default connect(mapStateToProps)(ModalContainer);
