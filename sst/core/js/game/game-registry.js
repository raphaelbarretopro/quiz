import pacmanGame from './pacman-game.js';
import enduroGame from './enduro-game.js';
import tRexGame from './trex-game.js';
import sokobanGame from './sokoban-game.js';

const games = [pacmanGame, enduroGame, tRexGame, sokobanGame];

export const gameRegistry = Object.fromEntries(games.map((game) => [game.id, game]));

export function getGameById(gameId) {
    return gameRegistry[gameId] || null;
}

export function getAllGameIds() {
    return games.map((game) => game.id);
}
