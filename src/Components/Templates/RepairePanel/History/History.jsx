import styles from "./History.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import HistoryItem from "./HistoryItem";

export default function History({ history = [] }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faClockRotateLeft} />
        <span>سوابق</span>
      </div>
      <div className={styles.wrapper_history}>
        {history?.length > 0 ? (
          history?.map((item) => <HistoryItem item={item} key={item?.id} />)
        ) : (
          <p>هیچ سابقه ای وجود ندارد !</p>
        )}
      </div>
    </div>
  );
}
