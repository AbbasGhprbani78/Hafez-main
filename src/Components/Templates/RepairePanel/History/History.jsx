import styles from "./History.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import HistoryItem from "./HistoryItem";

export default function History() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faClockRotateLeft} />
        <span>سوابق</span>
      </div>
      <div className={styles.wrapper_history}>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <HistoryItem key={i} />
          ))}
      </div>
    </div>
  );
}
