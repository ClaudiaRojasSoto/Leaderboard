import './style.css'
import { createNewGame } from './modules/api';
import { refreshScores, submitScore } from './modules/ui';

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
    submitScore(nameInput, scoreInput);
  });

  // Create the game when the page charge
  createNewGame('House to House');
});
