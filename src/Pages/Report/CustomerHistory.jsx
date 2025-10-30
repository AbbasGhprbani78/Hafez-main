import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import Button2 from "../../Components/Modules/Button2/Button2";
import { toFarsiNumber } from "../../utils/helper";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";

import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Modules/Input/Input";
import Grid from "@mui/material/Grid2";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import styles from "./Report.module.css";
const columns = [
  "شماره پذیرش",
  "کد ملی",
  "شماره شاسی",
  "شماره موتور",
  "تاریخ پذیرش",
  "تاریخ ترخیص",
  "وضعیت پذیرش",
  "قطعات",
  "اجرت",
  "کار خارج",
];

const tableInformation = [
  {
    id: "F000601",
    nationalCode: "1234567890",
    vin: "NAPXY1AAJPZ004344",
    engineNumber: "ENG441233",
    acceptDate: "1404/06/01",
    releaseDate: "1404/06/03",
    status: "در حال تعمیر",
    parts: [
      {
        code: "P-001",
        description: "فیلتر روغن",
        reason: "تعویض در سرویس دوره‌ای",
        price: "1,200,000 ریال",
        quantity: 1,
        mechanic: "مهدی رضایی",
      },
      {
        code: "P-002",
        description: "روغن موتور",
        reason: "تعویض پس از 10,000 کیلومتر",
        price: "2,500,000 ریال",
        quantity: 4,
        mechanic: "مهدی رضایی",
      },
    ],
    wages: [
      {
        issue: "تعویض روغن و فیلتر",
        wage: "800,000 ریال",
        mechanic: "علی موسوی",
        repairTime: "0.5 ساعت",
      },
      {
        issue: "بازرسی سیستم ترمز",
        wage: "1,200,000 ریال",
        mechanic: "علی موسوی",
        repairTime: "1 ساعت",
      },
    ],
    externalWork: [
      {
        description: "تراش دیسک ترمز در تراشکاری",
        price: "1,800,000 ریال",
      },
    ],
  },
  {
    id: "F000602",
    nationalCode: "1122334455",
    vin: "NAPXY1BASJP133366",
    engineNumber: "ENG558721",
    acceptDate: "1404/06/02",
    releaseDate: "1404/06/04",
    status: "تکمیل شده",
    parts: [
      {
        code: "P-010",
        description: "واشر سرسیلندر",
        reason: "نشت روغن",
        price: "3,200,000 ریال",
        quantity: 1,
        mechanic: "حمید احمدی",
      },
    ],
    wages: [
      {
        issue: "تعویض واشر سرسیلندر",
        wage: "2,000,000 ریال",
        mechanic: "حمید احمدی",
        repairTime: "3 ساعت",
      },
    ],
    externalWork: [
      {
        description: "تست انژکتور در تعمیرگاه تخصصی",
        price: "900,000 ریال",
      },
    ],
  },
  {
    id: "F000603",
    nationalCode: "9988776655",
    vin: "NAPXY1BAARJP009778",
    engineNumber: "ENG338211",
    acceptDate: "1404/06/03",
    releaseDate: "1404/06/03",
    status: "تحویل شده",
    parts: [
      {
        code: "P-021",
        description: "باتری",
        reason: "ضعیف شدن باتری قبلی",
        price: "4,500,000 ریال",
        quantity: 1,
        mechanic: "رضا کیانی",
      },
    ],
    wages: [
      {
        issue: "تعویض باتری و تست دینام",
        wage: "500,000 ریال",
        mechanic: "رضا کیانی",
        repairTime: "0.3 ساعت",
      },
    ],
    externalWork: [],
  },
];

export default function CustomerHistory() {
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
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
        minWidth={100}
        className="space-content"
      >
        <Header title={"سابقه مشتریان"} />
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
                label="کد ملی :"
                placeholder="کد ملی"
                icon={faHashtag}
                value={""}
                onChange={""}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 2, md: 10, xl: 30 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name={"chassis_number"}
                label="اجرت :"
                placeholder="اجرت"
                icon={faHashtag}
                value={""}
                onChange={""}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name={"admission_number"}
                label="قطعات :"
                placeholder="قطعات"
                icon={faHashtag}
                value={""}
                onChange={""}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 2, md: 10, xl: 30 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name={"chassis_number"}
                label="کار خارج :"
                placeholder="کار خارج"
                icon={faHashtag}
                value={""}
                onChange={""}
              />
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
                {toFarsiNumber(row.nationalCode)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.vin)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.engineNumber)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.acceptDate)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.releaseDate)}
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontFamily: "iranYekan",
                  color:
                    row.status === "تکمیل شده"
                      ? "green"
                      : row.status === "تحویل شده"
                      ? "blue"
                      : "#ff9800",
                  fontWeight: "bold",
                }}
              >
                {toFarsiNumber(row.status)}
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                {row.parts && row.parts.length > 0
                  ? row.parts.map((part, idx) => (
                      <div
                        key={idx}
                        style={{ marginBottom: "6px", textAlign: "right" }}
                      >
                        <div>{toFarsiNumber(`کد قطعه: ${part.code}`)}</div>
                        <div>
                          {toFarsiNumber(`شرح قطعه: ${part.description}`)}
                        </div>
                        <div>{toFarsiNumber(`علت تعویض: ${part.reason}`)}</div>
                        <div>{toFarsiNumber(`قیمت: ${part.price}`)}</div>
                        <div>{toFarsiNumber(`تعداد: ${part.quantity}`)}</div>
                        <div>{toFarsiNumber(`تعمیرکار: ${part.mechanic}`)}</div>
                      </div>
                    ))
                  : "-"}
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                {row.wages && row.wages.length > 0
                  ? row.wages.map((wage, idx) => (
                      <div
                        key={idx}
                        style={{ marginBottom: "6px", textAlign: "right" }}
                      >
                        <div>
                          {toFarsiNumber(`اظهار/عیب فنی: ${wage.issue}`)}
                        </div>
                        <div>{toFarsiNumber(`اجرت: ${wage.wage}`)}</div>
                        <div>{toFarsiNumber(`تعمیرکار: ${wage.mechanic}`)}</div>
                        <div>
                          {toFarsiNumber(`مدت زمان تعمیر: ${wage.repairTime}`)}
                        </div>
                      </div>
                    ))
                  : "-"}
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                {row.externalWork && row.externalWork.length > 0
                  ? row.externalWork.map((work, idx) => (
                      <div
                        key={idx}
                        style={{ marginBottom: "6px", textAlign: "right" }}
                      >
                        <div>
                          {toFarsiNumber(`شرح کار: ${work.description}`)}
                        </div>
                        <div>{toFarsiNumber(`قیمت: ${work.price}`)}</div>
                      </div>
                    ))
                  : "-"}
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
            margin: "1.5rem 0",
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
