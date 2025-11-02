import Notifications from "../../../Components/Modules/Notifications/Notifications";
import Chart from "../../../Components/Modules/Chart/Chart";
import History from "../../../Components/Templates/RepairePanel/History/History";
import Table from "../../../Components/Templates/RepairePanel/Table/Table";
import styles from "./Index.module.css";
import Button2 from "../../../Components/Modules/Button2/Button2";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import BoxCard from "../../../Components/Modules/Box/Box";

export default function Home() {
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
        <BoxCard title={"حساب"} icon={faWallet}>
          <Button2 onClick={""}>مشاهده حساب شخصی</Button2>
        </BoxCard>
      </div>
      <div className={`${styles.div5} ${styles.box}`}>
        <Chart />
      </div>
    </div>
  );
}
