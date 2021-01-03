import { Battle, BattleEvents, BattlePos } from '../Models/battle';
import { createAsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
import { Monster } from '../Models/monster';
import { Team } from '../Models/team';
import {
  attackCmdCreator,
  battleEndedCreator,
  nextRoundCreator,
  nextTurnCreator,
  startBattleCreator,
} from '../Store/battleActions';

import store, { RootState } from '../Store/store';
import { isAlive } from './monster';

export function handleNextRound(b: Battle, state: RootState): BattleEvents {
  const teams = state.team.teams.filter((t) => b.lineUps.find((tId) => tId.teamId == t.id));
  const winner = isGameOver(teams, getMonsInBattle(b, state));
  if (winner != false) {
    return battleEndedCreator({ winningTeamId: 1 });
  }
  //filter all dead mons for safety
  let newTurnQueue: number[] = b.turnQueue
    .slice(1)
    .map((mId) => state.monster.monsters.find((m) => m.id == mId))
    .filter((m): m is Monster => !!m)
    .filter((m) => isAlive(m))
    .map((m) => m.id);
  //check if still sth left in turnqueue
  if (newTurnQueue.length > 0) {
    return nextTurnCreator({ turnQueue: newTurnQueue });
  } else {
    //refill turnqueue
    newTurnQueue = fillturnQueue(getMonsInBattle(b, state));
    return nextRoundCreator({ turnQueue: newTurnQueue, roundCount: b.roundCount + 1 });
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
  const monsterTeams = teams.map((t) => {
    return { teamId: t.id, monsters: t.monsterIds.map((mId) => mons.find((m) => m.id == mId)) };
  });

  const aliveTeams = [];
  for (let i = 0; i < monsterTeams.length; i++) {
    //check all mons in team
    let isTeamAlive = false;
    const monsterTeam = monsterTeams[i];
    for (let j = 0; j < monsterTeam.monsters.length; j++) {
      if (isAlive(monsterTeam.monsters[j])) {
        isTeamAlive = true;
        break;
      }
    }
    if (isTeamAlive == true) {
      aliveTeams.push(monsterTeam.teamId);
    }
  }

  if (aliveTeams.length == 1) {
    return aliveTeams[0];
  }

  return false;
}

export function sendStartBattleCmd(battleId: number): void {
  const rootState = store.getState();
  //todo useful version
  const battle = rootState.battle.battles.find((b) => b.id == battleId);
  if (battle == undefined) {
    throw 'battle is undefined';
  }
  console.log('do stuff');
  store.dispatch(startBattleCreator({ b: battle }));

  if (battle == undefined) {
    throw 'battle does not exist';
  }
}

export function sendAttackCmd(): void {
  store.dispatch(attackCmdCreator({}));
}
