import styles from "./Modal.module.css";
import PropTypes from "prop-types";

export default function Modal({ children, style, showModal, setShowModal }) {
  const handleClose = (e) => {
    e.stopPropagation();
    if (setShowModal) {
      setShowModal(false);
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!showModal) return null;

  return (
    <div
      className={`${styles.modal_container} ${showModal && styles.showmodal}`}
      onClick={handleClose}
    >
      <div className={styles.closemodal}></div>
      <div
        className={`${styles.modal_contant} ${style}`}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  style: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func,
};
