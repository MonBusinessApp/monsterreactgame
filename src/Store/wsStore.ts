import { createSlice } from '@reduxjs/toolkit';

export interface WebSocketState {
  isConnected: boolean;
}

const initialState: WebSocketState = { isConnected: false };

const wsSlice = createSlice({
  name: 'webSocket',
  initialState: initialState,
  reducers: {
    connected(state: WebSocketState) {
      state.isConnected = true;
      return state;
    },
    disconected(state: WebSocketState) {
      state.isConnected = false;
    },
  },
});

export const { connected, disconected } = wsSlice.actions;
export default wsSlice.reducer;
