import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Battle } from '../Models/battle';
import { BattlePrototype } from './battleStore';

export interface Quest {
  state: 'Active' | 'Ended' | 'New';
  id: number;
  name: string;
  teamId: number;
  battles: BattlePrototype | Battle[];
}

const questAdapter = createEntityAdapter<Quest>();

const questSlice = createSlice({
  name: 'quest',
  initialState: questAdapter.getInitialState(),
  reducers: {
    questAdded: questAdapter.addOne,
    questRemoved: questAdapter.removeOne,
    questUpdated: questAdapter.updateOne,
  },
});

export const { questAdded, questRemoved } = questSlice.actions;
export default questSlice.reducer;
