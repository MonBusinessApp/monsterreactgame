import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Battle } from '../Models/battle';

export interface BattleState {
  battles: Battle[];
}

const initialState = {
  battles: [
    {
      id: 1,
      teams: [1, 2],
    },
  ],
} as BattleState;

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Battle>) {
      state.battles.push(action.payload);
    },
    remove(state, action: PayloadAction<number>) {
      state.battles.filter((v) => v.id != action.payload);
    },
  },
});

export const { add, remove } = battleSlice.actions;
export default battleSlice.reducer;
