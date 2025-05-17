import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import Swal from "sweetalert2";
import giftCards from "../../Data/giftCards";
import axios from "axios";

export default function Withdraw() {
  const [activeTab, setActiveTab] = useState("giftcard");
  const [userPoints, setUserPoints] = useState(null);
  const [redemptionHistory, setRedemptionHistory] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchRedemptionHistory();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserPoints(res.data.user.points || 0);
    } catch (err) {
      console.error("User fetch error:", err);
      setUserPoints(0);
    }
  };

  const fetchRedemptionHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/points/redemptions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRedemptionHistory(res.data.redemptions || []);
    } catch (err) {
      console.error("Redemption history error:", err);
    }
  };

  const handleRedeem = async (cardId) => {
    const token = localStorage.getItem("token");
    const card = giftCards.find((c) => c.id === cardId);

    if (!token || !card) return;

    if (userPoints < card.requiredPoints) {
      Swal.fire("Insufficient Points", `You need ${card.requiredPoints} points.`, "error");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/points/redeem",
        { cardId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        Swal.fire("Success!", `Redeemed ${card.name} successfully.`, "success");
        setUserPoints(res.data.updatedPoints);
        fetchRedemptionHistory();
      } else {
        Swal.fire("Error", res.data.message || "Failed to redeem.", "error");
      }
    } catch (err) {
      console.error("Redeem error:", err);
      Swal.fire("Error", "An error occurred during redemption.", "error");
    }
  };

  return (
    <div className={styles.withdrawContainer}>
      <h2 className={styles.title}>Withdraw Options</h2>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabButton} ${activeTab === "cryptocurrency" ? styles.active : ""}`}
          onClick={() => setActiveTab("cryptocurrency")}
        >
          Cryptocurrency
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "giftcard" ? styles.active : ""}`}
          onClick={() => setActiveTab("giftcard")}
        >
          Giftcard
        </button>
      </div>

      <form className={styles.pointsForm} onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="availablePoints" className={styles.pointsLabel}>Available Points</label>
        <input
          id="availablePoints"
          type="text"
          value={userPoints === null ? "Loading..." : userPoints}
          readOnly
          className={styles.pointsInput}
        />
      </form>

      {activeTab === "giftcard" && (
        <div className={styles.giftcardGrid}>
          {giftCards.map((card) => {
            const canRedeem = userPoints >= card.requiredPoints;
            return (
              <div key={card.id} className={styles.giftcardCard} style={{ backgroundColor: card.bgColor }}>
                <div className={styles.giftcardLogo}>{card.logo}</div>
                <div className={styles.giftcardName}>{card.name}</div>
                <div className={styles.giftcardValue}>{card.value}</div>
                <div className={styles.pointsRequired}>Requires {card.requiredPoints} points</div>
                <button
                  className={styles.redeemBtn}
                  disabled={!canRedeem}
                  onClick={() => handleRedeem(card.id)}
                >
                  {canRedeem ? "Redeem" : "Not enough points"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <section className={styles.historySection}>
        <h3 className={styles.historyTitle}>Redemption History</h3>
        {redemptionHistory.length === 0 ? (
          <p className={styles.noHistoryText}>No redemption history found.</p>
        ) : (
          <ul className={styles.historyList}>
            {redemptionHistory.map((entry) => (
              <li key={entry._id} className={styles.historyItem}>
                <span>{entry.item}</span>
                <span className={styles.historyDate}>
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
