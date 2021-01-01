import { Action, AsyncThunk, AsyncThunkAction, createAsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import { Attack, Battle, BattleEvents, BattlePos } from '../Models/battle';
import { Monster } from '../Models/monster';
import { Team } from '../Models/team';
import { attackCreator, battleEnded, nextRound, nextTurn, startBattle } from '../Store/battleStore';
import rootStore, { AppDispatch } from '../Store/store';
import store, { RootState } from '../Store/store';
import { isAlive } from './monster';

export function handleNextRound(b: Battle, state: RootState): BattleEvents {
  const teams = state.team.teams.filter((t) => b.lineUps.find((tId) => tId.teamId == t.id));
  const winner = isGameOver(teams, getMonsInBattle(b, state));
  if (winner != false) {
    return battleEnded({ winningTeamId: 1 });
  }
  //filter all dead mons for safety
  let newTurnQueue: number[] = b.turnQueue
    .map((mId) => state.monster.monsters.find((m) => m.id == mId))
    .filter((m): m is Monster => !!m)
    .filter((m) => isAlive(m))
    .map((m) => m.id);
  //check if still sth left in turnqueue
  if (newTurnQueue.length > 0) {
    return nextTurn({ turnQueue: newTurnQueue });
  } else {
    //refill turnqueue
    newTurnQueue = fillturnQueue(getMonsInBattle(b, state));
    return nextRound({ turnQueue: newTurnQueue, roundCount: b.roundCount + 1 });
  }
}

function getMonsInBattle(b: Battle, state: RootState): Monster[] {
  const monIds = b.lineUps.map((l) => l.lineUp.flat()).flat();
  return state.monster.monsters.filter((m) => monIds.find((mId) => mId == m.id));
}

export function fillturnQueue(mons: Monster[]): number[] {
  return mons.filter((m) => isAlive(m)).map((m) => m.id);
}

export function possibleTargets(_: Battle): BattlePos[] {
  return [];
}

export function isGameOver(teams: Team[], mons: Monster[]): number | false {
  const monsterTeams = teams.map((t) => t.monsterIds.map((mId) => mons.find((m) => m.id == mId)));

  const aliveTeams = [];
  for (let i = 0; i < monsterTeams.length; i++) {
    //check all mons in team
    let isTeamAlive = false;
    const monsterTeam = monsterTeams[i];
    for (let j = 0; j < monsterTeam.length; j++) {
      if (isAlive(monsterTeam[j])) {
        isTeamAlive = true;
        break;
      }
    }
    if (isTeamAlive == true) {
      aliveTeams.push(i);
    }
  }

  if (aliveTeams.length == 1) {
    return aliveTeams[0];
  }

  return false;
}

export function sendStartBattleCmd(battleId: number): void {
  const rootState = rootStore.getState();
  //todo useful version
  const battle = rootState.battle.battles.find((b) => b.id == battleId);
  if (battle == undefined) {
    throw 'battle is undefined';
  }
  console.log('do stuff');
  rootStore.dispatch(startBattle({ b: battle }));

  if (battle == undefined) {
    throw 'battle does not exist';
  }
  // const nextEvent = handleNextRound(battle, rootStore.getState());
}

type SendAttackCmdError = {
  error: string;
};

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
    //TODO grey out the button if no target is set!
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

  const monster = state.monster.monsters.find((m) => m.id == monId);

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

export function sendAttackCmd() {
  store.dispatch(attackCmdCreator({}));
}
