import {
  faBoxArchive,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import BoxCard from "../../Components/Modules/Box/Box";
import styles from "./Index.module.css";
import Notifications from "../../Components/Modules/Notifications/Notifications";
import Button2 from "../../Components/Modules/Button2/Button2";
import TableForm from "../../Components/Modules/Table/TableForm";
import { TableCell, TableRow } from "@mui/material";
import { toFarsiNumber } from "../../utils/helper";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import { errorMessage } from "../../Components/Modules/Toast/ToastCustom";
import apiClient from "../../config/axiosConfig";
import { useEffect, useState } from "react";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Components/Modules/Modal/Modal";
import notifItemStyles from "../../Components/Modules/NotificationItem/NtificationItem.module.css";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const columns = [
  "کد",
  "نام تعمیرکار",
  "تخصص تعمیرکار",
  "قابلیت زمانی تعمیرکار",
  "وضعیت",
];

const columns2 = ["کد", "نام کاربر", "نقش کاربر", "شماره تماس کاربر", "وضعیت"];

export default function Managment() {
  const [data, setData] = useState();
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [activeTab, setActiveTab] = useState("repairmen");
  const handleOpenNotif = (notif) => {
    setSelectedNotif(notif);
    setShowNotifModal(true);
  };
  const getDataManagement = async () => {
    try {
      const response = await apiClient.get("/app/api/admin-dashboard/");
      if (response.status === 200) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (error) {
      errorMessage(error.response.message || "خطا در دریافت داده");
    }
  };

  useEffect(() => {
    getDataManagement();
  }, []);

  return (
    <>
      <div className="content-conatiner">
        <SideBar />
        <div className="space-content scroll-contant">
          <Header title={"داشبورد مدیریت"} />
          <div className={styles.container}>
            <div className={`${styles.div1} ${styles.div_item}`}>
              <BoxCard
                title={"تجهیزات"}
                icon={faBoxArchive}
                route="/management/status"
                tabIndex={2}
              >
                <div className={`${styles.wrap_tools} scroll-right`}>
                  {data?.equipments?.items.map((item) => (
                    <StatusItem key={item.id} item={item} />
                  ))}
                </div>
              </BoxCard>
            </div>
            <div className={`${styles.div2} ${styles.div_item}`}>
              <BoxCard
                title={"سالن"}
                icon={faWarehouse}
                route="/management/status"
                tabIndex={0}
              >
                <div className={`${styles.wrap_tools} scroll-right`}>
                  {data?.salons?.items.map((item) => (
                    <StatusItem key={item.id} item={item} />
                  ))}
                </div>
              </BoxCard>
            </div>
            <div className={`${styles.div3} ${styles.div_item}`}>
              <BoxCard title={"حساب"} icon={faWallet} iscenter={true}>
                <Button2 onClick={""}>مشاهده حساب شخصی</Button2>
              </BoxCard>
            </div>
            <div className={`${styles.div4} ${styles.div_item}`}>
              <BoxCard
                title={"کاربران و تعمیرکاران"}
                icon={faUsers}
                route="/management/status"
                tabIndex={1}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Button
                    onClick={() => setActiveTab("repairmen")}
                    variant="contained"
                    className={` ${
                      activeTab === "repairmen" ? "active_btn" : "manual_btn"
                    }`}
                  >
                    تعمیرکاران
                  </Button>
                  <Button
                    onClick={() => setActiveTab("users")}
                    variant="contained"
                    className={` ${
                      activeTab === "users" ? "active_btn" : "manual_btn"
                    }`}
                  >
                    کاربران
                  </Button>
                </div>

                <TableForm
                  columns={activeTab === "repairmen" ? columns : columns2}
                  maxHeight={420}
                >
                  {(activeTab === "repairmen" ? data?.repairmen : data?.users)
                    ?.length > 0 &&
                    (activeTab === "repairmen"
                      ? data?.repairmen
                      : data?.users
                    )?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item?.code)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.first_name)}{" "}
                          {toFarsiNumber(item.last_name)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {Array.isArray(item?.specialty) &&
                          item.specialty.length > 0
                            ? item.specialty.map((t) => t.name).join(" / ")
                            : "—"}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {activeTab === "repairmen"
                            ? toFarsiNumber(item.work_time)
                            : toFarsiNumber(item.phone_number)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          <StatusItem item={item} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableForm>
              </BoxCard>
            </div>
            <div className={`${styles.div5} ${styles.div_item}`}>
              <Notifications
                notifications={data?.announcements}
                onOpenNotif={handleOpenNotif}
              />
            </div>
          </div>
          <Modal showModal={showNotifModal} setShowModal={setShowNotifModal}>
            {selectedNotif && (
              <div onClick={(e) => e.stopPropagation()}>
                <div
                  onClick={() => setShowNotifModal(false)}
                  style={{
                    cursor: "pointer",
                    textAlign: "right",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </div>
                <div className={notifItemStyles.modal_content}>
                  <div className={notifItemStyles.modal_title}>
                    {selectedNotif?.title}
                  </div>
                  <p className={notifItemStyles.modal_text}>
                    {selectedNotif?.body ||
                      selectedNotif?.description ||
                      selectedNotif?.text ||
                      "متن اعلان"}
                  </p>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}

function StatusItem({ item }) {
  return (
    <div className={styles.wrap_status_text}>
      <span className={styles.status_text}>{toFarsiNumber(item?.name)}</span>
      <div
        className={`${styles.status_elem} ${
          item.status === true ? styles.active : styles.inactive
        }`}
      >
        {item.status === true ? "فعال" : " غیر فعال"}
      </div>
    </div>
  );
}

StatusItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.bool,
  }).isRequired,
};
