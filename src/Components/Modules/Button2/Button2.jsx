import styles from "./Button2.module.css";
import Button from "@mui/material/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Button2({
  onClick,
  icon,
  style,
  variant = "contained",
  disable = false,
  type = "button",
  children,
  button_width,
}) {
  return (
    <Button
      type={type}
      disabled={disable}
      variant={variant}
      className={` ${disable ? styles.disabled_btn : styles.add_btn} ${
        styles[style]
      }`}
      onClick={onClick}
    >
      {children}
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon_input} />}
    </Button>
  );
}
