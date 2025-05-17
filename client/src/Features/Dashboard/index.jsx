import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './style.module.css';
import { Link } from 'react-router-dom';

function Index() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Dashboard - ICE Faucet";
  }, []);

  return (
    <>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.welcomeTitle}>
          👋 Hey{user?.username ? `, ${user.username}` : ''}!
        </h1>
        <p className={styles.subtitle}>
          🎉 Welcome to your <span className={styles.highlight}>Dashboard</span> – let's make today productive!
        </p>
        <div className={styles.emojiBanner}>
          🚀 💎 🌟 🔥 🧊
        </div>
      </div>

      <div className={styles.dashboardContainer}>
      <p className={styles.subtitle}>
          Best Way <span className={styles.welcomeTitle}>Earn</span>
        </p>
      <div className={styles.container1}>
        
        <Link to="/dashboard/EasyShortlinks" className={styles.cardLink}>
          <div className={styles.featureCard}>
            <h2>🔗 Shortlinks</h2>
            <p>Earn rewards by visiting and completing short links.</p>
          </div>
        </Link>

        <Link to="/dashboard/PtcAds" className={styles.cardLink}>
          <div className={styles.featureCard}>
            <h2>📢 PTC Ads</h2>
            <p>Click and view ads to gain points and bonuses.</p>
          </div>
        </Link>

        <Link to="/dashboard/BreakTheIce" className={styles.cardLink}>
          <div className={styles.featureCard}>
            <h2>🎮 Games</h2>
            <p>Play games and break the ice to win cool rewards!</p>
          </div>
        </Link>
      </div>
      </div>


      <div className={styles.dashboardContainer}>
      <p className={styles.subtitle}>
          Best Way <span className={styles.welcomeTitle}>CashOut</span>
        </p>
      <div className={styles.container1}>
  <Link to="/dashboard/deposit" className={styles.cardLink}>
    <div className={styles.featureCard}>
      <h2>💰 Deposit</h2>
      <p>Add funds to your account and earn ICE Points.</p>
    </div>
  </Link>

  <Link to="/dashboard/withdraw" className={styles.cardLink}>
    <div className={styles.featureCard}>
      <h2>🏦 Withdraw</h2>
      <p>Withdraw your earned rewards safely and easily.</p>
    </div>
  </Link>

  <Link to="/dashboard/advertisement" className={styles.cardLink}>
    <div className={styles.featureCard}>
      <h2>📣 Advertisement</h2>
      <p>Promote your product or site with PTC ads and banners.</p>
    </div>
  </Link>
</div>
</div>
    </>
  );
}

export default Index;
