const API_BASE_URL =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

let gameId; // To storage the ID of the game

export const createNewGame = async (gameName) => {
  const response = await fetch(`${API_BASE_URL}games/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: gameName,
    }),
  })

  const data = await response.json();
  gameId = data.result.split(': ')[1]; // Storage the ID of the game
};

export const getGameScores = async () => {
  const response = await fetch(`${API_BASE_URL}games/${gameId}/scores`);
  const data = await response.json();
  return data.result;
};

export const postGameScore = async (userName, score) => {
  const response = await fetch(`${API_BASE_URL}games/${gameId}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userName,
      score: score,
    }),
  });

  const data = await response.json();
  return data.result;
};
