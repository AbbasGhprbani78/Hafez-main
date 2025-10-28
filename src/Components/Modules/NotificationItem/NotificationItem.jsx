import styles from "./NtificationItem.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toFarsiNumber, truncateText } from "../../../utils/helper";

export default function NotificationItem() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.notif_header}>
        <FontAwesomeIcon icon={faUser} />
        <span className={styles.notif_title}>{toFarsiNumber("نوتیف 1")}</span>
      </div>
      <p className={styles.notif_text}>
        {truncateText("افزودن پذیرش جدید", 30)}
      </p>
    </div>
  );
}

{
  /* <FontAwesomeIcon icon={faWallet} /> */
}
{
  /* <FontAwesomeIcon icon={faChartPie} /> */
}
