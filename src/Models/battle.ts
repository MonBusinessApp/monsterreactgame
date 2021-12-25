import { Team, TeamApi } from './team';

export interface LineUp {
  teamId: number;
  lineUp: number[][];
}

export interface ActiveBattle {
  turnQueue: number[]; //who is next in turn?
  turnCount: number;
}

type BattleStatus = 'new' | 'active' | 'ended';

export interface Battle {
  id: number;
  activeBattle: ActiveBattle;
  teams: Team[];
  status: BattleStatus;
}

export interface BattleApi {
  id: number;
  activeBattle: ActiveBattle;
  teams: TeamApi[];
  status: BattleStatus;
}

export interface Attack {
  battleId: number;
  source: number;
  target: number;
}

export interface BattleEnded {
  winningTeamId: number;
}

export interface BattlePos {
  teamId: number;
  pos: [number, number];
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
