import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { createBattleValues, createMonster, Monster, TakeDamageEvent } from '../Models/monster';
import { RootState } from './store';

const monsterAdapter = createEntityAdapter<Monster>();

const initialState = monsterAdapter.addMany(monsterAdapter.getInitialState(), [
  createMonster({ id: 1, name: 'Schiggo', teamId: 1 }),
  createMonster({ id: 2, name: 'Bisasa', teamId: 1 }),
  createMonster({ id: 3, name: 'Gluwurak', teamId: 1 }),
  createMonster({ id: 4, name: 'Bisawu', battleValues: createBattleValues({ currentHP: 10 }), teamId: 1 }),
  createMonster({ id: 5, name: 'Schiggo2', teamId: 2 }),
  createMonster({ id: 6, name: 'Bisasa2', teamId: 2 }),
  createMonster({ id: 7, name: 'Gluwurak2', teamId: 2 }),
  createMonster({ id: 8, name: 'Bisawu2', battleValues: createBattleValues({ currentHP: 10 }), teamId: 2 }),
]);

const localMonsterSelectors = monsterAdapter.getSelectors();
export const monsterSelectors = monsterAdapter.getSelectors((state: RootState) => state.monster);

const monsterSlice = createSlice({
  name: 'monster',
  initialState,
  reducers: {
    monAdded: monsterAdapter.addOne,
    monRemoved: monsterAdapter.removeOne,
    takeDamage(state, action: TakeDamageEvent) {
      const mon = localMonsterSelectors.selectById(state, action.payload.monId);
      if (mon == undefined) {
        throw 'Could not find monster';
      }
      const updatedValues = mon.battleValues;
      monsterAdapter.updateOne(state, {
        id: mon.id,
        changes: { battleValues: { ...updatedValues, currentHP: updatedValues.currentHP - action.payload.HP } },
      });
    },
  },
});

export function useMonster(mId: number): Monster | undefined {
  return useSelector((state: RootState) => localMonsterSelectors.selectById(state.monster, mId));
}

export const { monAdded, monRemoved, takeDamage } = monsterSlice.actions;
export default monsterSlice.reducer;
