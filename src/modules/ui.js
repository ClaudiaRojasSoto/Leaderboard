import { getGameScores, postGameScore } from './api';

export const refreshScores = async (scoresList) => {
  const scores = await getGameScores();
  // Clean the score list
  scoresList.innerHTML = '';
  // Add new scores to the list
  scores.forEach((score) => {
    const li = document.createElement('li');
    li.textContent = `${score.user}: ${score.score}`;
    scoresList.appendChild(li);
  });
};

export const submitScore = async (userName, score) => {
  await postGameScore(userName, score);
  // Clean the inputs after submit
  userName.value = '';
  score.value = '';
};
