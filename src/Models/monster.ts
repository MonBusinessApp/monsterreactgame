import { Battle } from './battle';

export interface Monster {
  id: number;
  name: string;
  battleValues: BattleValues;
}

export interface BattleValues {
  currentHP: number;
  maxHP: number;
  attack: number;
  defense: number;
}

export class BattleValuesMaker implements BattleValues {
  currentHP: number;
  maxHP: number;
  attack: number;
  defense: number;

  constructor({ currentHP = 100, maxHP = 100, attack = 10, defense = 10 }: Partial<BattleValues>) {
    this.currentHP = currentHP;
    this.maxHP = maxHP;
    this.attack = attack;
    this.defense = defense;
  }
}

export class MonsterMaker implements Monster {
  id: number;
  name: string;
  battleValues: BattleValues;
  public constructor({
    id,
    name,
    battleValues = new BattleValuesMaker({}),
  }: {
    id: number;
    name: string;
    battleValues?: BattleValues;
  }) {
    this.id = id;
    this.name = name;
    this.battleValues = battleValues;
  }
}
