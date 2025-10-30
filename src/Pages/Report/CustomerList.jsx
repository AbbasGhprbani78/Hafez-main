import { useState } from "react";
import Grid from "@mui/material/Grid2";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import MultiSelectDropDwon from "../../Components/Modules/MultiSelectDropdown/MultiSelectDropDwon";
import DateRangeFilter from "../../Components/Modules/DateRangeFilter/DateRangeFilter";
import Input from "../../Components/Modules/Input/Input";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
import { toFarsiNumber } from "../../utils/helper";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import Button2 from "../../Components/Modules/Button2/Button2";

const columns = [
  "کد",
  "نام مشتری",
  "کد ملی",
  "شماره تماس",
  "نوع خودرو",
  "تاریخ پذیرش",
  "تاریخ ترخیص",
  "مبلغ فاکتور",
];

const tableInformation = [
  {
    name: "علی رضایی",
    nationalCode: "1234567890",
    phone: "09121234567",
    carType: "پژو 206",
    admissionDate: "1403/07/10",
    releaseDate: "1403/07/15",
    invoiceAmount: "8,500,000",
  },
  {
    name: "مهدی کاظمی",
    nationalCode: "0987654321",
    phone: "09351234567",
    carType: "پراید 131",
    admissionDate: "1403/07/12",
    releaseDate: "1403/07/18",
    invoiceAmount: "5,200,000",
  },
  {
    name: "سارا محمدی",
    nationalCode: "1122334455",
    phone: "09135551234",
    carType: "تیبا 2",
    admissionDate: "1403/07/14",
    releaseDate: "1403/07/20",
    invoiceAmount: "6,750,000",
  },
  {
    name: "حمید نادری",
    nationalCode: "2233445566",
    phone: "09198887766",
    carType: "سمند EF7",
    admissionDate: "1403/07/11",
    releaseDate: "1403/07/17",
    invoiceAmount: "9,200,000",
  },
  {
    name: "نرگس شریفی",
    nationalCode: "3344556677",
    phone: "09352223344",
    carType: "دنا پلاس",
    admissionDate: "1403/07/09",
    releaseDate: "1403/07/16",
    invoiceAmount: "12,300,000",
  },
];

export default function CustomerList() {
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
        <Header title={"لیست مشتریان"} />
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
                label="کد ملی :"
                placeholder="کد ملی"
                icon={faHashtag}
                value={""}
                onChange={""}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name={"admission_number"}
                label="نام مشتری :"
                placeholder="نام مشتری "
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
              <MultiSelectDropDwon label={"نوع خودرو"} />
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
                {toFarsiNumber(index + 1)}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.name)}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.nationalCode)}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.phone)}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.carType)}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.admissionDate)}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.releaseDate)}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.invoiceAmount)}
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
