import { configureStore, EntityState } from '@reduxjs/toolkit';
import monsterReducer from './monsterStore';
import teamReducer, { TeamState } from './teamStore';
import battleReducer from './battleStore';

import { battleMiddleware } from '../Services/battleMiddleware';
import notificationReducer, { NotificationState } from './notificationStore';
import authReducer, { AuthState } from './authStore';
import { Monster } from '../Models/monster';
import { Battle } from '../Models/battle';
import activeBattleReducer, { ActiveBattleState } from './UiStore/activeBattleStore';

export interface RootState {
  monster: EntityState<Monster>;
  team: TeamState;
  battle: EntityState<Battle>;
  notification: NotificationState;
  auth: AuthState;
  activeBattle: ActiveBattleState;
}
const store = configureStore({
  reducer: {
    monster: monsterReducer,
    team: teamReducer,
    battle: battleReducer,
    notification: notificationReducer,
    auth: authReducer,
    activeBattle: activeBattleReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (middleware) => [...middleware(), battleMiddleware],
});
export default store;

export type AppDispatch = typeof store.dispatch;
