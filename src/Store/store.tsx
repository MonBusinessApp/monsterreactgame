import { configureStore } from '@reduxjs/toolkit';
import monsterReducer, { MonsterState } from './monsterStore';
import teamReducer, { TeamState } from './teamStore';
import battleReducer, { BattleState } from './battleStore';

export interface RootState {
  monster: MonsterState;
  team: TeamState;
  battle: BattleState;
}

export default configureStore({
  reducer: {
    monster: monsterReducer,
    team: teamReducer,
    battle: battleReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
