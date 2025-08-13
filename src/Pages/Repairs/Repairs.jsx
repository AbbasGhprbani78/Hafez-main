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
import { ToastContainerCustom } from "../../Components/Modules/Toast/ToastCustom";
import { useEffect, useRef, useState } from "react";
import apiClient from "../../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../Components/Modules/Modal/Modal";
import DeleContent from "../../Components/Modules/DeleteContent/DeleContent";

export default function Repairs() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [expertStatements, setExpertStatements] = useState([]);
  const [pieces, setPieces] = useState([]);
  const printRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };

  const getDataTable = async () => {
    try {
      const response = await apiClient.get(`app/api/unified-repair/${id}`);
      if (response.status === 200) {
        const rawData = response.data;
        setData(rawData);

        const expertStatements = Array.isArray(rawData)
          ? rawData
              .map((item) => item.expert_statement)
              .filter(
                (value, index, self) =>
                  value && self.findIndex((v) => v.id === value.id) === index
              )
          : [];

        setExpertStatements(expertStatements);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPieces = async () => {
    try {
      const response = await apiClient.get("/app/pieces/");
      if (response.status === 200) {
        setPieces(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const colseCartHandler = async () => {
    try {
      const response = await apiClient.get(
        `/app/forms-update-step-repair-card/${id}`
      );

      if (response.status === 200) {
        navigate("/repairsall");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataTable();
    getPieces();
  }, []);

  return (
    <>
      <Modal showModal={showModal} setShowModal={handleToggleModal}>
        <DeleContent
          text={"آیا از بستن کارت اطمینان دارید ؟"}
          close={handleToggleModal}
          onClick={colseCartHandler}
        />
      </Modal>
      <div className="content-conatiner">
        <SideBar />
        <ToastContainerCustom />
        <div className={`space-content ${styles.wrap_repairs}`} ref={printRef}>
          <Header title={"کارت تعمیر :"} />
          <div className="">
            <AboutCar id={id} />
            <Occultation data={data} id={id} getDataTable={getDataTable} />
            <Geret data={data} id={id} expertStatements={expertStatements} />
            <Piece id={id} pieces={pieces} />
            <OutWork id={id} pieces={pieces} />
            <Attaches id={id} />
            <div className={styles.wrap_actions_repairs}>
              <Button2
                onClick={() => window.print()}
                icon={faPrint}
                style={"width"}
              >
                {"پرینت"}
              </Button2>
              <Button2
                onClick={() => setShowModal(true)}
                icon={faCheck}
                style={"width"}
              >
                {"بستن کارت تعمیر"}
              </Button2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
