import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BattleValuesMaker, Monster, MonsterMaker } from '../Models/monster';

export interface MonsterState {
  monsters: Monster[];
}

const initialState: MonsterState = {
  monsters: [
    new MonsterMaker({ id: 1, name: 'Schiggo' }),
    new MonsterMaker({ id: 2, name: 'Bisasa' }),
    new MonsterMaker({ id: 3, name: 'Gluwurak' }),
    new MonsterMaker({ id: 4, name: 'Bisawu', battleValues: new BattleValuesMaker({ currentHP: 10 }) }),
  ],
};

const monsterSlice = createSlice({
  name: 'monster',
  initialState,
  reducers: {
    addMon(state, action: PayloadAction<Monster>) {
      state.monsters.push(action.payload);
    },
    removeMon(state, action: PayloadAction<number>) {
      state.monsters.filter((v) => v.id != action.payload);
    },
  },
});

export const { addMon, removeMon } = monsterSlice.actions;
export default monsterSlice.reducer;
