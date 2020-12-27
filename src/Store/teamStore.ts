import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Team } from '../Models/team';

export interface TeamState {
  teams: Team[];
}

const initialState = {
  teams: [
    {
      id: 1,
      monsterLineUp: [[1, 2, 3, 4]],
    },
  ],
} as TeamState;

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Team>) {
      state.teams.push(action.payload);
    },
    remove(state, action: PayloadAction<number>) {
      state.teams.filter((v) => v.id != action.payload);
    },
  },
});

export const { add, remove } = teamSlice.actions;
export default teamSlice.reducer;
