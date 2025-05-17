import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import dashboardStyles from "./Dashboard.module.css";
import landingStyles from "./style.module.css";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);

  // Choose styles based on current path
  const styles = path.startsWith("/dashboard") ? dashboardStyles : landingStyles;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data.user;
        setUsername(user.username);
        setPoints(user.points || 0);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    setPoints(0);
    navigate("/login");
  };

  const renderNavLinks = () => {
    if (path === "/" || path === "/landing") {
      return (
        <>
          <li className={`nav-item ${styles.navItem}`}>
            <HashLink smooth to="/#Home" className={`nav-link ${styles.navLink} ${styles.activeLink}`}>
              Home
            </HashLink>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <HashLink smooth to="/#About" className={`nav-link ${styles.navLink}`}>
              About
            </HashLink>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <HashLink smooth to="/#choose" className={`nav-link ${styles.navLink}`}>
              Services
            </HashLink>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <HashLink smooth to="/#Contact" className={`nav-link ${styles.navLink}`}>
              Contact Us
            </HashLink>
          </li>
        </>
      );
    } else if (path.startsWith("/dashboard")) {
      // Add dashboard-specific links here if needed
      return null;
    }
    return null;
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className={`container-fluid ${styles.container}`}>
        <Link className={`navbar-brand ${styles.brand}`} to="/">
          <img
            src="../image/download__1_-removebg-preview__1_-removebg-preview.png"
            alt="logo"
            className={styles.logo}
          />
          <span className={styles.versionBadge}>v1.0 🚀</span>
        </Link>

        {/* Show toggler only on non-dashboard pages */}
        {!path.startsWith("/dashboard") && (
          <button
  className={`navbar-toggler ${styles.toggler}`}
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span className={styles.togglerIcon}></span>
</button>
        )}

        <div className={`collapse navbar-collapse ${styles.collapse}`} id="navbarSupportedContent">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.nav}`}>{renderNavLinks()}</ul>

          {path.startsWith("/dashboard") && (
            <div className="d-flex align-items-center">
              <div className={`${styles.navbarPoints} ${styles.pointsDisplay} me-3`}>
                <span className={styles.pointsIcon}>ICE POINTS =</span>
                <span className={styles.pointsAmount}> {points} 🧊</span>
              </div>

              {username && (
                <span className="me-3 fw-bold" style={{ color: "white" }}>
                  Welcome, {username}!
                </span>
              )}

              <button className={`btn ${styles.logoutButton}`} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          {(path === "/" || path === "/landing") && (
            <div className={styles.buttonGroup}>
              <Link to="/register" className={`btn ${styles.primaryButton}`}>
                REGISTER
              </Link>
              <Link to="/login" className={`btn ${styles.secondaryButton}`}>
                LOGIN
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
