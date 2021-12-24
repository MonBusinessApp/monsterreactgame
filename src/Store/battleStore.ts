import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Battle, BattleActionExecutedEvent, BattlePos } from '../Models/battle';
import { RootState } from './store';

export interface BattlePrototype {
  difficulty: number;
}

export interface BattleState {
  battles: Battle[];
}

const battleAdapter = createEntityAdapter<Battle>();

const initialState = battleAdapter.getInitialState();

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    add: battleAdapter.upsertOne,
    remove: battleAdapter.removeOne,
    update: battleAdapter.upsertOne,
    actionExecuted(state, event: PayloadAction<{ battleId: number; action: BattleActionExecutedEvent }>) {
      const battle = state.entities[event.payload.battleId];
      if (battle == undefined) {
        throw `battle ${event.payload.battleId} is undefined!`;
      }
      battle.activeBattle = event.payload.action.activeBattle;
      return state;
    },
  },
});

export const battleSelectors = battleAdapter.getSelectors<RootState>((state) => state.battle);
export const { add: battleAdded, update: battleUpdated, remove: removedBattle, actionExecuted } = battleSlice.actions;
export default battleSlice.reducer;
