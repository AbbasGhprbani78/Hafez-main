import { useState } from "react";
import Button2 from "../../Components/Modules/Button2/Button2";
import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
import { toFarsiNumber } from "../../utils/helper";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Modules/Input/Input";
import Grid from "@mui/material/Grid2";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import DateRangeFilter from "../../Components/Modules/DateRangeFilter/DateRangeFilter";

const columns = ["نام تعمیرکار", "تعداد پذیرش", "زمان تعمیرات", "مبلغ کارکرد"];

const tableInformation = [
  {
    mechanicName: "علی کریمی",
    acceptanceCount: 12,
    repairTime: "48 ساعت",
    workAmount: "120,000,000 ریال",
  },
  {
    mechanicName: "رضا احمدی",
    acceptanceCount: 9,
    repairTime: "36 ساعت",
    workAmount: "95,000,000 ریال",
  },
  {
    mechanicName: "حمید مرادی",
    acceptanceCount: 15,
    repairTime: "60 ساعت",
    workAmount: "150,000,000 ریال",
  },
  {
    mechanicName: "سعید نیک‌فر",
    acceptanceCount: 8,
    repairTime: "32 ساعت",
    workAmount: "88,000,000 ریال",
  },
  {
    mechanicName: "مجتبی قنبری",
    acceptanceCount: 11,
    repairTime: "45 ساعت",
    workAmount: "110,000,000 ریال",
  },
];

export default function WorkOfContractors() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(tableInformation.length);
  const [loading, setLoading] = useState(false);
  const pageLength = 10;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
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
                startLabel="از تاریخ"
                endLabel="تا تاریخ "
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
              <Input
                name={"admission_number"}
                label="نام تعمیرکار :"
                placeholder="نام تعمیرکار"
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
                {row.mechanicName}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.acceptanceCount}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.repairTime}
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontFamily: "iranYekan",
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                {row.workAmount}
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
