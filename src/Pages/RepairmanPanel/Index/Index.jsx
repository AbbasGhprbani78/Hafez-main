import Account from "../../../Components/Templates/RepairePanel/Account/Account";
import Chart from "../../../Components/Templates/RepairePanel/Chart/Chart";
import History from "../../../Components/Templates/RepairePanel/History/History";
import Notifications from "../../../Components/Templates/RepairePanel/Notifications/Notifications";
import Table from "../../../Components/Templates/RepairePanel/Table/Table";
import styles from "./Index.module.css";

export default function Index() {
  return (
    <div className={styles.parent}>
      <div className={`${styles.div1} ${styles.box}`}>
        <Table />
      </div>
      <div className={`${styles.div2} ${styles.box}`}>
        <Notifications />
      </div>
      <div className={`${styles.div3} ${styles.box}`}>
        <History />
      </div>
      <div className={`${styles.div4} ${styles.box}`}>
        <Account />
      </div>
      <div className={`${styles.div5} ${styles.box}`}>
        <Chart />
      </div>
    </div>
  );
}
