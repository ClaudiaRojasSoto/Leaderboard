import { getGameScores, postGameScore } from './api.js';

export const refreshScores = async (scoresList) => {
  const scores = await getGameScores();
  while (scoresList.firstChild) {
    scoresList.firstChild.remove();
  }
  scores.sort((a, b) => b.score - a.score);
  scores.forEach((score) => {
    const li = document.createElement('li');
    li.textContent = `${score.user}: ${score.score}`;
    scoresList.appendChild(li);
  });
};

export const submitScore = async (userName, score) => {
  const body = {
    user: userName,
    score: Number(score), // Make sure the score is a number
  };

  await postGameScore(body);
  const scoresList = document.querySelector('.scores-list');
  refreshScores(scoresList);
};
