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
//مصرف قطعات
const columns = [
  "کد قطعه / سریال قطعه",
  "شرح قطعه",
  "نوع خودرو",
  "شماره موتور",
  "تاریخ پذیرش",
  "تاریخ ترخیص",
  "تعداد",
  "سریال قطعه",
  "اجرت",
  "تعداد مصرف",
];

const tableInformation = [
  {
    partCode: "P-1001",
    description: "فیلتر روغن موتور",
    carType: "شاهین",
    engineNumber: "ENG442311",
    acceptDate: "1404/06/01",
    releaseDate: "1404/06/02",
    quantity: 2,
    serial: "SRL-000245",
    wage: "800,000 ریال",
    usedQuantity: 2,
  },
  {
    partCode: "P-1002",
    description: "روغن ترمز DOT4",
    carType: "کوییک",
    engineNumber: "ENG551922",
    acceptDate: "1404/06/01",
    releaseDate: "1404/06/03",
    quantity: 1,
    serial: "SRL-000356",
    wage: "600,000 ریال",
    usedQuantity: 1,
  },
  {
    partCode: "P-1003",
    description: "دیسک ترمز جلو",
    carType: "ساینا",
    engineNumber: "ENG661508",
    acceptDate: "1404/06/02",
    releaseDate: "1404/06/04",
    quantity: 2,
    serial: "SRL-000587",
    wage: "1,400,000 ریال",
    usedQuantity: 2,
  },
  {
    partCode: "P-1004",
    description: "شمع موتور",
    carType: "X200",
    engineNumber: "ENG441278",
    acceptDate: "1404/06/03",
    releaseDate: "1404/06/05",
    quantity: 4,
    serial: "SRL-000612",
    wage: "500,000 ریال",
    usedQuantity: 4,
  },
  {
    partCode: "P-1005",
    description: "فیلتر هوا",
    carType: "تیبا",
    engineNumber: "ENG558901",
    acceptDate: "1404/06/04",
    releaseDate: "1404/06/06",
    quantity: 1,
    serial: "SRL-000734",
    wage: "300,000 ریال",
    usedQuantity: 1,
  },
];

export default function Consumableparts() {
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
        <Header title={"مصرف قطعات"} />
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
              <Input
                name={"chassis_number"}
                label="سریال قطعه :"
                placeholder="سریال قطعه"
                icon={faHashtag}
                value={""}
                onChange={""}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name={"admission_number"}
                label="شرح قطعه :"
                placeholder="شرح قطعه"
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
                {toFarsiNumber(`${row.partCode}`)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.description)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.carType)}
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

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.quantity)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.serial)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.wage)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.usedQuantity)}
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
