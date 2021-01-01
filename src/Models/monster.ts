import { PayloadAction } from '@reduxjs/toolkit';

export interface Monster {
  id: number;
  name: string;
  battleValues: BattleValues;
  teamId: number;
}

export interface BattleValues {
  currentHP: number;
  maxHP: number;
  attack: number;
  defense: number;
}

export function createBattleValues({
  currentHP = 100,
  maxHP = 100,
  attack = 10,
  defense = 10,
}: Partial<BattleValues>): BattleValues {
  return {
    currentHP,
    maxHP,
    attack,
    defense,
  };
}

export function createMonster({
  id,
  name,
  battleValues = createBattleValues({}),
  teamId,
}: {
  id: number;
  name: string;
  teamId: number;
  battleValues?: BattleValues;
}): Monster {
  return {
    id,
    name,
    battleValues,
    teamId,
  };
}

export type TakeDamage = {
  monId: number;
  HP: number;
};

export type TakeDamageEvent = PayloadAction<TakeDamage>;

export type MonsterEvent = TakeDamageEvent;
