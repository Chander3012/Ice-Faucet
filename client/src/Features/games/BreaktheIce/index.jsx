import React,{useEffect} from "react";
import GameContainer from "./BreaktheIceContent/GameContainer";
import styles from "./style.module.css"; // Importing external styles

const BreakTheIce = () => {

  useEffect(() => {
            document.title = "Games - ICE Faucet";
          }, []);
  return (
    <>
      <div className={styles.contentWrapper}>

        {/* Main Content - 80% */}
        <div className={styles.mainContent}>
          <h1 className={styles.title}>❄️ Break the Ice Game</h1>
          <p className={styles.subtitle}>
            Hit the ice block with your pickaxe and break it to win a reward! 🧊
          </p>
          {/* Pass in the GameContainer component to manage the actual game */}
          <GameContainer />
        </div>
      </div>
    </>
  );
};

export default BreakTheIce;