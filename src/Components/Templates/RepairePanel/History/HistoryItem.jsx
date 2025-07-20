import styles from "./History.module.css";
export default function HistoryItem() {
  return (
    <div className={styles.item_history}>
      <span className={styles.title_history}>مدل ماشین</span>
      <button className={styles.btn}>اتمام تعمیر</button>
    </div>
  );
}
