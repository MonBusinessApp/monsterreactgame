import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

enum ErrorLevel {
  info,
  warning,
  error,
}

export const notificationConfig = {
  durationinMs: 2000,
};

type NotificationMessage = { id: string; text: string; level: ErrorLevel };

export type NotificationState = {
  messages: NotificationMessage[];
};

const initialState: NotificationState = { messages: [] };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<NotificationMessage>) => {
        state.messages.push(action.payload);
      },
      prepare: (text: string) => {
        return {
          payload: { id: nanoid(), text, level: 1 },
        };
      },
    },
    remove(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter((n) => n.id != action.payload);
    },
  },
});

export const { add: createAddNotification, remove } = notificationSlice.actions;
export default notificationSlice.reducer;
