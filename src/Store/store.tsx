import { configureStore, EntityState } from '@reduxjs/toolkit';
import monsterReducer from './monsterStore';
import teamReducer, { TeamState } from './teamStore';
import battleReducer from './battleStore';

import notificationReducer, { NotificationState } from './notificationStore';
import authReducer, { AuthState } from './authStore';
import { Monster } from '../Models/monster';
import { Battle } from '../Models/battle';
import activeBattleReducer, { ActiveBattleState } from './UiStore/activeBattleStore';
import wsReducer, { WebSocketState } from './wsStore';

export interface RootState {
  monster: EntityState<Monster>;
  team: TeamState;
  battle: EntityState<Battle>;
  notification: NotificationState;
  auth: AuthState;
  activeBattle: ActiveBattleState;
  wsState: WebSocketState;
}
const store = configureStore({
  reducer: {
    monster: monsterReducer,
    team: teamReducer,
    battle: battleReducer,
    notification: notificationReducer,
    auth: authReducer,
    activeBattle: activeBattleReducer,
    wsState: wsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (middleware) => [...middleware()],
});
export default store;

export type AppDispatch = typeof store.dispatch;
