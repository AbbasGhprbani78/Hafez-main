import styles from "./Modal.module.css";

export default function Modal({ children, style, showModal, setShowModal }) {
  return (
    <div
      className={`${styles.modal_container} ${showModal && styles.showmodal}`}
    >
      <div className={styles.closemodal} onClick={setShowModal}></div>
      <div className={`${styles.modal_contant} ${style}`}>{children}</div>
    </div>
  );
}
