import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Quest = {
  id: number;
  name: string;
};

const questAdapter = createEntityAdapter<Quest>();

const questSlice = createSlice({
  name: 'quest',
  initialState: questAdapter.getInitialState(),
  reducers: {
    userAdded: questAdapter.addOne,
    userRemoved: questAdapter.removeOne,
    userUpdated: questAdapter.updateOne,
  },
});

export const { userAdded, userRemoved } = questSlice.actions;
export default questSlice.reducer;
