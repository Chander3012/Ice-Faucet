import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { token, verifyToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // If no token exists, redirect to login page
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Verify the token
        const user = await verifyToken();
        if (!user) {
          console.warn("Token verification failed but not due to invalid token.");
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // Show an alert if there's an error during token verification
        Swal.fire({
          title: "Logged Out",
          text: "You've been logged out. Please log in again.",
          icon: "success",
          confirmButtonColor: "#F44336",
          background: "#2d2d2d",
          color: "white",
        });
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkAuth();

    // Set an interval to verify the token every 5 minutes
    const interval = setInterval(() => {
      verifyToken().catch((err) => {
        console.warn("Token check failed during interval:", err.message);
      });
    }, 300000); // Every 5 minutes

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [token, navigate, verifyToken]);

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.navbarr}>
          <Navbar />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>

          <div className={styles.content}>
            {/* Routed Child Pages */}
            <div className={styles.outlet}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
