import React, { useEffect } from 'react';
import shortLinks from '../../../Data/Shortlinks';
import styles from './style.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const HardShortlinks = () => {
  const hardLinks = shortLinks.filter(link => link.type === 'hard');
  const { setPoints } = useAuth();

  useEffect(() => {
    document.title = "Hard Shortlinks - ICE Faucet";
  }, []);

  const handleReward = async (link) => {
    const confirmed = await Swal.fire({
      title: 'Complete the shortlink',
      text: 'After completing the shortlink, click OK to receive your reward.',
      icon: 'info',
      confirmButtonText: 'OK',
      showCancelButton: true,
      background: '#2d2d2d',
      color: '#fff',
    });

    if (confirmed.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
          'http://localhost:5000/api/points/add',
          { points: link.points },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPoints(res.data.updatedPoints);
        Swal.fire({
          title: 'Reward Received!',
          text: `You earned ${link.points} points.`,
          icon: 'success',
          background: '#2d2d2d',
          color: '#fff',
        });
      } catch (err) {
        console.error('Error updating points:', err);
        Swal.fire({
          title: 'Error',
          text: 'Could not update points.',
          icon: 'error',
          background: '#2d2d2d',
          color: '#fff',
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Hard Shortlinks</h2>
      <div className={styles.cardGrid}>
        {hardLinks.map((link, index) => (
          <div className={styles.card} key={index}>
            <h4>{link.title}</h4>
            <p>{link.description}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleReward(link)}
            >
              <button className={styles.visitButton}>Visit Link</button>
            </a>
            <p className={styles.points}>Reward: {link.points} Points</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HardShortlinks;
