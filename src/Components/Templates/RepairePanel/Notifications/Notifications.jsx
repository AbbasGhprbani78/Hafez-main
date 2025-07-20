import styles from "./Notification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationItem from "../../../Modules/NotificationItem/NotificationItem";
export default function Notifications() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faBell} />
        <span>اعلانات</span>
      </div>
      <div className={styles.notifications_wrapper}>
        {Array(20)
          .fill(0)
          .map((item, i) => (
            <NotificationItem key={i} />
          ))}
      </div>
    </div>
  );
}
