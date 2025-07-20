import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../History/History.module.css";
import Button2 from "../../../Modules/Button2/Button2";

export default function Account() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faWallet} />
        <span>حساب</span>
      </div>
      <div className={styles.btn_wrapper}>
        <Button2 onClick={""}>مشاهده حساب شخصی</Button2>
      </div>
    </div>
  );
}
