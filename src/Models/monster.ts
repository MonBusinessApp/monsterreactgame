import { PayloadAction } from '@reduxjs/toolkit';

export interface Monster {
  id: number;
  name: string;
  userId: number;
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
  currentHP = 10,
  maxHP = 10,
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
  userId,
}: {
  id: number;
  name: string;
  teamId: number;
  userId: number;
  battleValues?: BattleValues;
}): Monster {
  return {
    id,
    name,
    battleValues,
    teamId,
    userId,
  };
}

export type TakeDamage = {
  monId: number;
  HP: number;
};

export type TakeDamageEvent = PayloadAction<TakeDamage>;

export type MonsterEvent = TakeDamageEvent;
