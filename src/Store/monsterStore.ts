import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { createBattleValues, createMonster, Monster, TakeDamageEvent } from '../Models/monster';
import { RootState } from './store';

export interface MonsterState {
  monsters: Monster[];
}

const initialState: MonsterState = {
  monsters: [
    createMonster({ id: 1, name: 'Schiggo', teamId: 1 }),
    createMonster({ id: 2, name: 'Bisasa', teamId: 1 }),
    createMonster({ id: 3, name: 'Gluwurak', teamId: 1 }),
    createMonster({ id: 4, name: 'Bisawu', battleValues: createBattleValues({ currentHP: 10 }), teamId: 1 }),
    createMonster({ id: 5, name: 'Schiggo2', teamId: 2 }),
    createMonster({ id: 6, name: 'Bisasa2', teamId: 2 }),
    createMonster({ id: 7, name: 'Gluwurak2', teamId: 2 }),
    createMonster({ id: 8, name: 'Bisawu2', battleValues: createBattleValues({ currentHP: 10 }), teamId: 2 }),
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
    takeDamage(state, action: TakeDamageEvent) {
      const mon = state.monsters.find((m) => m.id == action.payload.monId);
      if (mon == undefined) {
        throw 'Could not find monster';
      }
      mon.battleValues.currentHP -= action.payload.HP;
    },
  },
});

export function getMonster(mId: number): Monster | undefined {
  return useSelector((state: RootState) => state.monster.monsters.find((m) => m.id == mId));
}

export const { addMon, removeMon, takeDamage } = monsterSlice.actions;
export default monsterSlice.reducer;
