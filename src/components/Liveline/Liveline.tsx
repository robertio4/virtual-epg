import { SIZE_RATIO } from "../../constants";
import styles from "./Liveline.module.css";

const Liveline = () => {
  const now = new Date();
  const nowMins = now.getMinutes() + now.getHours() * 60;

  return (
    <div data-testid="liveline-container" className={styles.livelineContainer}>
      <div
        data-testid="liveline"
        className={styles.liveline}
        style={{ left: `${nowMins * SIZE_RATIO}rem` }}
      >
        <div className={styles.livelineHead} />
        <div className={styles.livelineBody} />
      </div>
    </div>
  );
};

export default Liveline;
