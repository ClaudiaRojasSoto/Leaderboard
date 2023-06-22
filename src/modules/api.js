import handleFetchError from './errorHandler.js';

const API_BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const GAME_ID = '0tuX1DrEsZTeCfzVaN5N';

export const getGameScores = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}games/${GAME_ID}/scores`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data.result;
  } catch (error) {
    handleFetchError(error);
    throw error;
  }
};

export const postGameScore = async (body) => {
  try {
    const response = await fetch(`${API_BASE_URL}games/${GAME_ID}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    handleFetchError(error);
    return null;
  }
};
