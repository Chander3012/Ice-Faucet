// src/games/breakTheIce/GameContainer.jsx
import React, { useState } from 'react';
import IceBlock from './IceBlock';
import useBreakGame from './useBreakGame';
import RewardModal from './RewardModal'; // Import the modal

const GameContainer = () => {
  const { points, hitIce, gameStatus } = useBreakGame();
  const [modalVisible, setModalVisible] = useState(false);

  // Show modal when game ends
  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal when the user clicks close
  };

  // Show modal when the game status changes to "won" or "lost"
  React.useEffect(() => {
    if (gameStatus !== 'playing') {
      setModalVisible(true); // Show the modal
    }
  }, [gameStatus]);

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Points: {points}</h2>

      <IceBlock onClick={hitIce} />

      {/* Show Reward Modal if game is over */}
      {modalVisible && (
        <RewardModal gameStatus={gameStatus} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default GameContainer;
