import { useState, useEffect } from "react";
import styles from "./RepairCardStyle.module.css";
import { useNavigate } from "react-router-dom";
//Components
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import Input from "../../Components/Modules/Input/Input";
import Button2 from "../../Components/Modules/Button2/Button2";
import DateRangeFilter from "../../Components/Modules/DateRangeFilter/DateRangeFilter";
import LoadingForm from "../../Components/Modules/Loading/LoadingForm";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import { ToastContainerCustom } from "../../Components/Modules/Toast/ToastCustom";
import {
  errorMessage,
  warningMessage,
  successMessage,
} from "../../Components/Modules/Toast/ToastCustom";

//MUI Components
import Grid from "@mui/material/Grid2";
import { Button, TableCell, TableRow } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

//Icons
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../config/axiosConfig";
import { toFarsiNumber } from "../../utils/helper";
import {
  ChnageDate,
  convertPersianToGregorian,
} from "../../Components/Modules/ChnageDate/ChnageDate";

function RepairCardMain() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(undefined);
  const pageLength = 4;

  const [information, setInformation] = useState(undefined);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeAdmissionNumber = (event) => {
    const input = event.target.value;
    const regex = /^[0-9]*$/;
    if (input === "" || regex.test(input)) {
      setAdmissionNumber(input);
      setPage(0);
    } else {
      warningMessage("فقط عدد وارد نمایید!");
    }
  };
  const handleDateRangeChange = ({ startDate, endDate }) => {
    setStartDate(startDate || "");
    setEndDate(endDate || "");
    setPage(0);
  };
  const navigate = useNavigate();

  const handleGoToPaziresh = () => {
    navigate("/paziresh");
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setInformation(undefined);
    const delayFetch = setTimeout(() => {
      fetchCommonData();
    }, 500);

    return () => clearTimeout(delayFetch);
  }, [page, endDate, startDate, admissionNumber]);

  const fetchCommonData = async () => {
    const pageNumber = page + 1;
    let en_start_date = "",
      en_end_date = "";
    if (startDate !== "") {
      en_start_date = convertPersianToGregorian(startDate);
    }
    if (endDate !== "") {
      en_end_date = convertPersianToGregorian(endDate);
    }
    setInformation(undefined);
    try {
      const response = await apiClient.get(
        `/app/get-customer-all-form/?page=${pageNumber}&page_size=${pageLength}&admission_number=${admissionNumber}&from_date=${en_start_date}&to_date=${en_end_date}`
      );
      if (response.status === 200) {
        setInformation(response.data.results);
        setTotalRows(response.data.count);
      }
    } catch (error) {
      errorMessage("خطا در برقراری ارتباط با سرور");
      setInformation([]);
      setTotalRows(0);
    }
  };

  const handleClickOnDownloadExcel = async () => {
    const pageNumner = page + 1;

    let en_start_date = "",
      en_end_date = "";
    if (startDate !== "") {
      en_start_date = convertPersianToGregorian(startDate);
    }
    if (endDate !== "") {
      en_end_date = convertPersianToGregorian(endDate);
    }
    setLoading(true);
    try {
      const response = await apiClient.get(
        `/app/get-customer-all-form/?export=excel`,
        {
          responseType: "blob",
          params: {
            page: pageNumner,
            page_size: pageLength,
            admission_number: admissionNumber,
            from_date: en_start_date,
            to_date: en_end_date,
          },
        }
      );
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "customer_data.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
        successMessage("فایل اکسل مورد نظر دانلود شد!");
      }
    } catch (error) {
      errorMessage("خطا در برقراری ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid className="content-conatiner">
      <SideBar />
      <ToastContainerCustom />
      <Grid
        item
        size={{ xs: 12 }}
        container
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
        minWidth={100}
        gap={{ xs: "1rem", sm: "1.5rem", md: "2rem", lg: "2.5rem", xl: "3rem" }}
        className={`space-content ${styles.wrap_repairs}`}
      >
        <Header title={"لیست پذیرش‌ها:"} handleClick={handleGoToPaziresh} />
        <Grid
          item
          container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            width: "100%",
          }}
          size={{ xs: 12 }}
          spacing={{ xs: 2, md: 6, xl: 10 }}
        >
          <Grid
            item
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Input
              name={"admission_number_input"}
              styled={"admission_number_input"}
              label="شماره پذیرش"
              placeholder="شماره پذیرش"
              icon={faHashtag}
              value={admissionNumber}
              onChange={handleChangeAdmissionNumber}
            />
          </Grid>
          <Grid
            item
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <DateRangeFilter
              onDateChange={handleDateRangeChange}
              startLabel="از تاریخ فاکتور"
              endLabel="تا تاریخ فاکتور"
              spacing={10}
            />
          </Grid>
        </Grid>
        {information === undefined ? (
          <LoadingForm />
        ) : (
          <InfoTabel
            tableInformation={information}
            handleChange={handleChangePage}
            handleExcel={handleClickOnDownloadExcel}
            page={page}
            pageLength={pageLength}
            totalRows={totalRows}
            loading={loading}
          />
        )}
      </Grid>
    </Grid>
  );
}

function InfoTabel({
  tableInformation = [],
  handleChange,
  handleExcel,
  page,
  pageLength = 10,
  totalRows,
  loading,
}) {
  const columns = [
    " شماره پذیرش",
    "شماره فاکتور",
    "تاریخ فاکتور",
    "تاریخ پذیرش",
    "شماره شاسی",
    "کدملی",
    "نام و نام‌خانوادگی مشتری",
    "عملیات",
  ];

  const navigate = useNavigate();
  const handleClickOnView = (id) => {
    navigate(`/repairs/${id}`);
  };

  return (
    <Grid
      container
      item
      size={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      gap={{ xs: "0.6rem" }}
    >
      <Grid
        item
        size={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "flex-start", sm: "flex-end" },
        }}
      >
        <Button2
          onClick={handleExcel}
          disable={tableInformation === undefined || loading}
        >
          {loading ? (
            <CircularProgress size={"20px"} color="success" />
          ) : (
            "دریافت اکسل"
          )}
        </Button2>
      </Grid>
      <TableCustom
        rows={tableInformation}
        columns={columns}
        onChange={handleChange}
        page={page}
        rowsPerPage={pageLength}
        total={totalRows}
      >
        {tableInformation.map((row, index) => (
          <TableRow
            key={index}
            sx={{
              backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
              fontFamily: "iranYekan",
            }}
          >
            <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
              {toFarsiNumber(row.admission_number)}
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
              {toFarsiNumber(row.invoice_number)}
            </TableCell>
            <ChnageDate date={row.invoice_date} />
            <ChnageDate date={row.admission_date} />
            <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
              {row.chassis_number}
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
              {toFarsiNumber(row.national_code_owner)}
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
              {`${row.owner_first_name} ${row.owner_last_name}`}
            </TableCell>
            <TableCell
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                className={`view_btn`}
                variant="contained"
                onClick={() => handleClickOnView(row.form_id)}
              >
                مشاهده
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableCustom>
    </Grid>
  );
}

export default RepairCardMain;
