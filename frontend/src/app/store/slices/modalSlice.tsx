import React from 'react';
import { Text } from 'react-native-paper';
import {Action, createSlice, PayloadAction} from 'redux-starter-kit';

export interface IModalShow {
  content: React.ReactNode;
  dismissable?: boolean;
  onDismiss?: () => void;
}

export interface IModalStore extends IModalShow {
  visible: boolean;
}

const modalSlice = createSlice({
  slice: 'modalSlice',
  initialState: {
    visible: false,
    content: <Text />,
  } as IModalStore,
  reducers: {
    show: (_, action: ShowModalAction) => ({
      visible: true,
      ...action.payload,
    }),
    hide: () => ({
      visible: false,
      content: <Text />,
    }),
  },
});

export type ShowModalAction = PayloadAction<IModalShow, string>;

export type HideModalAction = Action<string>;

export type ModalActions = ShowModalAction | HideModalAction;

export default modalSlice;
