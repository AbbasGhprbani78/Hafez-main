import React from "react";
import styles from "./ConfirmBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function ConfirmBtn({ type, isSubmitting }) {
  return (
    <button
      className={`${styles.btn_confirm} ${
        isSubmitting && styles.disable_btn_form
      }`}
      type={type}
      disabled={isSubmitting}
    >
      {isSubmitting ? "در حال ارسال" : "تایید"}
      <FontAwesomeIcon icon={faCheck} className="ckeckicon " />
    </button>
  );
}
