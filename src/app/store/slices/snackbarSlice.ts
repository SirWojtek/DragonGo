import {Action, createSlice, PayloadAction} from 'redux-starter-kit';

export const UPDATE_MONSTERS = 'monstersSlice/updateMonsters';
export const FETCH_MONSTERS = 'monstersSlice/fetchMonsters';

export interface ISnackbarShow {
  content: React.ReactNode;
  action?: {label: string; accessibilityLabel?: string; onPress: () => void};
  duration?: number;
  onDismiss?: () => void;
}

export interface ISnackbarStore extends ISnackbarShow {
  visible: boolean;
}

const snackbarSlice = createSlice({
  slice: 'snackbarSlice',
  initialState: {
    visible: false,
    content: '',
  } as ISnackbarStore,
  reducers: {
    show: (state, action: ShowSnackbarAction) => ({
      visible: true,
      ...action.payload,
    }),
    hide: (state, action: HideSnackbarAction) => ({
      visible: false,
      content: '',
    }),
  },
});

export type ShowSnackbarAction = PayloadAction<ISnackbarShow, string>;

export type HideSnackbarAction = Action<string>;

export type SnackbarActions = ShowSnackbarAction | HideSnackbarAction;

export default snackbarSlice;
