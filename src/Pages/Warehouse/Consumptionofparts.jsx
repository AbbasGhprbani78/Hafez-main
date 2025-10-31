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
const columns = [
  "سریال قطعه",
  "شرح قطعه",
  "تعداد مصرف",
  "نرخ مصرف",
  "تاریخ ترخیص",
];

const tableInformation = [
  {
    serial: "SRL-001245",
    description: "فیلتر روغن موتور",
    usedQuantity: 2,
    rate: "1,200,000 ریال",
    releaseDate: "1404/06/01",
  },
  {
    serial: "SRL-001356",
    description: "دیسک ترمز جلو",
    usedQuantity: 1,
    rate: "4,500,000 ریال",
    releaseDate: "1404/06/02",
  },
  {
    serial: "SRL-001478",
    description: "روغن ترمز DOT4",
    usedQuantity: 1,
    rate: "850,000 ریال",
    releaseDate: "1404/06/03",
  },
  {
    serial: "SRL-001589",
    description: "شمع موتور",
    usedQuantity: 4,
    rate: "600,000 ریال",
    releaseDate: "1404/06/04",
  },
  {
    serial: "SRL-001622",
    description: "فیلتر هوا",
    usedQuantity: 1,
    rate: "350,000 ریال",
    releaseDate: "1404/06/05",
  },
];

export default function Consumptionofparts() {
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
        <Header title={"قطعات پر مصرف"} />
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
                label="نرخ مصرف :"
                placeholder="نرخ مصرف"
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
              {/* سریال قطعه */}
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.serial)}
              </TableCell>

              {/* شرح قطعه */}
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.description)}
              </TableCell>

              {/* تعداد مصرف */}
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.usedQuantity)}
              </TableCell>

              {/* نرخ مصرف */}
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.rate)}
              </TableCell>

              {/* تاریخ ترخیص */}
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.releaseDate)}
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
