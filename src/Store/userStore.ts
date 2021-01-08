import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number;
  name: string;
};

const userAdapter = createEntityAdapter<User>();

const userSlice = createSlice({
  name: 'user',
  initialState: userAdapter.getInitialState(),
  reducers: {
    userAdded: userAdapter.addOne,
    userRemoved: userAdapter.removeOne,
    userUpdated: userAdapter.updateOne,
  },
});

export const { userAdded, userRemoved } = userSlice.actions;
export default userSlice.reducer;
