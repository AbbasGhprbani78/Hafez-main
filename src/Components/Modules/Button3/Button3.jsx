import React from "react";
import styles from "./Button3.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button3({
  icon,
  bgColor = "#3e846b",
  iconColor = "#fff",
  onClick,
}) {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} color={iconColor} />}
    </button>
  );
}
