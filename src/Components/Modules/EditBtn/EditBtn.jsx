import React from "react";
import styles from "./EditBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function EditBtn({ onClick, text, type = "button" }) {
  return (
    <button className={styles.btn_edit} onClick={onClick} type={type}>
      {text}
      <FontAwesomeIcon icon={faPen} className={`penicon`} />
    </button>
  );
}
