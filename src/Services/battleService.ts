import axios from 'axios';
import { Attack, Battle, BattleApi } from '../Models/battle';
import { battleAdded } from '../Store/battleStore';
import store from '../Store/store';

const battleServiceUrl = 'http://localhost:5002/api/v1.0/battle';

export async function getUserBattles(id: number): Promise<Battle[]> {
  const response = await axios.get<BattleApi[]>(battleServiceUrl, { params: { userId: id } });
  console.log(response);

  const battles = response.data.map((b) => {
    return {
      id: b.id,
      activeBattle: b.activeBattle,
      state: b.state,
      teams: b.teams.map((t) => {
        return {
          id: t.id,
          monsters: t.monsters.map((m) => m.id),
          players: t.players,
        };
      }),
    };
  });
  battles.forEach((m) => store.dispatch(battleAdded(m)));
  return battles;
}

export async function startBattle(battleId: number): Promise<void> {
  const response = await axios.post<Battle>(`${battleServiceUrl}/${battleId}/start`);
  console.log(response);
}

export async function executeAction(attack: Attack): Promise<void> {
  const response = await axios.post<Battle>(`${battleServiceUrl}/${attack.battleId}/attack`, {
    source: attack.source,
    target: attack.target,
  });
  console.log(response);
}
