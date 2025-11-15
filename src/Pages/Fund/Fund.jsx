import Header from "../../Components/Modules/Header/Header";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import styles from "./Fund.module.css";
import DataInput from "../../Components/Modules/DataInput/DataInput";
import Button2 from "../../Components/Modules/Button2/Button2";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Modules/Input/Input";
import { TableCell, TableRow } from "@mui/material";
import TableStatus from "../../Components/Modules/TableStatus/TableStatus";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { toFarsiNumber } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import apiClient from "../../config/axiosConfig";
import { ChnageDate } from "../../Components/Modules/ChnageDate/ChnageDate";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [inputSearch, setInputSearch] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = {
        page: page + 1,
        page_size: rowsPerPage,
      };

      if (inputSearch !== undefined) {
        params.search = inputSearch || undefined;
      }

      if (dateStart) {
        const formatted = new Date(dateStart).toISOString().split("T")[0];
        params.invoice_from = formatted;
      }

      if (dateEnd) {
        const formatted = new Date(dateEnd).toISOString().split("T")[0];
        params.invoice_to = formatted;
      }

      const response = await apiClient.get("app/customers/", { params });

      if (response.status === 200) {
        setRows(response.data.results || []);
        setTotalRows(response.data.count || 0);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setRows([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setPage(0);
    fetchCustomers();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setInputSearch(value);
    setPage(0);
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, rowsPerPage]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setPage(0);
      fetchCustomers();
    }, 600);

    return () => clearTimeout(debounce);
  }, [inputSearch, page, rowsPerPage]);

  useEffect(() => {
    if (!dateStart && !dateEnd) {
      setPage(0);
      fetchCustomers();
    }
  }, [dateStart, dateEnd]);

  return (
    <div className="content-conatiner">
      <SideBar />
      <div className="space-content scroll-contant">
        <Header title={"کارتابل صندوق پذیرش :"} />
        <div className={styles.wrapper}>
          <Grid container className={`${styles.wrap_filters}`} rowSpacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Input
                label={"جستوجو"}
                icon={faMagnifyingGlass}
                value={inputSearch}
                onChange={handleSearch}
                placeholder={
                  "جستجو بر اساس شماره پذیرش، کد ملی، نام مشتری، شماره فاکتور"
                }
                styled={"width"}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container alignItems={"end"}>
                <Grid size={{ xs: 12, sm: 9, md: 8 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <label
                        className={`label_input`}
                        style={{
                          marginBottom: ".3rem",
                          display: "inline-block",
                        }}
                      >
                        از تاریخ فاکتور
                      </label>
                      <DataInput value={dateStart} onChange={setDateStart} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <label
                        className={`label_input`}
                        style={{
                          marginBottom: ".3rem",
                          display: "inline-block",
                        }}
                      >
                        تا تاریخ فاکتور
                      </label>
                      <DataInput value={dateEnd} onChange={setDateEnd} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 3, md: 4 }}
                  className={`${styles.wrap_button}`}
                >
                  <Button2 icon={faMagnifyingGlass} onClick={handleSearchClick}>
                    {"جستجو"}
                  </Button2>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div className={styles.wrap_table}>
            <TableStatus
              Gridumns={columns}
              rows={totalRows}
              page={page}
              onChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              loading={loading}
            >
              {rows.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                    fontFamily: "iranYekan",
                  }}
                >
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(row?.admission_number)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(row?.invoice_number)}
                  </TableCell>
                  <ChnageDate date={row.invoice_date} />
                  <ChnageDate date={row.admission_date} />
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(row?.chassis_number)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(row?.national_code_owner)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {row?.full_name}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    <div
                      className={styles.wrap_btn}
                      onClick={() => navigate(`/fund/${row?.admission_number}`)}
                    >
                      <button className={styles.btn}>مشاهده</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableStatus>
          </div>
        </div>
      </div>
    </div>
  );
}
