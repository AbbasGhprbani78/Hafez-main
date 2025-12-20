import styles from "./Notification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationItem from "../NotificationItem/NotificationItem";
import PropTypes from "prop-types";

export default function Notifications({ notifications = [], onOpenNotif }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faBell} />
        <span>اعلانات</span>
      </div>
      <div className={styles.notifications_wrapper}>
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <NotificationItem
              key={notif?.id}
              notif={notif}
              onOpenNotif={onOpenNotif}
            />
          ))
        ) : (
          <>
            <p className="text">هیج نوتیفی وجود ندارد !</p>
          </>
        )}
      </div>
    </div>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  onOpenNotif: PropTypes.func,
};
