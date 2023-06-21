import './style.css'
import { createNewGame } from './modules/api';
import { refreshScores, submitScore } from './modules/ui';

// Async function to start the game
async function initGame() {
  // Get the game id from local storage if it exists, otherwise create a new game
  let gameId = localStorage.getItem('gameId');
  if (!gameId) {
    gameId = await createNewGame('House to House');
    if (!gameId) {
      console.error('Failed to create a new game. Check your internet connection and try again.');
    }
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const refreshButton = document.querySelector('.refresh-button');
  const submitButton = document.querySelector('.submit-button');
  const nameInput = document.querySelector('.name-input');
  const scoreInput = document.querySelector('.score-input');
  const scoresList = document.querySelector('.scores-list');

  // Event to "Refresh" button
  refreshButton.addEventListener('click', () => {
    refreshScores(scoresList);
  });

  // Event to "Submit" button
  submitButton.addEventListener('click', () => {
    const userName = nameInput.value;
    const score = scoreInput.value;
    submitScore(userName, score);
    // Clean the inputs after submit
    nameInput.value = '';
    scoreInput.value = '';
  });

  // Initialize the game
  initGame();
});
