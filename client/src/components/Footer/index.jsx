import React from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import styles from './style.module.css';

function Footer() {
  const location = useLocation();

  // Check if it's a dashboard route
  const isDashboard = ["/dashboard", "/BreakTheIce", "/EasyShortlinks", "/HardShortlinks", "/deposit"]
    .some(path => location.pathname.startsWith(path));

  if (isDashboard) {
    return (
      <footer className={styles.dashboardFooter}>
        &copy; {new Date().getFullYear()} Ice Faucet — Earn. Play. Repeat.
      </footer>
    );
  }

  // Landing/footer layout
  return (
    <footer className={styles.landingFooter}>
      <div className={styles.footerContainer}>
        {/* Logo + About */}
        <div className={styles.footerSection}>
          <h5 className={styles.footerLogo}>Ice Faucet</h5>
          <p className={styles.footerDescription}>
            Instantly claim free crypto every day. <br /> Built for the next generation of Web3 users.
          </p>
        </div>

        {/* Links */}
        <div className={styles.footerSection}>
          <h5 className={styles.footerHeading}>Links</h5>
          <ul className={styles.footerList}>
            <li><HashLink smooth to="/#faq" className={styles.footerLink}>FAQ</HashLink></li>
            <li><HashLink smooth to="/#how-it-works" className={styles.footerLink}>How It Works</HashLink></li>
            <li><HashLink smooth to="/#earn" className={styles.footerLink}>Earn Crypto</HashLink></li>
          </ul>
        </div>

        {/* Contact */}
       
        <div className={styles.footerSection}>
          <h5 className={styles.footerHeading} id="Contact">Contact</h5>
          <p className={styles.footerText}>Email: support@icefaucet.io</p>
          <p className={styles.footerText}>X (Twitter): @icefaucet</p>
          <p className={styles.footerText}>WhatApp: +91 xxxxxxxxxx</p>
        </div>
      </div>

      <hr className={styles.footerDivider} />
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Ice Faucet. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;