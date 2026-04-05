import pacmanGame from './pacman-game.js';
import enduroGame from './enduro-game.js';
import tRexGame from './trex-game.js';
import sokobanGame from './sokoban-game.js';
import marioGame from './mario-game.js';
import spaceGame from './space-game.js';
import snakeGame from './snake-game.js';
import memoryGame from './memory-game.js';
import lordeHeroGame from './lordehero-game.js';
import froggerGame from './frogger-game.js';
import tetrisGame from './tetris-game.js';
import game2048 from './2048-game.js';
import flappyBirdGame from './flappybird-game.js';
import arkanoidGame from './arkanoid-game.js';
import asteroidsGame from './asteroids-game.js';
import minesweeperGame from './minesweeper-game.js';

const games = [pacmanGame, enduroGame, tRexGame, sokobanGame, marioGame, spaceGame, snakeGame, memoryGame, lordeHeroGame, froggerGame, tetrisGame, game2048, flappyBirdGame, arkanoidGame, asteroidsGame, minesweeperGame];

export const gameRegistry = Object.fromEntries(games.map((game) => [game.id, game]));

export function getGameById(gameId) {
    return gameRegistry[gameId] || null;
}

export function getAllGameIds() {
    return games.map((game) => game.id);
}
