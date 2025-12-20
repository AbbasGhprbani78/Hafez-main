import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Box.module.css";
import { Link } from "react-router-dom";

export default function BoxCard({
  children,
  icon,
  title,
  link = "",
  iscenter = false,
}) {
  const titleSection = link ? (
    <Link
      to={link}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        gap: "10px",
      }}
    >
      <FontAwesomeIcon icon={icon} />
      <span>{title}</span>
    </Link>
  ) : (
    <>
      <FontAwesomeIcon icon={icon} />
      <span>{title}</span>
    </>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{titleSection}</div>
      <div className={iscenter ? styles.btn_wrapper : undefined}>
        {children}
      </div>
    </div>
  );
}
