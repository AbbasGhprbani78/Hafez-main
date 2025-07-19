import React from "react";
import styles from "./Notification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
export default function Notifications() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faBell} />
        <span>اعلانات</span>
      </div>
    </div>
  );
}
