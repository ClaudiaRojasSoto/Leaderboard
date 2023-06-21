const API_BASE_URL =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

export const createNewGame = async (gameName) => {
  try {
    const response = await fetch(`${API_BASE_URL}games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: gameName,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const gameId = data.result.split(': ')[1]; // Storage the ID of the game

    // Store the game id in local storage
    localStorage.setItem('gameId', gameId);

    return gameId;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const getGameScores = async () => {
  try {
    // Get the game id from local storage
    const gameId = localStorage.getItem('gameId');

    const response = await fetch(`${API_BASE_URL}games/${gameId}/scores`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const postGameScore = async (userName, score) => {
  try {
    // Get the game id from local storage
    const gameId = localStorage.getItem('gameId');

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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
