import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./NtificationItem.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { errorMessage } from "../Toast/ToastCustom";
import apiClient from "../../../config/axiosConfig";

export default function NotificationItem({ notif, onOpenNotif }) {
  const [isRead, setIsRead] = useState(Boolean(notif?.is_read));

  const openNotif = async () => {
    if (onOpenNotif) {
      onOpenNotif(notif);
    }

    if (!isRead) {
      try {
        await apiClient.put(`user/notifications/${notif?.id}/read/`);
        setIsRead(true);
      } catch (error) {
        errorMessage("مشکل در تغییر وضعیت نوتیف پیش امده");
      }
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${isRead ? styles.read : styles.unread}`}
      onClick={openNotif}
    >
      <div className={styles.notif_header}>
        <FontAwesomeIcon icon={faUser} />
        <span className={styles.notif_title}>{notif?.title}</span>
      </div>
    </div>
  );
}

NotificationItem.propTypes = {
  notif: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    is_read: PropTypes.bool,
    body: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  onOpenNotif: PropTypes.func,
};
