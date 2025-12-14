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

const columns = [
  "کد",
  "نام تعمیرکار",
  "تخصص تعمیرکار",
  "قابلیت زمانی تعمیرکار",
  "وضعیت",
];
// const data = [
//   {
//     id: "0012",
//     repairmanname: "مهدی رضائی",
//     respairmanexp: "مکانیک",
//     timework: "0912345678",
//     status: "1",
//   },
//   {
//     id: "0013",
//     repairmanname: "نیما سلیمانی",
//     respairmanexp: "برق",
//     timework: "8 ساعت کار در روز",
//     status: "2",
//   },
//   {
//     id: "0014",
//     repairmanname: "سعید رضائی",
//     respairmanexp: "صافکاری",
//     timework: "10 ساعت کار در روز",
//     status: "3",
//   },
//   {
//     id: "0014",
//     repairmanname: "رضا احمدی",
//     respairmanexp: "نقاشی",
//     timework: "0912345678",
//     status: "1",
//   },
// ];

const columns2 = ["کد", "نام کاربر", "نقش کاربر", "شماره تماس کاربر", "وضعیت"];
const data2 = [
  {
    id: "0012",
    repairmanname: "مهدی رضائی",
    respairmanexp: "مکانیک",
    phonenumber: "0912345678",
    status: "1",
  },
  {
    id: "0013",
    repairmanname: "نیما سلیمانی",
    respairmanexp: "برق",
    phonenumber: "0912345678",
    status: "2",
  },
  {
    id: "0014",
    repairmanname: "سعید رضائی",
    respairmanexp: "صافکاری",
    phonenumber: "0912345678",
    status: "3",
  },
  {
    id: "0014",
    repairmanname: "رضا احمدی",
    respairmanexp: "نقاشی",
    phonenumber: "0912345678",
    status: "1",
  },
];

export default function Managment() {
  const [data, setData] = useState();
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
              <BoxCard title={"تجهیزات"} icon={faBoxArchive}>
                <div className={styles.wrap_tools}>
                  {data?.equipments?.items.map((item) => (
                    <StatusItem key={item.id} item={item} />
                  ))}
                </div>
              </BoxCard>
            </div>
            <div className={`${styles.div2} ${styles.div_item}`}>
              <BoxCard title={"سالن"} icon={faBoxArchive}>
                <div className={styles.wrap_tools}>
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
              <BoxCard title={"برنامه ریزی تعمیرکار"} icon={faUsers}>
                <TableForm columns={columns} maxHeight={280}>
                  {data?.length > 0 &&
                    data?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.id)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.repairmanname)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.respairmanexp)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.timework)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableForm>
              </BoxCard>
            </div>
            <div className={`${styles.div5} ${styles.div_item}`}>
              <Notifications notifications={data?.announcements} />
            </div>
            <div className={`${styles.div6} ${styles.div_item}`}>
              <BoxCard title={"کاربر"} icon={faUsers}>
                <TableForm columns={columns2} maxHeight={150}>
                  {data2.length > 0 &&
                    data2.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.id)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.repairmanname)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.respairmanexp)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.phonenumber)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontFamily: "iranYekan" }}
                        >
                          {toFarsiNumber(item.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableForm>
              </BoxCard>
            </div>
          </div>
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
