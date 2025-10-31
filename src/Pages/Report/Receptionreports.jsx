import { useState } from "react";
import { TableRow, TableCell, Box, CircularProgress } from "@mui/material";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import Grid from "@mui/material/Grid2";
import { toFarsiNumber } from "../../utils/helper";
import styles from "./Report.module.css";
import Input from "../../Components/Modules/Input/Input";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import DateRangeFilter from "../../Components/Modules/DateRangeFilter/DateRangeFilter";
import MultiSelectDropDwon from "../../Components/Modules/MultiSelectDropdown/MultiSelectDropDwon";
import Button2 from "../../Components/Modules/Button2/Button2";
const columns = [
  "شماره پذیرش",
  "نوع خودرو",
  "اطلاعات خودرو",
  "اطلاعات پذیرش و مشتری",
  "نوع خدمات",
  "سالن",
  "زمان و هزینه تخمینی",
  "زمان تعمیرات (ساعت)",
  "تعمیرگاه",
  "نوقف در سالن (ساعت)",
  "زمان پیش فاکتور (ساعت)",
  "زمان پذیرش تا ترخیص (ساعت)",
  "وضعیت",
];

const tableInformation = [
  {
    id: "F000482",
    carType: "شاهین",
    carInfo: {
      vin: "NAPXY1AAJPZ004344",
      color: "مشکی",
      plate: "78 الف 894 ایران 11",
      mileage: "31500",
    },
    customerInfo: {
      name: "علی اولیایی",
      type: "مشتری گارانتی",
      acceptTime: "14:16 | 1404/06/01",
      deliveryTime: "15:30 | 1404/06/01",
    },
    services: ["تعویض روغن", "تنظیم موتور", "بازدید ترمز"],
    hall: "سالن 1",
    estimate: {
      time: "5 ساعت",
      cost: "15,000,000 ریال",
    },
    repairTime: "5",
    repairShop: "تعمیرگاه 4",
    stopTime: "3",
    preInvoiceTime: "3",
    totalTime: "39.14",
    status: "رسید مشتری",
  },
  {
    id: "F000483",
    carType: "کوییک",
    carInfo: {
      vin: "NAPXY1BASJP133366",
      color: "سفید",
      plate: "98 ص 824 ایران 13",
      mileage: "22345",
    },
    customerInfo: {
      name: "علی اصغر بهرامی",
      type: "مشتری امدادی",
      acceptTime: "09:40 | 1404/06/01",
      deliveryTime: "11:15 | 1404/06/01",
    },
    services: ["تعویض باطری", "شست‌وشوی انژکتور"],
    hall: "سالن 1",
    estimate: {
      time: "3 ساعت",
      cost: "10,000,000 ریال",
    },
    repairTime: "3",
    repairShop: "تعمیرگاه 1",
    stopTime: "1",
    preInvoiceTime: "1.33",
    totalTime: "1.33",
    status: "رسید مشتری",
  },
  {
    id: "F000482",
    carType: "شاهین",
    carInfo: {
      vin: "NAPXY1AAJPZ004344",
      color: "مشکی",
      plate: "78 الف 894 ایران 11",
      mileage: "31500",
    },
    customerInfo: {
      name: "علی اولیایی",
      type: "مشتری گارانتی",
      acceptTime: "14:16 | 1404/06/01",
      deliveryTime: "15:30 | 1404/06/01",
    },
    services: ["تعویض روغن", "تنظیم موتور", "بازدید ترمز"],
    hall: "سالن 1",
    estimate: {
      time: "5 ساعت",
      cost: "15,000,000 ریال",
    },
    repairTime: "5",
    repairShop: "تعمیرگاه 4",
    stopTime: "3",
    preInvoiceTime: "3",
    totalTime: "39.14",
    status: "رسید مشتری",
  },
  {
    id: "F000483",
    carType: "کوییک",
    carInfo: {
      vin: "NAPXY1BASJP133366",
      color: "سفید",
      plate: "98 ص 824 ایران 13",
      mileage: "22345",
    },
    customerInfo: {
      name: "علی اصغر بهرامی",
      type: "مشتری امدادی",
      acceptTime: "09:40 | 1404/06/01",
      deliveryTime: "11:15 | 1404/06/01",
    },
    services: ["تعویض باطری", "شست‌وشوی انژکتور"],
    hall: "سالن 1",
    estimate: {
      time: "3 ساعت",
      cost: "10,000,000 ریال",
    },
    repairTime: "3",
    repairShop: "تعمیرگاه 1",
    stopTime: "1",
    preInvoiceTime: "1.33",
    totalTime: "1.33",
    status: "رسید مشتری",
  },
];
export default function Receptionreports() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(tableInformation.length);
  const [loading, setLoading] = useState(false);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const pageLength = 10;

  return (
    <Grid className="content-conatiner">
      <SideBar />
      <Grid
        size={{ xs: 12 }}
        container
        sx={{
          width: "100%",
        }}
        minWidth={100}
        className="space-content scroll-contant"
      >
        <Header title={"گزارش پذیرش"} />

        <Box
          sx={{
            margin: "2rem 0",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 2, md: 10, xl: 30 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name={"chassis_number"}
                label="شماره شاسی :"
                placeholder="شماره شاسی"
                icon={faHashtag}
                value={""}
                onChange={""}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name={"admission_number"}
                label="شماره پذیرش :"
                placeholder="شماره پذیرش"
                icon={faHashtag}
                value={""}
                onChange={""}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ width: "100%" }}>
            <Grid size={{ xs: 12 }}>
              <DateRangeFilter
                onDateChange={""}
                startLabel="از تاریخ پذیرش"
                endLabel="تا تاریخ پذیرش"
                spacingxl={30}
                spacingmd={10}
                spacingsx={2}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ width: "100%" }}>
            <Grid size={{ xs: 12 }}>
              <DateRangeFilter
                onDateChange={""}
                startLabel="از تاریخ ترخیص"
                endLabel="تا تاریخ ترخیص"
                spacingxl={30}
                spacingmd={10}
                spacingsx={2}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 2, md: 10, xl: 30 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <MultiSelectDropDwon label={"وضعیت پذیرش"} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <MultiSelectDropDwon label={"نوع خودرو"} />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 2, md: 10, xl: 30 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <MultiSelectDropDwon label={"نوع خدمات"} />
            </Grid>
          </Grid>
        </Box>
        <TableCustom
          rows={tableInformation}
          columns={columns}
          onChange={handleChangePage}
          page={page}
          rowsPerPage={pageLength}
          total={totalRows}
        >
          {tableInformation.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                fontFamily: "iranYekan !important",
              }}
            >
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.id)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.carType)}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                <div>{toFarsiNumber(`شماره شاسی: ${row.carInfo.vin}`)}</div>
                <div>{toFarsiNumber(`رنگ: ${row.carInfo.color}`)}</div>
                <div>{toFarsiNumber(`پلاک: ${row.carInfo.plate}`)}</div>
                <div>{toFarsiNumber(`کیلومتر: ${row.carInfo.mileage}`)}</div>
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                <div>
                  {toFarsiNumber(`نام مشتری: ${row.customerInfo.name}`)}
                </div>
                <div>{toFarsiNumber(`نوع: ${row.customerInfo.type}`)}</div>
                <div>
                  {toFarsiNumber(`پذیرش: ${row.customerInfo.acceptTime}`)}
                </div>
                <div>
                  {toFarsiNumber(`ترخیص: ${row.customerInfo.deliveryTime}`)}
                </div>
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.services && row.services.length > 0
                  ? toFarsiNumber(row.services.join("، "))
                  : "-"}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.hall)}
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                <div>{toFarsiNumber(`زمان: ${row.estimate.time}`)}</div>
                <div>{toFarsiNumber(`هزینه: ${row.estimate.cost}`)}</div>
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.repairTime)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.repairShop)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.stopTime)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.preInvoiceTime)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.totalTime)}
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  color: "#333",
                  fontWeight: "bold",
                  fontFamily: "iranYekan",
                }}
              >
                {toFarsiNumber(row.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableCustom>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: ".5rem",
            margin: "1rem 0",
            justifyContent: "end",
            width: "100%",
            flexDirection: { sx: "column", md: "row" },
          }}
        >
          <Button2 button_width={"button_width"}>
            {loading ? (
              <CircularProgress size={"20px"} color="success" />
            ) : (
              "دریافت اکسل"
            )}
          </Button2>
          <Button2 button_width={"button_width"}>
            {loading ? (
              <CircularProgress size={"20px"} color="success" />
            ) : (
              "دریافت PDF"
            )}
          </Button2>
          <Button2 button_width={"button_width"}>
            {loading ? (
              <CircularProgress size={"20px"} color="success" />
            ) : (
              "چاپ"
            )}
          </Button2>
        </Box>
      </Grid>
    </Grid>
  );
}

{
  /* <Grid container sx={{ width: "100%" }}>
          <Grid size={{ xs: 12 }}></Grid>
        </Grid> */
}
