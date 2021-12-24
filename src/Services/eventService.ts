import { BattleEvent } from '../Models/battle';
import { MonsterEvent } from '../Models/monster';
import store from '../Store/store';
import { connected, disconected } from '../Store/wsStore';
import { receiveBattleEvent } from './battleService';
import { receiveMonsterEvent } from './monsterService';

let wsConnection: WebSocket;

interface EventMonsterEvent {
  eventType: 'Monster';
  monsterEvent: MonsterEvent;
}

interface EventBattleEvent {
  eventType: 'Battle';
  battleEvent: BattleEvent;
}

export function wsConnect() {
  wsConnection = new WebSocket('ws://localhost:5002/ws');

  wsConnection.onopen = (ev) => {
    console.log(ev);
    store.dispatch(connected());
  };

  wsConnection.onmessage = (ev) => {
    console.log(ev);
    const eventData: EventMonsterEvent | EventBattleEvent = JSON.parse(ev.data);
    switch (eventData.eventType) {
      case 'Monster':
        receiveMonsterEvent(eventData.monsterEvent);
        break;
      case 'Battle':
        receiveBattleEvent(eventData.battleEvent);
        break;
    }

    console.log(eventData);
  };

  wsConnection.onclose = (ev) => {
    console.log(ev);
    store.dispatch(disconected());
  };
}
