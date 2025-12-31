import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Box.module.css";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function BoxCard({
  children,
  icon,
  title,
  route = "",
  iscenter = false,
  tabIndex = -1,
}) {
  const navigate = useNavigate();
  const titleSection = route ? (
    <div
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <FontAwesomeIcon icon={icon} />
        <span>{title}</span>
      </div>
      <button
        onClick={() => {
          navigate(`/management/status?tab=${tabIndex}`);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          color: "var(--color-1)",
        }}
      >
        بیشتر
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
    </div>
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
