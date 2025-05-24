import React from 'react';
import styles from './ProgressBar.module.css'

const ProgressBar = ({ currentStep }) => {

    return (
      <div
        className={`${styles.pragress_wrapper} d-flex justify-content-between`}
        style={{ direction: "ltr" }}
      >
        <div className={styles.pragress_Container}>
          <div
            className={styles.progress}
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>

          <div
            style={{ position: "relative" }}
            className={`${styles.circle} ${
              currentStep >= 1 ? styles.active : ""
            }`}
          >
            1
            <p className={styles.item_prog_text} style={{ paddingTop: "15px" }}>
              اطلاعات مشتری
            </p>
          </div>
          <div className={`${styles.circle} ${currentStep >= 2 ? styles.active : ""}`}>
            2<p className={styles.item_prog_text}>اطلاعات خودرو</p>
          </div>
          <div className={`${styles.circle} ${currentStep >= 3 ? styles.active : ""}`}>
            3<p className={styles.item_prog_text}>اظهارات مشتری</p>
          </div>
          <div className={`${styles.circle} ${currentStep >= 4 ? styles.active : ""}`}>
            4<p className={styles.item_prog_text}>فرم تایید</p>
          </div>
        </div>
      </div>
    );
};

export default ProgressBar;
