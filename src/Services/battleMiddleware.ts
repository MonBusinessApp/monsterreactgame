import type { Middleware } from 'redux';
import type { Battle, BattlePos } from '../Models/battle';
import type { Monster } from '../Models/monster';
import { attackCreator, startBattleCreator } from '../Store/battleActions';

import { monsterSelectors, takeDamage } from '../Store/monsterStore';
import type { RootState } from '../Store/store';
import { calculateDamage, handleNextRound } from './battle';

function getMonByPos(monPos: BattlePos, battle: Battle, state: RootState): Monster | undefined {
  //do attack stuff
  const monTeam = battle.lineUps.find((l) => l.teamId == monPos.teamId);

  const monId = monTeam?.lineUp[monPos.pos[0]][monPos.pos[1]];
  if (monId == undefined) {
    return undefined;
  }
  return monsterSelectors.selectById(state, monId);
}

export const battleMiddleware: Middleware<
  unknown, // legacy type parameter added to satisfy interface signature
  RootState
> = (store) => (next) => (action) => {
  next(action);
  if (startBattleCreator.match(action)) {
    const state = store.getState();
    const battle = action.payload.b;
    if (battle == undefined) {
      throw 'battle is undefined';
    }
    const nextEvent = handleNextRound(battle, state);
    store.dispatch(nextEvent);

    console.log(nextEvent);
  }
  if (attackCreator.match(action)) {
    //todo handle attacks
    const state = store.getState();
    const battle = state.battle.battles.find((b) => b.id == action.payload.battleId);
    if (battle == undefined) {
      throw 'battle is undefined';
    }
    //do attack stuff
    const target = getMonByPos(action.payload.target, battle, state);
    if (target == undefined) {
      throw 'target is undefined';
    }

    const source = getMonByPos(action.payload.source, battle, state);

    if (source == undefined) {
      throw 'source is undefined';
    }
    //after effects are executed
    store.dispatch(takeDamage({ HP: calculateDamage(source, target), monId: target.id }));
    console.log('dispatched stuff');
    const newState = store.getState();
    const newBattle = state.battle.battles.find((b) => b.id == action.payload.battleId);
    if (newBattle == undefined) {
      throw 'battle is undefined';
    }
    const nextEvent = handleNextRound(newBattle, newState);
    store.dispatch(nextEvent);
  }
};
