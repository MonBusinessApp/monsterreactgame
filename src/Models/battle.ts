import { PayloadAction } from '@reduxjs/toolkit';

export interface LineUp {
  teamId: number;
  lineUp: number[][];
}
export interface Battle {
  id: number;
  turnQueue: number[]; //who is next in turn?
  roundCount: number;
  lineUps: LineUp[];
}

export interface Attack {
  battleId: number;
  source: BattlePos;
  target: BattlePos;
}

export interface BattleEnded {
  winningTeamId: number;
}

//still mons left in queue
export interface NextTurn {
  turnQueue: number[];
}

//no mons left in queue;refill
export interface NextRound {
  turnQueue: number[];
  roundCount: number;
}

export type AttackEvent = PayloadAction<Attack>;
export type BattleStartedEvent = PayloadAction<{ b: Battle }>;
export type BattleEndedEvent = PayloadAction<BattleEnded>;
export type NextTurnEvent = PayloadAction<NextTurn>;
export type NextRoundEvent = PayloadAction<NextRound>;

export type BattleEvents = AttackEvent | NextTurnEvent | NextRoundEvent | BattleEndedEvent;

export interface BattlePos {
  teamId: number;
  pos: [number, number];
}

export function isBattlePosEqual(b1: BattlePos | undefined, b2: BattlePos | undefined): boolean {
  if (b1 == undefined || b2 == undefined) {
    return false;
  }
  return b1.teamId == b2.teamId && b1.pos.every((c, index) => c == b2.pos[index]);
}

export function createBattlePos({ teamId = -1, pos = [-1, -1] }: Partial<BattlePos>): BattlePos {
  return { teamId, pos };
}
