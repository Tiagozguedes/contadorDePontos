import { GameState, Player } from '../types';

export const initialPlayers: Player[] = [
  {
    id: '1',
    name: 'JOGADOR 1',
    score: 0,
    color: 'blue',
  },
  {
    id: '2',
    name: 'JOGADOR 2',
    score: 0,
    color: 'red',
  },
];

export const initialGameState: GameState = {
  players: initialPlayers,
  round: 1,
  history: [],
};

export const addPoints = (player: Player, points: number): Player => ({
  ...player,
  score: player.score + points,
});

export const resetPlayer = (player: Player): Player => ({
  ...player,
  score: 0,
});