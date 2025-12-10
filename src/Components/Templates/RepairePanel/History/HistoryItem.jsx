import styles from "./History.module.css";
export default function HistoryItem({ item }) {
  return (
    <div className={styles.item_history}>
      <span className={styles.title_history}>{item?.model}</span>
      <button className={styles.btn}>{item?.action}</button>
    </div>
  );
}
