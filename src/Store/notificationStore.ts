import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

enum ErrorLevel {
  info,
  warning,
  error,
}

let maxId = 0;

export const notificationConfig = {
  durationinMs: 2000,
};

type NotificationMessage = { id: number; text: string; level: ErrorLevel };

export type NotificationState = {
  messages: NotificationMessage[];
};

const initialState: NotificationState = { messages: [] };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    add(state, action: PayloadAction<NotificationMessage>) {
      state.messages.push(action.payload);
    },
    remove(state, action: PayloadAction<number>) {
      state.messages = state.messages.filter((n) => n.id != action.payload);
    },
  },
});

export const { add, remove } = notificationSlice.actions;
export default notificationSlice.reducer;

export const addNotificationCreator = createAsyncThunk<
  // Return type of the payload creator
  { blob: string },
  // First argument to the payload creator
  string,
  // Types for ThunkAPI
  {
    state: RootState;
  }
>('notification/show', async (text, thunkApi) => {
  const state = thunkApi.getState();

  console.log(maxId);
  const myId = maxId + 1;
  thunkApi.dispatch(
    add({
      id: myId,
      level: 1,
      text,
    }),
  );

  maxId = maxId + 1;
  return { blob: 'hallo' };
});
