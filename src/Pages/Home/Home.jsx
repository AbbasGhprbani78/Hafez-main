import "./Home.css";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import Notifications from "../../Components/Modules/Notifications/Notifications";
import Chart from "../../Components/Modules/Chart/Chart";
import { faBoxArchive, faUsers } from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid2";
import BoxCard from "../../Components/Modules/Box/Box";
import { Box } from "@mui/material";
import { toFarsiNumber } from "../../utils/helper";
import { useEffect, useState } from "react";
import { errorMessage } from "../../Components/Modules/Toast/ToastCustom";
import apiClient from "../../config/axiosConfig";
import Modal from "../../Components/Modules/Modal/Modal";
import notifItemStyles from "../../Components/Modules/NotificationItem/NtificationItem.module.css";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import { TableCell, TableRow } from "@mui/material";

const columns = [
  "کد",
  "نام تعمیرکار",
  "تخصص تعمیرکار",
  "قابلیت زمانی تعمیرکار",
  "وضعیت",
];

export default function Home() {
  const [data, setData] = useState("");
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [showNotifModal, setShowNotifModal] = useState(false);

  const getDataHome = async () => {
    try {
      const response = await apiClient.get("app/api/home-stats/");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataHome();
  }, []);

  const handleOpenNotif = (notif) => {
    setSelectedNotif(notif);
    setShowNotifModal(true);
  };
  return (
    <>
      <div className="content-conatiner">
        <SideBar />
        <div className="space-content scroll-contant">
          <Header title={"خانه"} />
          <div className="home-container">
            <div className="home-item div1">
              <BoxCard title={"ظرفیت تعمیرگاه"} icon={faBoxArchive}>
                <Grid
                  container
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <span className={"titleone"}>سالن</span>
                    <span className="value-one">
                      {toFarsiNumber(data?.capacity?.salons)}
                    </span>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <span className={"titleone"}>تجهیزات</span>
                    <span className="value-one">
                      {toFarsiNumber(data?.capacity?.equipments)}
                    </span>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <span className={"titleone"}>تعمیرکار</span>
                    <span className="value-one">
                      {toFarsiNumber(data?.capacity?.repairmen)}
                    </span>
                  </Box>
                </Grid>
              </BoxCard>
            </div>
            <div className="home-item div2">
              <BoxCard title={"اطلاعات انبار"} icon={faBoxArchive}>
                <Grid container gap={12} sx={{ width: "100%", height: "100%" }}>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.3rem",
                      padding: "1.2rem",
                    }}
                  >
                    <li className="item-box2">کسری انبار</li>
                    <li className="item-box2">موجودی انبار</li>
                  </ul>
                </Grid>
              </BoxCard>
            </div>
            <div className="home-item div3">
              <BoxCard
                title={"تعداد پذیرش روزانه"}
                icon={faUsers}
                iscenter={true}
              >
                <span className="value-one">
                  {toFarsiNumber(data?.new_admissions_today)}
                </span>
              </BoxCard>
            </div>
            <div className="home-item div4">
              <Notifications
                notifications={data?.notifications || []}
                onOpenNotif={handleOpenNotif}
              />
            </div>
            <div className="home-item div5">
              <Chart />
            </div>
            <div className="home-item div6" style={{ overflow: "auto" }}>
              <div style={{ width: "100%", overflowX: "auto" }}>
                <BoxCard
                  title={"وضعیت لحظه ای تعمیرکار"}
                  icon={faUsers}
                  isLink={true}
                  link="/management"
                >
                  <TableCustom
                    columns={columns}
                    rows={data?.repairmen_status}
                    ishidepageination={true}
                  >
                    {data?.repairmen_status?.length > 0 &&
                      data?.repairmen_status.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(item?.repairman_code)}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(item?.repairman_name)}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {Array.isArray(item.repairman_specialties) &&
                            item.repairman_specialties.length > 0
                              ? item.repairman_specialties
                                  .map((t) => t)
                                  .join(" / ")
                              : "Invalid data"}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {`${toFarsiNumber(
                              item?.total_hours
                            )} ساعت کار در روز`}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {`${toFarsiNumber(item?.free_hours)}`}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            <div
                              style={{
                                color: "#fff",
                                padding: "4px 10px",
                                borderRadius: "100px",
                              }}
                              className={` ${
                                item?.work_status === "free"
                                  ? "free"
                                  : item?.work_status === "in_repair"
                                  ? "under"
                                  : "hide"
                              }`}
                            >
                              {item?.work_status === "free"
                                ? "آزاد"
                                : item?.work_status === "in_repair"
                                ? "درحال تعمیر"
                                : "Hide"}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableCustom>
                </BoxCard>
              </div>
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
