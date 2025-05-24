import React from "react";
import styles from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function Button1({ type, isSubmitting }) {
  return (
    <>
      <button
        className={`${styles.btn_1_wrapper} ${
          isSubmitting ? styles.disbtn : ""
        }`}
        type={type}
        disabled={isSubmitting}
      >
        <div className={`${styles.btn_1}`}>
          {isSubmitting ? "صبر کنید" : "ادامه"}
        </div>
        <div className={`${styles.btn_arrow_wrapper}`}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      </button>
    </>
  );
}
