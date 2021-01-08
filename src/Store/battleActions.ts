import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Attack, Battle, BattleEnded, BattlePos, NextRound, NextTurn } from '../Models/battle';
import { monsterSelectors } from './monsterStore';
import { RootState } from './store';

type SendAttackCmdError = {
  error: string;
};

export const attackCreator = createAction<Attack>('battle/attack');
export const battleEndedCreator = createAction<BattleEnded>('battle/battleEnded');
export const nextRoundCreator = createAction<NextRound>('battle/nextRound');
export const nextTurnCreator = createAction<NextTurn>('battle/nextTurn');
export const startBattleCreator = createAction<{ b: Battle }>('battle/battleStarted');

export const attackCmdCreator = createAsyncThunk<
  // Return type of the payload creator
  { blob: string },
  // First argument to the payload creator
  Record<string, never>,
  // Types for ThunkAPI
  {
    state: RootState;
    rejectValue: SendAttackCmdError;
  }
>('battle/sendAttackCmd', async (_1, thunkApi) => {
  const state = thunkApi.getState();

  const activeBattleUI = state.battle.activeBattleUI;
  if (activeBattleUI == null) {
    return thunkApi.rejectWithValue({ error: 'There is no active battle' });
  }
  const battleId = activeBattleUI.activeBattle;

  const source = activeBattleUI.nextMonsterId;
  const target = activeBattleUI.targetPos;

  if (target == undefined) {
    return thunkApi.rejectWithValue({ error: 'No target was defined' });
  }

  const attackAction = attackCreator({ battleId, source: getPosOfMonster(source, state), target });
  thunkApi.dispatch(attackAction);

  return { blob: 'test' };
});

function getPosOfMonster(monId: number, state: RootState): BattlePos {
  const activeBattle = state.battle.activeBattleUI;
  if (activeBattle == null) {
    throw 'active battle is null';
  }
  const battleId = activeBattle.activeBattle;
  const battle = state.battle.battles.find((b) => b.id == battleId);
  const monster = monsterSelectors.selectById(state, monId);
  console.log(monster);

  const teamLineUp = battle?.lineUps.find((l) => l.teamId == monster?.teamId);
  if (teamLineUp == undefined) {
    throw 'lineup does not exist';
  }
  for (let x = 0; x < teamLineUp.lineUp.length; x++) {
    for (let y = 0; y < teamLineUp.lineUp[x].length; y++) {
      if (teamLineUp.lineUp[x][y] == monId) {
        return { pos: [x, y], teamId: teamLineUp.teamId };
      }
    }
  }

  throw 'could not find monster';
}
