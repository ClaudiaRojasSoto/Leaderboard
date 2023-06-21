import './style.css';
import { createNewGame } from './modules/api.js';
import { refreshScores, submitScore } from './modules/ui.js';
import handleFetchError from './modules/errorHandler.js';

async function initGame() {
  let gameId = localStorage.getItem('gameId');
  if (!gameId) {
    gameId = await createNewGame('House to House');
    if (!gameId) {
      handleFetchError(new Error('Failed to create a new game. Check your internet connection and try again.'));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const refreshButton = document.querySelector('.refresh-button');
  const submitButton = document.querySelector('.submit-button');
  const nameInput = document.querySelector('.name-input');
  const scoreInput = document.querySelector('.score-input');
  const scoresList = document.querySelector('.scores-list');

  refreshButton.addEventListener('click', () => {
    refreshScores(scoresList);
  });

  submitButton.addEventListener('click', () => {
    const userName = nameInput.value;
    const score = scoreInput.value;
    submitScore(userName, score);
    nameInput.value = '';
    scoreInput.value = '';
  });

  initGame();
});