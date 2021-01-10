import type { Monster } from '../Models/monster';

export function isAlive(m: Monster | undefined): boolean {
  if (m == undefined) {
    return false;
  }
  if (m.battleValues.currentHP <= 0) {
    return false;
  }
  return true;
}
