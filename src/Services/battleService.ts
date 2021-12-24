import axios from 'axios';
import { Attack, Battle, BattleApi, BattleEvent } from '../Models/battle';
import { actionExecuted, battleAdded, battleUpdated } from '../Store/battleStore';
import store from '../Store/store';
import { activeBattleSet, targetSet } from '../Store/UiStore/activeBattleStore';

const battleServiceUrl = 'http://localhost:5002/api/v1.0/battle';

export async function getBattlesByUser(id: number): Promise<Battle[]> {
  const response = await axios.get<BattleApi[]>(battleServiceUrl, { params: { userId: id } });
  console.log(response);

  const battles = response.data.map(convertBattleApiToBattle);

  battles.forEach((m) => store.dispatch(battleAdded(m)));
  return battles;
}

export async function startBattle(battleId: number): Promise<void> {
  const response = await axios.post<Battle>(`${battleServiceUrl}/${battleId}/start`);
  console.log(response);
}

export async function executeAction(attack: Attack): Promise<void> {
  const response = await axios.post<Battle>(`${battleServiceUrl}/${attack.battleId}/action`, {
    source: attack.source,
    target: attack.target,
  });
  console.log(response);
}

export async function getBattleById(id: number): Promise<void> {
  const response = await axios.get<BattleApi>(`${battleServiceUrl}/${id}`);
  console.log(response);
  const b = response.data;
  const battle: Battle = {
    id: b.id,
    activeBattle: b.activeBattle,
    status: b.status,
    teams: b.teams.map((t) => {
      return {
        id: t.id,
        monsters: t.monsters.map((m) => m.id),
        players: t.players,
      };
    }),
  };

  store.dispatch(battleUpdated(battle));
}

export function setActiveBattle(id: number): void {
  store.dispatch(activeBattleSet({ battleId: id }));
}

export function setTarget(id: number): void {
  store.dispatch(targetSet({ monId: id }));
}

export function receiveBattleEvent(event: BattleEvent) {
  switch (event.eventType) {
    case 'Added':
      store.dispatch(battleAdded(convertBattleApiToBattle(event.added.battle)));
      break;
    case 'Started':
      store.dispatch(battleUpdated(convertBattleApiToBattle(event.started.battle)));
      break;
    case 'Ended':
      store.dispatch(battleUpdated(convertBattleApiToBattle(event.ended.battle)));
      break;
    case 'ActionExecuted':
      store.dispatch(actionExecuted({ battleId: event.battleId, action: event.executed }));
      break;
  }
}

function convertBattleApiToBattle(b: BattleApi): Battle {
  return {
    id: b.id,
    activeBattle: b.activeBattle,
    status: b.status,
    teams: b.teams.map((t) => {
      return {
        id: t.id,
        monsters: t.monsters.map((m) => m.id),
        players: t.players,
      };
    }),
  };
}
