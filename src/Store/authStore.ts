import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoggedIn = { type: 'loggedIn'; userId: number };
export type LoggedOut = { type: 'loggedOut' };

export type AuthState = LoggedIn | LoggedOut;

const initialState: AuthState = { type: 'loggedIn', userId: 1 };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    logout() {
      return { type: 'loggedOut' } as AuthState;
    },
    login(_, action: PayloadAction<{ userId: number }>) {
      return {
        type: 'loggedIn',
        userId: action.payload.userId,
      } as LoggedIn;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
