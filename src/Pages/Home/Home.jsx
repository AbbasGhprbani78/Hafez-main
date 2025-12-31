import "./Home.css";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import Notifications from "../../Components/Modules/Notifications/Notifications";
import Chart from "../../Components/Modules/Chart/Chart";
import {
  faBoxArchive,
  faCircleCheck,
  faEye,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import { toFarsiNumber } from "../../utils/helper";
import { useEffect, useState } from "react";
import apiClient from "../../config/axiosConfig";
import Modal from "../../Components/Modules/Modal/Modal";
import notifItemStyles from "../../Components/Modules/NotificationItem/NtificationItem.module.css";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import { TableCell, TableRow } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import BoxCard from "../../Components/Modules/Box/Box";

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

          <p className={"text-home"}>
            نرم افزار مدیریت جامع نمایندگی حافظ قطعات
          </p>
          <Grid
            size={{ xs: 12 }}
            container
            sx={{
              width: "100%",
              marginTop: "1.5rem",
            }}
            spacing={{ xs: 2 }}
            alignItems="stretch"
          >
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Box
                sx={{
                  background: "var(--color-3)",
                  width: "100%",
                  borderRadius: "10px",
                  padding: "20px",
                  height: "100%",
                  minHeight: "210.6px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  <FontAwesomeIcon icon={faUsers} />
                  <span>تعداد پذیرش روزانه</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    color: "#fff",
                    fontWeight: "600",
                    marginTop: "1.3rem",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>
                    {toFarsiNumber(data?.new_admissions_today)}
                  </span>
                  <span> پذیرش جدید</span>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Box
                sx={{
                  boxShadow: "0px 2px 15px 0px #E5E5E5",
                  width: "100%",
                  borderRadius: "10px",
                  padding: "20px",
                  minHeight: "210.6px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "var(--color-3)",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  <FontAwesomeIcon icon={faBoxArchive} />
                  <span>اطلاعات انبار</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "13px",
                    color: "#fff",
                    fontWeight: "600",
                    marginTop: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "8px",
                      background: "#EFEFEF80",
                      padding: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      color: "var(--color-3)",
                      fontWeight: "600",
                      boxShadow: " 0px 2px 4px 0px #D9D9D9CC",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                      <span>کسری انبار</span>
                    </Box>
                    <Box
                      sx={{
                        background: "var(--color-3)",
                        color: "#fff",
                        borderRadius: "4px",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: " 0px 2px 4px 0px #D9D9D9CC",
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      background: "#EFEFEF80",
                      padding: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      color: "var(--color-3)",
                      fontWeight: "600",
                      boxShadow: " 0px 2px 4px 0px #D9D9D9CC",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                      <span>موجودی انبار</span>
                    </Box>
                    <Box
                      sx={{
                        background: "var(--color-3)",
                        color: "#fff",
                        borderRadius: "4px",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box
                sx={{
                  boxShadow: "0px 2px 15px 0px #E5E5E5",
                  width: "100%",
                  borderRadius: "10px",
                  padding: "20px",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "var(--color-3)",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  <FontAwesomeIcon icon={faBoxArchive} />
                  <span>ظرفیت تعمیرگاه</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginTop: "1.3rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".5rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        background: "var(--color-3)",
                        color: "#fff",
                        borderRadius: "4px",
                        width: "44px",
                        height: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "600",
                      }}
                    >
                      <HomeOutlinedIcon style={{ fontSize: "25px" }} />
                    </Box>
                    <span
                      style={{ color: "var(--color-3)", fontWeight: "600" }}
                    >
                      <span
                        style={{
                          color: "var(--color-1)",
                          fontSize: "1.1rem",
                          paddingLeft: "2px",
                        }}
                      >
                        {toFarsiNumber(data?.capacity?.salons)}
                      </span>
                      سالن
                    </span>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".5rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        background: "var(--color-3)",
                        color: "#fff",
                        borderRadius: "4px",
                        width: "44px",
                        height: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "600",
                      }}
                    >
                      <SettingsOutlinedIcon style={{ fontSize: "25px" }} />
                    </Box>
                    <span
                      style={{ color: "var(--color-3)", fontWeight: "600" }}
                    >
                      <span
                        style={{
                          color: "var(--color-1)",
                          fontSize: "1.1rem",
                          paddingLeft: "2px",
                        }}
                      >
                        {toFarsiNumber(data?.capacity?.equipments)}
                      </span>
                      تجهیزات{" "}
                    </span>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".5rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        background: "var(--color-3)",
                        color: "#fff",
                        borderRadius: "4px",
                        width: "44px",
                        height: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "600",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUserRegular}
                        style={{ fontSize: "20px" }}
                      />
                    </Box>
                    <span
                      style={{ color: "var(--color-3)", fontWeight: "600" }}
                    >
                      <span
                        style={{
                          color: "var(--color-1)",
                          fontSize: "1.1rem",
                          paddingLeft: "2px",
                        }}
                      >
                        {toFarsiNumber(data?.capacity?.repairmen)}
                      </span>
                      تعمیرکار{" "}
                    </span>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid
            size={{ xs: 12 }}
            container
            sx={{
              width: "100%",
              margin: "1rem 0 1.5rem 0",
            }}
            spacing={{ xs: 2 }}
            alignItems={"stretch"}
          >
            <Grid size={{ xs: 12, md: 4 }}>
              <div className="home-item " style={{ height: "100%" }}>
                <Notifications
                  notifications={data?.notifications || []}
                  onOpenNotif={handleOpenNotif}
                />
              </div>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }} sx={{ height: "max-content" }}>
              <div
                className="home-item"
                style={{
                  width: "100%",
                  overflowX: "auto",
                  marginBottom: "1rem",
                }}
              >
                <BoxCard title={"وضعیت لحظه ای تعمیرکار"} icon={faUsers}>
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
              <Chart />
            </Grid>
          </Grid>
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
    </>
  );
}
