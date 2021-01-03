import { configureStore } from '@reduxjs/toolkit';
import monsterReducer, { MonsterState } from './monsterStore';
import teamReducer, { TeamState } from './teamStore';
import battleReducer, { BattleState } from './battleStore';

import { battleMiddleware } from '../Services/battleMiddleware';

export interface RootState {
  monster: MonsterState;
  team: TeamState;
  battle: BattleState;
}
const store = configureStore({
  reducer: {
    monster: monsterReducer,
    team: teamReducer,
    battle: battleReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (middleware) => [...middleware(), battleMiddleware],
});
export default store;

export type AppDispatch = typeof store.dispatch;
