import { Middleware } from 'redux';
import { attackCreator, startBattle } from '../Store/battleStore';
import { takeDamage } from '../Store/monsterStore';
import { RootState } from '../Store/store';
import { handleNextRound } from './battle';

export const battleMiddleware: Middleware<
  unknown, // legacy type parameter added to satisfy interface signature
  RootState
> = (store) => (next) => (action) => {
  next(action);
  if (startBattle.match(action)) {
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
    const targetTeam = battle.lineUps.find((l) => l.teamId == action.payload.target.teamId);
    const targetPos = action.payload.target.pos;
    const target = targetTeam?.lineUp[targetPos[0]][targetPos[1]];
    if (target == undefined) {
      throw 'target is undefined';
    }

    //after effects are executed
    store.dispatch(takeDamage({ HP: 10, monId: target }));
    const newState = store.getState();
    const newBattle = state.battle.battles.find((b) => b.id == action.payload.battleId);
    if (newBattle == undefined) {
      throw 'battle is undefined';
    }
    const nextEvent = handleNextRound(newBattle, newState);
    store.dispatch(nextEvent);
  }
};
