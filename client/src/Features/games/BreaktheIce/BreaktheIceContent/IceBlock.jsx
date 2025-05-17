// src/games/breakTheIce/IceBlock.jsx
import React from 'react';

const IceBlock = ({ onClick }) => {
  return (
    <div
      onClick={onClick}  // Trigger hitIce on click
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: '#b0e0e6',  // Light blue for ice
        margin: '20px auto',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease-in-out',  // Transition for visual effect
      }}
    >
      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>🧊</div>  {/* Ice Block Visual */}
    </div>
  );
};

export default IceBlock;
