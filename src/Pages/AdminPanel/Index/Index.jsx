import {
  faBoxArchive,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import BoxCard from "../../../Components/Modules/Box/Box";
import styles from "./Index.module.css";
import Notifications from "../../../Components/Modules/Notifications/Notifications";
import Button2 from "../../../Components/Modules/Button2/Button2";
import TableForm from "../../../Components/Modules/Table/TableForm";
import { TableCell, TableRow } from "@mui/material";
const tools = [
  {
    id: 1,
    name: "نام ابزار",
    status: 1,
  },
  {
    id: 2,
    name: "نام ابزار",
    status: 2,
  },
  {
    id: 3,
    name: "نام ابزار",
    status: 2,
  },
  {
    id: 4,
    name: "نام ابزار",
    status: 1,
  },
  {
    id: 5,
    name: "نام ابزار",
    status: 1,
  },
  {
    id: 6,
    name: "نام ابزار",
    status: 2,
  },
];

const salons = [
  {
    id: 1,
    name: "سالن1",
    status: 1,
  },
  {
    id: 2,
    name: "سالن2",
    status: 2,
  },
  {
    id: 3,
    name: "سالن3",
    status: 2,
  },
  {
    id: 4,
    name: "سالن4",
    status: 1,
  },
  {
    id: 5,
    name: "سالن5",
    status: 1,
  },
  {
    id: 6,
    name: "سالن6",
    status: 2,
  },
];
const columns = [
  "کد",
  "نام تعمیرکار",
  "تخصص تعمیرکار",
  "قابلیت زمانی تعمیرکار",
  "وضعیت",
  "عملیات",
];
const data = [
  {
    id: "0012",
    repairmanname: "مهدی رضائی",
    respairmanexp: "مکانیک",
    timework: "0912345678",
    status: "1",
  },
  {
    id: "0013",
    repairmanname: "نیما سلیمانی",
    respairmanexp: "برق",
    timework: "8 ساعت کار در روز",
    status: "2",
  },
  {
    id: "0014",
    repairmanname: "سعید رضائی",
    respairmanexp: "صافکاری",
    timework: "10 ساعت کار در روز",
    status: "3",
  },
  {
    id: "0014",
    repairmanname: "رضا احمدی",
    respairmanexp: "نقاشی",
    timework: "0912345678",
    status: "1",
  },
];

const columns2 = [
  "کد",
  "نام کاربر",
  "نقش کاربر",
  "شماره تماس کاربر",
  "وضعیت",
  "عملیات",
];
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

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={`${styles.div1} ${styles.div_item}`}>
        <BoxCard title={"تجهیزات"} icon={faBoxArchive}>
          <div className={styles.wrap_tools}>
            {tools.map((item) => (
              <StatusItem key={item.id} item={item} />
            ))}
          </div>
        </BoxCard>
      </div>
      <div className={`${styles.div2} ${styles.div_item}`}>
        <BoxCard title={"سالن"} icon={faBoxArchive}>
          <div className={styles.wrap_tools}>
            {salons.map((item) => (
              <StatusItem key={item.id} item={item} />
            ))}
          </div>
        </BoxCard>
      </div>
      <div className={`${styles.div3} ${styles.div_item}`}>
        <BoxCard title={"حساب"} icon={faWallet}>
          <Button2 onClick={""}>مشاهده حساب شخصی</Button2>
        </BoxCard>
      </div>
      <div className={`${styles.div4} ${styles.div_item}`}>
        <BoxCard title={"برنامه ریزی تعمیرکار"} icon={faUsers}>
          <TableForm columns={columns} maxHeight={280}>
            {data.length > 0 &&
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {item.id}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {item.repairmanname}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {item.respairmanexp}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {item.timework}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {item.status}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "iranYekan",
                      flexDirection: "row",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button2>مشاهده</Button2>
                  </TableCell>
                </TableRow>
              ))}
          </TableForm>
        </BoxCard>
      </div>
      <div className={`${styles.div5} ${styles.div_item}`}>
        <Notifications />
      </div>
      <div className={`${styles.div6} ${styles.div_item}`}>
        <BoxCard title={"کاربر"} icon={faUsers}>
          <TableForm columns={columns2} maxHeight={150}>
            {data2.length > 0 &&
              data2.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {item.id}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {item.repairmanname}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {item.respairmanexp}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {item.phonenumber}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {item.status}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "iranYekan",
                      flexDirection: "row",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button2>مشاهده</Button2>
                  </TableCell>
                </TableRow>
              ))}
          </TableForm>
        </BoxCard>
      </div>
    </div>
  );
}

function StatusItem({ item }) {
  return (
    <div className={styles.wrap_status_text}>
      <span className={styles.status_text}>{item.name}</span>
      <div
        className={`${styles.status_elem} ${
          item.status === 1 ? styles.active : styles.inactive
        }`}
      >
        {item.status === 1 ? "فعال" : " غیر فعال"}
      </div>
    </div>
  );
}
