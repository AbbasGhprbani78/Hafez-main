import React from 'react';
import styles from  './CarModel.module.css';

export default function CarModal({
    opneModal,
    setOpenModal,
    imgImModal,
    modalText,
    setModalText,
    handleSaveText,
}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const isBase64 = (str) => {
        return str.startsWith('data:image/');
    };

    const imgsrc = imgImModal ? (isBase64(imgImModal) ? imgImModal : `${apiUrl}${imgImModal}`) : ""

    return (
      <div
        className={`${styles.carModal_container} ${
          opneModal ? styles.activeModalCar : ""
        }`}
      >
        <div
          className={styles.closeCarModal}
          onClick={() => setOpenModal(false)}
        ></div>
        <div className={`${styles.carModal_content}`}>
          <div className={styles.modal_image}>
            {imgsrc ? (
              <img src={imgsrc} alt="Uploaded Preview" />
            ) : (
              <div className="text-center d-flex align-items-center justify-content-center h-100">
                عکسی جهت نمایش وجود ندارد
              </div>
            )}
          </div>
          <textarea
            className={styles.modal_textarea}
            placeholder="توضیحات"
            value={modalText || ""}
            onChange={(e) => setModalText(e.target.value)}
          />
          <button className="btn-modalcar mt-3" onClick={handleSaveText}>
            ثبت
          </button>
        </div>
      </div>
    );
}
