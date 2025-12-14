import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Box.module.css";
import { Link } from "react-router-dom";

export default function BoxCard({
  children,
  icon,
  title,
  isLink = false,
  link = "",
  iscenter = false,
}) {
  return (
    <div style={{ textDecoration: "none", color: "inherit" }}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <FontAwesomeIcon icon={icon} />
          <span>{title}</span>
        </div>
        <div className={iscenter && styles.btn_wrapper}>{children}</div>
      </div>
    </div>
  );
}
