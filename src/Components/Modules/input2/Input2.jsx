import React from "react";
import styles from "./Input2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Input2({ icon, placeholder, name, value, onChange }) {
  return (
    <div className={`${styles.input2_container} mt-2`}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type="text"
        className={styles.input2_form}
        placeholder={placeholder}
        autoComplete="off"
        maxLength={70}
      />
      <FontAwesomeIcon icon={icon} className={styles.icon_input} />
    </div>
  );
}
