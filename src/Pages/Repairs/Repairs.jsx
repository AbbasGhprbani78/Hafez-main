import styles from "./Repairs.module.css";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import AboutCar from "../../Components/Templates/Repairs/AboutCar/AboutCar";
import Occultation from "../../Components/Templates/Repairs/Occulatation/Occultation";
import Geret from "../../Components/Templates/Repairs/Geret/Geret";
import Piece from "../../Components/Templates/Repairs/Piece/Piece";
import OutWork from "../../Components/Templates/Repairs/OutWork/OutWork";
import Attaches from "../../Components/Templates/Repairs/Attaches/Attaches";
import Button2 from "../../Components/Modules/Button2/Button2";
import { faCheck, faPrint } from "@fortawesome/free-solid-svg-icons";
import Header from "../../Components/Modules/Header/Header";
import {
  errorMessage,
  ToastContainerCustom,
} from "../../Components/Modules/Toast/ToastCustom";
import { useEffect, useState } from "react";
import apiClient from "../../config/axiosConfig";

export default function Repairs() {
  const [data, setData] = useState("");
  const getDataTable = async () => {
    try {
      const response = await apiClient.get("app/technical-defects/", {
        params: { form_id: 39 },
      });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      errorMessage(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getDataTable();
  }, []);
  return (
    <div className="content-conatiner">
      <SideBar />
      <ToastContainerCustom />
      <div className={`space-content ${styles.wrap_repairs}`}>
        <Header title={"کارت تعمیر :"} />
        <div className="">
          {/* <AboutCar /> */}
          <Occultation data={data} />
          <Geret data={data} />
          {/* <Piece /> */}
          {/* <OutWork /> */}
          {/*<Attaches />
          <div className={styles.wrap_actions_repairs}>
            <Button2 onClick={""} icon={faPrint} style={"width"}>
              {"پرینت"}
            </Button2>
            <Button2 onClick={""} icon={faCheck} style={"width"}>
              {"بستن کارت تعمیر"}
            </Button2>
          </div> */}
        </div>
      </div>
    </div>
  );
}
