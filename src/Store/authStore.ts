import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoggedIn = { type: 'loggedIn'; userId: number };
type LoggedOut = { type: 'loggedOut' };

export type AuthState = LoggedIn | LoggedOut;

const initialState: AuthState = { type: 'loggedOut' };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    logout() {
      return { type: 'loggedOut' } as AuthState;
    },
    login(state, action: PayloadAction<{ userId: number }>) {
      return {
        type: 'loggedIn',
        userId: action.payload.userId,
      } as LoggedIn;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
