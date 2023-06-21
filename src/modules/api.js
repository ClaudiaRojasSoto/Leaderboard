import handleFetchError from './errorHandler.js';

const API_BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/'; // Make sure to import the handleFetchError function from the index.js file correctly

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
    const gameId = data.result.split(': ')[1]; // Store the ID of the game

    // Store the game id in local storage
    localStorage.setItem('gameId', gameId);

    return gameId;
  } catch (error) {
    handleFetchError(error);
    throw error; // Throw the error again to maintain consistency in return values
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
    handleFetchError(error);
    throw error; // Throw the error again to maintain consistency in return values
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
        score,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    handleFetchError(error);
    return null; // Return a default value on error
  }
};