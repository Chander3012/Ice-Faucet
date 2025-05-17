import React, { useEffect } from 'react';
import ptcAds from '../../Data/ptcads';
import styles from './style.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const PTCAds = () => {
  const ptcLinks = ptcAds.filter(link => link.id === 'ptc');
  const { setPoints } = useAuth();

  useEffect(() => {
    document.title = "PTC Ads - ICE Faucet";
  }, []);

  const handleReward = async (link) => {
    const confirmed = await Swal.fire({
      title: 'View the Ad',
      text: 'After viewing the ad, click OK to claim your reward.',
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
          title: 'Reward Granted!',
          text: `You earned ${link.points} points for viewing the ad.`,
          icon: 'success',
          background: '#2d2d2d',
          color: '#fff',
        });
      } catch (err) {
        console.error('Error rewarding points:', err);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update points.',
          icon: 'error',
          background: '#2d2d2d',
          color: '#fff',
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Paid To Click (PTC Ads)</h2>
      <div className={styles.cardGrid}>
        {ptcLinks.map((link, index) => (
          <div className={styles.card} key={index}>
            <h4>{link.title}</h4>
            <p>{link.description}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleReward(link)}
            >
              <button className={styles.visitButton}>View Ad</button>
            </a>
            <p className={styles.points}>Reward: {link.points} Points</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PTCAds;
