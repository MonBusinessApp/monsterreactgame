import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Team } from '../Models/team';
import { RootState } from './store';

export interface TeamState {
  teams: Team[];
}

const initialState = {
  teams: [
    {
      id: 1,
      monsters: [1, 2, 3, 4],
      players: [1],
    },
    {
      id: 2,
      monsters: [5, 6, 7, 8],
      players: [2],
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

export function getTeam(tId: number): Team | undefined {
  return useSelector((state: RootState) => state.team.teams.find((t) => t.id == tId));
}

export const { add, remove } = teamSlice.actions;
export default teamSlice.reducer;
