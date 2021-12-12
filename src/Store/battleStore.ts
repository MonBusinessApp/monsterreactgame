import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Battle, BattlePos } from '../Models/battle';
import { battleEndedCreator, nextRoundCreator, nextTurnCreator, startBattleCreator } from './battleActions';
import { RootState } from './store';

export interface BattlePrototype {
  difficulty: number;
}

export interface BattleState {
  battles: Battle[];
  activeBattleUI: ActiveBattleUiState | null;
}

export interface ActiveBattleUiState {
  activeBattle: number;
  possibleTargets: number[];
  nextMonsterId: number;
  targetPos?: BattlePos;
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
  },
});

export const battleSelectors = battleAdapter.getSelectors<RootState>((state) => state.battle);
export const { add: battleAdded, update: battleUpdated, remove: removedBattle } = battleSlice.actions;
export default battleSlice.reducer;
