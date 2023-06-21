import './style.css'

document.addEventListener('DOMContentLoaded', (event) => {
  const API_BASE_URL =
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/'

  let gameId // To storage the ID of the game

  const createNewGame = async (gameName) => {
    const response = await fetch(`${API_BASE_URL}games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: gameName,
      }),
    })

    const data = await response.json()
    gameId = data.result.split(': ')[1] // Storage the ID of the game
  }

  const getGameScores = async () => {
    const response = await fetch(`${API_BASE_URL}games/${gameId}/scores`)
    const data = await response.json()

    return data.result
  }

  const postGameScore = async (userName, score) => {
    const response = await fetch(`${API_BASE_URL}games/${gameId}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userName,
        score: score,
      }),
    })

    const data = await response.json()

    return data.result
  }

  const refreshButton = document.querySelector('.refresh-button')
  const submitButton = document.querySelector('.submit-button')
  const nameInput = document.querySelector('.name-input')
  const scoreInput = document.querySelector('.score-input')
  const scoresList = document.querySelector('.scores-list')

 // Event to "Refresh" button
refreshButton.addEventListener('click', () => {
    (async () => {
      const scores = await getGameScores();
      // Clean the score list
      scoresList.innerHTML = '';
      // Add new scores to the list
      scores.forEach((score) => {
        const li = document.createElement('li');
        li.textContent = `${score.user}: ${score.score}`;
        scoresList.appendChild(li);
      });
    })();
  });
  

 // Event to "Submit" button
submitButton.addEventListener('click', () => {
    (async () => {
      const userName = nameInput.value;
      const score = scoreInput.value;
      await postGameScore(userName, score);
      // Clean the inputs after submit
      nameInput.value = '';
      scoreInput.value = '';
    })();
  });

  // Create the game when the page charge
  createNewGame('House to House')
})
