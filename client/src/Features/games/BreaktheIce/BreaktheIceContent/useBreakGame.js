// src/games/breakTheIce/useBreakGame.js
import { useState } from 'react';

const useBreakGame = () => {
  const [points, setPoints] = useState(10);  // Start with 100 points
  const [gameStatus, setGameStatus] = useState('playing');  // "playing", "won", "lost"

  // Handle the ice block hit
  const hitIce = () => {
    if (gameStatus === 'playing' && points > 0) {
      setPoints((prevPoints) => {
        const newPoints = prevPoints - 1;
        if (newPoints === 0) {
          setGameStatus('won'); // Player wins after 100 hits
        }
        return newPoints;
      });
    } else if (points === 0) {
      setGameStatus('lost'); // Game over if points reach 0
    }
  };

  return { points, hitIce, gameStatus };
};

export default useBreakGame;
