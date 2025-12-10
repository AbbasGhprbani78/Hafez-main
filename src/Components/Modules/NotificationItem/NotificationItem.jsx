import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./NtificationItem.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { errorMessage } from "../Toast/ToastCustom";
import apiClient from "../../../config/axiosConfig";
import Modal from "../Modal/Modal";

export default function NotificationItem({ notif }) {
  const [isRead, setIsRead] = useState(Boolean(notif?.is_read));
  const [showModal, setShowModal] = useState(false);

  const openNotif = async () => {
    setShowModal(true);

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
      <Modal showModal={showModal} setShowModal={() => setShowModal(false)}>
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>{notif?.title}</div>
          <p className={styles.modal_text}>
            {notif?.body || notif?.description || notif?.text || "متن اعلان"}
          </p>
        </div>
      </Modal>
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
};
