import Header from "../../Components/Modules/Header/Header";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import styles from "./Fund.module.css";
import DataInput from "../../Components/Modules/DataInput/DataInput";
import Button2 from "../../Components/Modules/Button2/Button2";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Modules/Input/Input";
import { TableCell, TableRow } from "@mui/material";
import TableStatus from "../../Components/Modules/TableStatus/TableStatus";
import { useState } from "react";
import Grid from "@mui/material/Grid2";

export default function Fund() {
  const columns = [
    "شماره پذیرش",
    "شماره فاکتور",
    "تاریخ فاکتور",
    "تاریخ پذیرش",
    "شماره شاسی",
    "کد ملی",
    "نام و نام خانوادگی مشتری",
    "عملیات",
  ];

  const [page, setPage] = useState(0);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [rows, setRows] = useState([
    {
      admission_number: "400025152",
      invoice_number: "400025152",
      invoice_date: "01/02/03",
      date_of_admission: "01/02/03",
      chassis_number: "154884dfgbh4512445",
      national_code: "1272516628",
      fullname: "لیلا سعیدی",
      actions: "",
    },
    {
      admission_number: "400025153",
      invoice_number: "400025153",
      invoice_date: "02/03/04",
      date_of_admission: "02/03/04",
      chassis_number: "264885afbh5612556",
      national_code: "1272516629",
      fullname: "مهدی رضایی",
      actions: "",
    },
    {
      admission_number: "400025154",
      invoice_number: "400025154",
      invoice_date: "03/04/05",
      date_of_admission: "03/04/05",
      chassis_number: "374886bgbj6712667",
      national_code: "1272516630",
      fullname: "زهرا عباسی",
      actions: "",
    },
    {
      admission_number: "400025155",
      invoice_number: "400025155",
      invoice_date: "04/05/06",
      date_of_admission: "04/05/06",
      chassis_number: "484887chcl7812778",
      national_code: "1272516631",
      fullname: "احمد محمدی",
      actions: "",
    },
    {
      admission_number: "400025156",
      invoice_number: "400025156",
      invoice_date: "05/06/07",
      date_of_admission: "05/06/07",
      chassis_number: "594888didm8912889",
      national_code: "1272516632",
      fullname: "سارا امینی",
      actions: "",
    },
    {
      admission_number: "400025157",
      invoice_number: "400025157",
      invoice_date: "06/07/08",
      date_of_admission: "06/07/08",
      chassis_number: "604889ejdn9012990",
      national_code: "1272516633",
      fullname: "علی حیدری",
      actions: "",
    },
    {
      admission_number: "400025158",
      invoice_number: "400025158",
      invoice_date: "07/08/09",
      date_of_admission: "07/08/09",
      chassis_number: "714890fkep11231011",
      national_code: "1272516634",
      fullname: "فاطمه کاظمی",
      actions: "",
    },
    {
      admission_number: "400025159",
      invoice_number: "400025159",
      invoice_date: "08/09/10",
      date_of_admission: "08/09/10",
      chassis_number: "824891gleq12232122",
      national_code: "1272516635",
      fullname: "محمد حسینی",
      actions: "",
    },
    {
      admission_number: "400025160",
      invoice_number: "400025160",
      invoice_date: "09/10/11",
      date_of_admission: "09/10/11",
      chassis_number: "934892hmfr13233233",
      national_code: "1272516636",
      fullname: "ریحانه یوسفی",
      actions: "",
    },
    {
      admission_number: "400025161",
      invoice_number: "400025161",
      invoice_date: "10/11/12",
      date_of_admission: "10/11/12",
      chassis_number: "044893infs14234344",
      national_code: "1272516637",
      fullname: "عباس شریفی",
      actions: "",
    },
  ]);
  const [filterRows, setFilterRows] = useState([
    {
      admission_number: "400025152",
      invoice_number: "400025152",
      invoice_date: "01/02/03",
      date_of_admission: "01/02/03",
      chassis_number: "154884dfgbh4512445",
      national_code: "1272516628",
      fullname: "لیلا سعیدی",
      actions: "",
    },
    {
      admission_number: "400025153",
      invoice_number: "400025153",
      invoice_date: "02/03/04",
      date_of_admission: "02/03/04",
      chassis_number: "264885afbh5612556",
      national_code: "1272516629",
      fullname: "مهدی رضایی",
      actions: "",
    },
    {
      admission_number: "400025154",
      invoice_number: "400025154",
      invoice_date: "03/04/05",
      date_of_admission: "03/04/05",
      chassis_number: "374886bgbj6712667",
      national_code: "1272516630",
      fullname: "زهرا عباسی",
      actions: "",
    },
    {
      admission_number: "400025155",
      invoice_number: "400025155",
      invoice_date: "04/05/06",
      date_of_admission: "04/05/06",
      chassis_number: "484887chcl7812778",
      national_code: "1272516631",
      fullname: "احمد محمدی",
      actions: "",
    },
    {
      admission_number: "400025156",
      invoice_number: "400025156",
      invoice_date: "05/06/07",
      date_of_admission: "05/06/07",
      chassis_number: "594888didm8912889",
      national_code: "1272516632",
      fullname: "سارا امینی",
      actions: "",
    },
    {
      admission_number: "400025157",
      invoice_number: "400025157",
      invoice_date: "06/07/08",
      date_of_admission: "06/07/08",
      chassis_number: "604889ejdn9012990",
      national_code: "1272516633",
      fullname: "علی حیدری",
      actions: "",
    },
    {
      admission_number: "400025158",
      invoice_number: "400025158",
      invoice_date: "07/08/09",
      date_of_admission: "07/08/09",
      chassis_number: "714890fkep11231011",
      national_code: "1272516634",
      fullname: "فاطمه کاظمی",
      actions: "",
    },
    {
      admission_number: "400025159",
      invoice_number: "400025159",
      invoice_date: "08/09/10",
      date_of_admission: "08/09/10",
      chassis_number: "824891gleq12232122",
      national_code: "1272516635",
      fullname: "محمد حسینی",
      actions: "",
    },
    {
      admission_number: "400025160",
      invoice_number: "400025160",
      invoice_date: "09/10/11",
      date_of_admission: "09/10/11",
      chassis_number: "934892hmfr13233233",
      national_code: "1272516636",
      fullname: "ریحانه یوسفی",
      actions: "",
    },
    {
      admission_number: "400025161",
      invoice_number: "400025161",
      invoice_date: "10/11/12",
      date_of_admission: "10/11/12",
      chassis_number: "044893infs14234344",
      national_code: "1272516637",
      fullname: "عباس شریفی",
      actions: "",
    },
  ]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSerach = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setInputSearch(searchTerm);
    const filterProducts = rows.filter((item) =>
      item.admission_number.includes(searchTerm)
    );
    setFilterRows(filterProducts);
  };

  return (
    <div className="content-conatiner">
      <SideBar />
      <div className="space-content">
        <Header title={"کارتابل صندوق پذیرش :"} />
        <div className={styles.wrapper}>
          <Grid container className={`${styles.wrap_filters}`}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Input
                label={"شماره پذیرش"}
                icon={faMagnifyingGlass}
                value={inputSearch}
                onChange={handleSerach}
                placeholder={"شماره پذیرش"}
                styled={"width"}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container>
                <Grid size={{ xs: 12, sm: 9, md: 8 }}>
                  <Grid container>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <label className={`label_input `}>از تاریخ فاکتور</label>
                      <DataInput value={dateStart} onChange={setDateStart} />
                    </Grid>
                    <Grid ize={{ xs: 12, sm: 6 }}>
                      <label className={`label_input `}>تا تاریخ فاکتور</label>
                      <DataInput value={dateEnd} onChange={setDateEnd} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 3, md: 4 }}
                  className={`${styles.wrap_button} `}
                >
                  <Button2 icon={faMagnifyingGlass} onClick={""}>
                    {"جستجو"}
                  </Button2>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <div className={styles.wrap_table}>
            <TableStatus
              columns={columns}
              rows={rows}
              page={page}
              onChange={handleChangePage}
              rowsPerPage={rowsPerPage}
            >
              {filterRows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                      fontFamily: "iranYekan",
                    }}
                  >
                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                      {row.admission_number}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                      {row.invoice_number}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                      {row.invoice_date}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                      {row.date_of_admission}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                      {row.chassis_number}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                      {row.national_code}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                      {row.fullname}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                      <div className={styles.wrap_btn}>
                        <button className={styles.btn}>مشاهده</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableStatus>
          </div> */}
        </div>
      </div>
    </div>
  );
}
