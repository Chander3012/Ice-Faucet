import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const RewardModal = ({ gameStatus, onClose }) => {
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (gameStatus === 'won') {
      MySwal.fire({
        title: <strong>🎉 Congratulations!</strong>,
        html: <p>You broke the ice and earned a reward! 🎁</p>,
        icon: 'success',
        confirmButtonText: 'Awesome!',
        confirmButtonColor: '#4CAF50',
        customClass: {
          popup: 'animated fadeInDown',
        },
      }).then(onClose);
    } else if (gameStatus === 'lost') {
      MySwal.fire({
        title: <strong>😞 Game Over!</strong>,
        html: <p>You ran out of points. Try again!</p>,
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#f44336',
        customClass: {
          popup: 'animated fadeInDown',
        },
      }).then(onClose);
    }
  }, [gameStatus, onClose, MySwal]);

  return null; // No visible component needed
};

export default RewardModal;
