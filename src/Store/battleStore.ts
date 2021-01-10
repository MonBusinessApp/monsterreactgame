import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Battle, BattlePos } from '../Models/battle';
import { battleEndedCreator, nextRoundCreator, nextTurnCreator, startBattleCreator } from './battleActions';

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

const initialState: BattleState = {
  battles: [
    {
      type: 'ActiveBattle',
      id: 1,
      roundCount: 0,
      turnQueue: [],
      lineUps: [
        {
          teamId: 1,
          lineUp: [
            [1, 2],
            [3, 4],
          ],
        },
        {
          teamId: 2,
          lineUp: [
            [5, 6],
            [7, 8],
          ],
        },
      ],
    },
  ],
  activeBattleUI: null,
};
function createBattleUiState(b?: Battle): ActiveBattleUiState | null {
  if (b == undefined || b.type != 'ActiveBattle') {
    return null;
  }
  return { activeBattle: b.id, possibleTargets: [], targetPos: undefined, nextMonsterId: b.turnQueue[0] };
}

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
    setActiveBattle(state, action: PayloadAction<number>) {
      state.activeBattleUI = createBattleUiState(state.battles.find((b) => b.id == action.payload));
    },
    setTargetPos(state, action: PayloadAction<BattlePos>) {
      if (state.activeBattleUI == null) {
        throw 'battleuistate is null';
      }
      state.activeBattleUI.targetPos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startBattleCreator, (state, action) => {
      state.activeBattleUI = createBattleUiState(action.payload.b);
      const index = state.battles.findIndex((b) => b.id == action.payload.b.id);
      if (index == -1) {
        state.battles.push(action.payload.b);
      }
      state.battles[index] = action.payload.b;
    });
    builder.addCase(nextTurnCreator, (state, action) => {
      const battle = state.battles.find((b) => b.id == state.activeBattleUI?.activeBattle);
      if (battle == undefined || battle.type != 'ActiveBattle') {
        throw 'battle is not defined!';
      }
      battle.turnQueue = action.payload.turnQueue;
      state.activeBattleUI = createBattleUiState(battle);
    });
    builder.addCase(nextRoundCreator, (state, action) => {
      const battle = state.battles.find((b) => b.id == state.activeBattleUI?.activeBattle);
      if (battle == undefined || battle.type != 'ActiveBattle') {
        throw 'battle is not defined!';
      }
      battle.roundCount = action.payload.roundCount;
      battle.turnQueue = action.payload.turnQueue;

      //viewlogic

      state.activeBattleUI = createBattleUiState(battle);
    });
    builder.addCase(battleEndedCreator, (state, action) => {
      state.activeBattleUI = null;
      console.log(`team ${action.payload.winningTeamId} won`);
    });
  },
});

export const { add, remove, setActiveBattle, setTargetPos } = battleSlice.actions;
export default battleSlice.reducer;
