import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Box.module.css";

export default function BoxCard({ children, icon, title }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={icon} />
        <span>{title}</span>
      </div>
      <div className={styles.btn_wrapper}>{children}</div>
    </div>
  );
}
