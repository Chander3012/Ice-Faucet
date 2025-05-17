import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { FaUserFriends } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

function Referrals() {
  const [referralCode, setReferralCode] = useState(''); // Default is an empty string
  const [userName, setUserName] = useState(''); // Store the user's name
  const [referralHistory, setReferralHistory] = useState([]);

  useEffect(() => {
    document.title = "Referrals - ICE Faucet";

    // Make sure to send the token for authentication if needed
    axios.get('/api/auth/referrals', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        const { referralCode, username, referrals } = response.data;

        // Ensure referralCode and username are set
        if (referralCode) {
          setReferralCode(referralCode);
        } else {
          setReferralCode(''); // If not available, keep it empty
        }

        if (username) {
          setUserName(username);
        } else {
          setUserName('User'); // Fallback if username is not available
        }

        // Set referral history data
        if (Array.isArray(referrals)) {
          setReferralHistory(referrals);
        }
      })
      .catch(error => {
        console.error("Error fetching referral data:", error);
        setReferralHistory([]); // Handle error gracefully
      });
  }, []);

  const copyToClipboard = () => {
    if (!referralCode) {
      Swal.fire({
        title: 'Error',
        text: 'Referral code is not available. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return; // Don't proceed with copying if no referral code
    }

    const input = document.createElement('input');
    input.value = `https://icefaucet.com/register?ref=${referralCode}`;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    Swal.fire({
      title: 'Copied!',
      text: 'Your referral link has been copied to the clipboard.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className={styles.referralsContainer}>
      <div className={styles.header}>
        <FaUserFriends className={styles.icon} />
        <h1 className={styles.title}>Invite & Earn</h1>
      </div>

      <p className={styles.description}>
        Invite your friends to ICE Faucet and earn <strong>25% of their earnings</strong> for life. It’s simple, easy, and profitable.
      </p>

      <div className={styles.referralBox}>
        <h3>Your Referral Link</h3>
        <div className={styles.linkBox}>
          <input
            type="text"
            readOnly
            value={`https://icefaucet.com/register?ref=${referralCode || userName}`} // Use referralCode if available
          />
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      </div>

      <div className={styles.historyBox}>
        <h3>Referral History</h3>
        {referralHistory.length === 0 ? (
          <p className={styles.noReferrals}>You don’t have any referrals yet.</p>
        ) : (
          <ul className={styles.historyList}>
            {referralHistory.map((ref, index) => (
              <li key={index} className={styles.historyItem}>
                <div>
                  <strong>{ref.username}</strong> joined on {new Date(ref.joined).toLocaleDateString()}
                </div>
                <span className={styles.earnings}>{ref.earnings} points</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Referrals;
