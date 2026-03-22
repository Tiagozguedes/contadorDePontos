export interface Player {
  id: string;
  name: string;
  score: number;
  color: 'blue' | 'red';
}

export interface GameState {
  players: Player[];
  round: number;
  history: HistoryEntry[];
}

export interface HistoryEntry {
  playerId: string;
  playerName: string;
  points: number;
  round: number;
}

export type TabName = 'partida' | 'ranking' | 'regras';