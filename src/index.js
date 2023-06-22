import './style.css';
import { refreshScores, submitScore } from './modules/ui.js';

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
});
