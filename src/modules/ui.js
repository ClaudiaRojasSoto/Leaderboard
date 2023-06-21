import { getGameScores, postGameScore } from './api';

export const refreshScores = async (scoresList) => {
    const scores = await getGameScores();
  
    // Clear the scores list
    while (scoresList.firstChild) {
      scoresList.firstChild.remove();
    }
  
    // Sort scores from highest to lowest
    scores.sort((a, b) => b.score - a.score);
  
    // Add new scores to the list
    scores.forEach((score) => {
      const li = document.createElement('li');
      li.textContent = `${score.user}: ${score.score}`;
      scoresList.appendChild(li);
    });
  };
  

export const submitScore = async (userName, score) => {
  await postGameScore(userName, score);
};
