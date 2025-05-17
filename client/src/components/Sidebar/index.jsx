import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaLink,
  FaGamepad,
  FaBullhorn,
  FaMoneyBillWave,
  FaArrowDown,
  FaUserFriends,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaPuzzlePiece,
  FaRocket,
  FaSnowflake,
} from "react-icons/fa";
import styles from './style.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [shortlinkOpen, setShortlinkOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: "/dashboard/PtcAds", label: "PTC Ads", icon: <FaBullhorn className={styles.ptcIcon} /> },
    { to: "/dashboard/deposit", label: "Deposit", icon: <FaMoneyBillWave className={styles.depositIcon} /> },
    { to: "/dashboard/withdraw", label: "Withdraw", icon: <FaArrowDown className={styles.withdrawIcon} /> },
    { to: "/dashboard/Referrals", label: "Referrals", icon: <FaUserFriends className={styles.adIcon} />}
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <>
      {/* Toggle Bar */}
      <div className={styles.toggleBar}>
        <FaBars onClick={toggleSidebar} className={styles.toggleIcon} />
        {isOpen && (
          <Link to="/dashboard" className={styles.toggleText}>
            DASHBOARD
          </Link>
        )}
      </div>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <nav>
          {/* Shortlink Dropdown */}
          <div
            className={`${styles.menuItem} ${isActive("/shortlink") ? styles.active : ''}`}
            onClick={() => setShortlinkOpen(!shortlinkOpen)}
          >
            <FaLink className={styles.shortlinkIcon} />
            {isOpen && (
              <>
                <span>Shortlink</span>
                <span className={styles.dropdownIcon}>
                  {shortlinkOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </>
            )}
          </div>
          <div className={`${styles.dropdownContainer} ${shortlinkOpen && isOpen ? styles.visible : ''}`}>
            <div className={styles.subMenu}>
              <Link
                to="/dashboard/EasyShortlinks"
                className={`${styles.subMenuItem} ${isActive("/EasyShortlinks") ? styles.activeSubItem : ''}`}
              >
                <FaPuzzlePiece className={styles.easyShortlinkIcon} />
                {isOpen && "Easy Shortlink"}
              </Link>
              <Link
                to="/dashboard/HardShortlinks"
                className={`${styles.subMenuItem} ${isActive("/HardShortlinks") ? styles.activeSubItem : ''}`}
              >
                <FaRocket className={styles.hardShortlinkIcon} />
                {isOpen && "Hard Shortlink"}
              </Link>
            </div>
          </div>

          {/* Games Dropdown */}
          <div
            className={`${styles.menuItem} ${isActive("/games") ? styles.active : ''}`}
            onClick={() => setGamesOpen(!gamesOpen)}
          >
            <FaGamepad className={styles.gamesIcon} />
            {isOpen && (
              <>
                <span>Games</span>
                <span className={styles.dropdownIcon}>
                  {gamesOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </>
            )}
          </div>
          <div className={`${styles.dropdownContainer} ${gamesOpen && isOpen ? styles.visible : ''}`}>
            <div className={styles.subMenu}>
              <Link
                to="/dashboard/BreakTheIce"
                className={`${styles.subMenuItem} ${isActive("/BreakTheIce") ? styles.activeSubItem : ''}`}
              >
                <FaSnowflake className={styles.breakIceIcon} />
                {isOpen && "Break the Ice"}
              </Link>
            </div>
          </div>

          {/* Other Links */}
          {menuItems.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`${styles.menuItem} ${isActive(to) ? styles.active : ''}`}
            >
              {icon}
              {isOpen && <span>{label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;