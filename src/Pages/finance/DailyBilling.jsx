import { useState } from "react";
import Button2 from "../../Components/Modules/Button2/Button2";
import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
import { toFarsiNumber } from "../../utils/helper";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import Grid from "@mui/material/Grid2";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import DateRangeFilter from "../../Components/Modules/DateRangeFilter/DateRangeFilter";

const columns = [
  "کدملی / شناسه ملی مشتری",
  "نام مشتری",
  "شماره فاکتور",
  "شماره موتور",
  "مبلغ فاکتور قبل از تخفیف",
  "تخفیف",
  "مبلغ بعد از تخفیف",
  "مالیات ارزش افزوده",
  "جمع مبلغ قابل پرداخت",
];

const tableInformation = [
  {
    nationalId: "0012345678",
    customerName: "علی رضایی",
    invoiceNumber: "INV-14040701",
    engineNumber: "ENG-552341",
    beforeDiscount: "48,500,000 ریال",
    discount: "3,500,000 ریال",
    afterDiscount: "45,000,000 ریال",
    vat: "4,500,000 ریال",
    totalPayable: "49,500,000 ریال",
  },
  {
    nationalId: "0023456789",
    customerName: "زهرا محمدی",
    invoiceNumber: "INV-14040702",
    engineNumber: "ENG-663522",
    beforeDiscount: "32,000,000 ریال",
    discount: "2,000,000 ریال",
    afterDiscount: "30,000,000 ریال",
    vat: "3,000,000 ریال",
    totalPayable: "33,000,000 ریال",
  },
  {
    nationalId: "0034567890",
    customerName: "رضا نیک‌فر",
    invoiceNumber: "INV-14040703",
    engineNumber: "ENG-774411",
    beforeDiscount: "60,000,000 ریال",
    discount: "6,000,000 ریال",
    afterDiscount: "54,000,000 ریال",
    vat: "5,400,000 ریال",
    totalPayable: "59,400,000 ریال",
  },
  {
    nationalId: "0045678901",
    customerName: "مهدی احمدی",
    invoiceNumber: "INV-14040704",
    engineNumber: "ENG-885622",
    beforeDiscount: "28,000,000 ریال",
    discount: "1,500,000 ریال",
    afterDiscount: "26,500,000 ریال",
    vat: "2,650,000 ریال",
    totalPayable: "29,150,000 ریال",
  },
  {
    nationalId: "0056789012",
    customerName: "سارا شریفی",
    invoiceNumber: "INV-14040705",
    engineNumber: "ENG-996733",
    beforeDiscount: "52,000,000 ریال",
    discount: "2,000,000 ریال",
    afterDiscount: "50,000,000 ریال",
    vat: "5,000,000 ریال",
    totalPayable: "55,000,000 ریال",
  },
];

export default function DailyBilling() {
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
        <Header title={"صورتحساب روزانه"} />
        <Box
          sx={{
            margin: "2rem 0",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Grid container sx={{ width: "100%" }}>
            <Grid size={{ xs: 12 }}>
              <DateRangeFilter
                onDateChange={""}
                startLabel="از تاریخ تسویه شده"
                endLabel="تا تاریخ تسویه شده"
                spacingxl={30}
                spacingmd={10}
                spacingsx={2}
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
                {toFarsiNumber(row.nationalId)}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.customerName}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.invoiceNumber}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.engineNumber}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.beforeDiscount}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan", color: "red", fontWeight: 500 }}
              >
                {row.discount}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.afterDiscount}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.vat}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "iranYekan",
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                {row.totalPayable}
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
