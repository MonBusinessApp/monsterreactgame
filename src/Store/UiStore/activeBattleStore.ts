import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActiveBattleState {
  battleId: number | undefined;
  selectedTarget: number | undefined;
}

const initialState: ActiveBattleState = { battleId: undefined, selectedTarget: undefined };

const activeBattleSlice = createSlice({
  name: 'activeBattle',
  initialState: initialState as ActiveBattleState,
  reducers: {
    activeBattleSet(state, action: PayloadAction<{ battleId: number }>) {
      state.battleId = action.payload.battleId;
      return state;
    },
    targetSet(state, action: PayloadAction<{ monId: number }>) {
      state.selectedTarget = action.payload.monId;
      return state;
    },
  },
});

export const { activeBattleSet, targetSet } = activeBattleSlice.actions;
export default activeBattleSlice.reducer;
