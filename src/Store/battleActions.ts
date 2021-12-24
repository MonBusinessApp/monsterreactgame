import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Attack, Battle, BattleEnded, BattlePos, NextRound, NextTurn } from '../Models/battle';
import { executeAction, startBattle } from '../Services/battleService';
import { monsterSelectors } from './monsterStore';
import { RootState } from './store';

type SendAttackCmdError = {
  error: string;
};

export const attackCreator = createAction<Attack>('battle/attack');
export const battleEndedCreator = createAction<BattleEnded>('battle/battleEnded');
export const nextRoundCreator = createAction<NextRound>('battle/nextRound');
export const nextTurnCreator = createAction<NextTurn>('battle/nextTurn');
export const abab = createAction<{ b: Battle }>('battle/battleStarted');

export const startBattleCreator = createAsyncThunk<
  { blob: string },
  number,
  {
    state: RootState;
    rejectValue: SendAttackCmdError;
  }
>('battle/sendStartBattleCmd', async (id, thunkApi) => {
  await startBattle(id);
  return { blob: 'test' };
});

export const attackCmdCreator = createAsyncThunk<
  // Return type of the payload creator
  { blob: string },
  // First argument to the payload creator
  Attack,
  // Types for ThunkAPI
  {
    state: RootState;
    rejectValue: SendAttackCmdError;
  }
>('battle/sendAttackCmd', async (attack, thunkApi) => {
  const state = thunkApi.getState();

  await executeAction(attack);

  return { blob: 'test' };
});
/*
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
*/