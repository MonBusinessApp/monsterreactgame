import { PayloadAction } from '@reduxjs/toolkit';
import { Team, TeamApi } from './team';

export interface LineUp {
  teamId: number;
  lineUp: number[][];
}

export interface ActiveBattle {
  turnQueue: number[]; //who is next in turn?
  turnCount: number;
}
export interface Battle {
  id: number;
  activeBattle: ActiveBattle;
  teams: Team[];
  state: 'new' | 'active' | 'ended';
}

export interface BattleApi {
  id: number;
  activeBattle: ActiveBattle;
  teams: TeamApi[];
  state: 'new' | 'active' | 'ended';
}

export interface Attack {
  battleId: number;
  source: number;
  target: number;
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
export type NextTurnEvent = PayloadAction<NextTurn>;
export type NextRoundEvent = PayloadAction<NextRound>;

export type BattleEvents = AttackEvent | NextTurnEvent | NextRoundEvent | BattleStartedEvent | BattleEndedEvent;

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

export interface BattleAddedEvent {
  battle: BattleApi;
}

export interface BattleEndedEvent {
  winnerTeamId: number;
  battle: BattleApi;
}

export interface BattleStartedEvent {
  battle: BattleApi;
}

export interface BattleActionExecutedEvent {
  source: number;
  target: number;
  activeBattle: ActiveBattle;
}

export interface BattleEvent {
  battleId: number;
  eventType: 'Ended' | 'Added' | 'ActionExecuted' | 'Started';
  executed: BattleActionExecutedEvent;
  started: BattleStartedEvent;
  ended: BattleEndedEvent;
  added: BattleAddedEvent;
}
