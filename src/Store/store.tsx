import { configureStore, EntityState } from '@reduxjs/toolkit';
import monsterReducer from './monsterStore';
import teamReducer, { TeamState } from './teamStore';
import battleReducer, { BattleState } from './battleStore';

import { battleMiddleware } from '../Services/battleMiddleware';
import notificationReducer, { NotificationState } from './notificationStore';
import { Monster } from '../Models/monster';

export interface RootState {
  monster: EntityState<Monster>;
  team: TeamState;
  battle: BattleState;
  notification: NotificationState;
}
const store = configureStore({
  reducer: {
    monster: monsterReducer,
    team: teamReducer,
    battle: battleReducer,
    notification: notificationReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (middleware) => [...middleware(), battleMiddleware],
});
export default store;

export type AppDispatch = typeof store.dispatch;
