import Notifications from "../../../Components/Modules/Notifications/Notifications";
import Chart from "../../../Components/Modules/Chart/Chart";
import History from "../../../Components/Templates/RepairePanel/History/History";
import Table from "../../../Components/Templates/RepairePanel/Table/Table";
import styles from "./Index.module.css";
import Button2 from "../../../Components/Modules/Button2/Button2";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import BoxCard from "../../../Components/Modules/Box/Box";
import { errorMessage } from "../../../Components/Modules/Toast/ToastCustom";
import apiClient from "../../../config/axiosConfig";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const getDataHome = async () => {
    try {
      const response = await apiClient("repairman/dashboard/");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      errorMessage("خطا در دریافت داده ها ");
    }
  };

  useEffect(() => {
    getDataHome();
  }, []);

  return (
    <div className={styles.parent}>
      <div className={`${styles.div1} ${styles.box}`}>
        <Table pendingTask={data?.history?.pending} />
      </div>
      <div className={`${styles.div2} ${styles.box}`}>
        <Notifications notifications={data?.notifications} />
      </div>
      <div className={`${styles.div3} ${styles.box}`}>
        <History history={data?.history?.completed} />
      </div>
      <div className={`${styles.div4} ${styles.box}`}>
        <BoxCard title={"حساب"} icon={faWallet} iscenter={true}>
          <Button2 onClick={""}>مشاهده حساب شخصی</Button2>
        </BoxCard>
      </div>
      <div className={`${styles.div5} ${styles.box}`}>
        <Chart />
      </div>
    </div>
  );
}
