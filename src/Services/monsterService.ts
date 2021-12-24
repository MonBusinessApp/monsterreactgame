import axios from 'axios';
import type { Monster, MonsterEvent } from '../Models/monster';
import { monAdded } from '../Store/monsterStore';
import store from '../Store/store';

export function isAlive(m: Monster | undefined): boolean {
  if (m == undefined) {
    return false;
  }
  if (m.battleValues.remainingHp <= 0) {
    return false;
  }
  return true;
}

const monsterServiceUrl = 'http://localhost:5002/api/v1.0/monster';

export async function getUserMonsters(id: number): Promise<Monster[]> {
  const response = await axios.get<Monster[]>(monsterServiceUrl, {
    params: { userId: id },
  });

  response.data.forEach((m) => store.dispatch(monAdded(m)));

  return response.data;
}

export async function getMonsterById(id: number): Promise<Monster> {
  const response = await axios.get<Monster>(`${monsterServiceUrl}/${id}`);

  store.dispatch(monAdded(response.data));

  return response.data;
}

export function receiveMonsterEvent(event: MonsterEvent) {
  switch (event.eventType) {
    case 'Added':
      store.dispatch(monAdded(event.added.monster));
    case 'Updated':
      store.dispatch(monAdded(event.updated.monster));
  }
}
