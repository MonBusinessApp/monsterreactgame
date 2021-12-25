import { Monster } from './monster';

export interface TeamApi {
  id: number;
  players: number[];
  monsters: Monster[];
}

export interface Team {
  id: number;
  players: number[];
  monsters: number[];
}
