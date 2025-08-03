import { useState, useEffect } from "react";
import styles from "./RepairCardStyle.module.css";
import { useNavigate } from "react-router-dom";
import moment from "jalali-moment";

//Components
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import Input from "../../Components/Modules/Input/Input";
import Button2 from "../../Components/Modules/Button2/Button2";
import DatePicker from "../../Components/Modules/DatePicker/DatePickerInput";
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
import {
  faHashtag,
  faCalendarDays,
  faCalendarXmark,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../config/axiosConfig";

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
  const handleChangeStartDate = (date) => {
    const persianDate = `${date.year}/${date.month.number}/${date.day}`;
    setStartDate(persianDate);
    setPage(0);
  };
  const handleChangeEndtDate = (date) => {
    const persianDate = `${date.year}/${date.month.number}/${date.day}`;
    setEndDate(persianDate);
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
    if (startDate === null && endDate === null && admissionNumber === null) {
      fetchCommonData();
    } else {
      setInformation(undefined);
      const delayFetch = setTimeout(() => {
        fetchCommonData();
      }, 500);

      return () => clearTimeout(delayFetch);
    }
  }, [page, endDate, startDate, admissionNumber]);

  const fetchCommonData = async () => {
    const pageNumber = page + 1;

    let en_start_date = "",
      en_end_date = "";
    if (startDate !== "") {
      en_start_date = convertPersianToGregorian(startDate);
      console.log(en_start_date);
    }
    if (endDate !== "") {
      en_end_date = convertPersianToGregorian(endDate);
      console.log(en_end_date);
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

  const resetDatePicker = (number) => {
    if (number === 1) {
      setStartDate("");
    } else if (number === 2) {
      setEndDate("");
    }
  };
  const handleClickOnDownloadExcel = async () => {
    const pageNumner = page + 1;

    let en_start_date = "",
      en_end_date = "";
    if (startDate !== "") {
      en_start_date = convertPersianToGregorian(startDate);
      console.log(en_start_date);
    }
    if (endDate !== "") {
      en_end_date = convertPersianToGregorian(endDate);
      console.log(en_end_date);
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
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: { xs: "flex-start", md: "center" },
            width: "100%",
          }}
          gap={{ xs: "0.75rem", sm: "0" }}
          size={{ xs: 12 }}
        >
          <Grid
            item
            size={{ xs: 12, sm: 4, md: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            paddingLeft={{
              xs: "0",
              sm: "1rem",
              md: "2rem",
              lg: "4rem",
              xl: "5rem",
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
            container
            size={{ xs: 12, sm: 8, md: 8 }}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Grid
              item
              size={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              paddingLeft={{
                xs: "0.75rem",
                sm: "0.5rem",
                md: "1rem",
                lg: "2rem",
                xl: "2.5rem",
              }}
            >
              <DatePicker
                value={startDate}
                onChange={handleChangeStartDate}
                label={"از تاریخ فاکتور"}
                placeholder="۱۴۰۰/۰۱/۰۱"
                icon={startDate !== "" ? faCalendarXmark : faCalendarDays}
                onReset={() => resetDatePicker(1)}
              />
            </Grid>
            <Grid
              item
              size={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              paddingRight={{
                xs: "0.75rem",
                sm: "0.5rem",
                md: "1rem",
                lg: "2rem",
                xl: "2.5rem",
              }}
            >
              <DatePicker
                value={endDate}
                onChange={handleChangeEndtDate}
                label={"تا تاریخ فاکتور"}
                placeholder="۱۴۰۳/۰۱/۰۱"
                icon={endDate !== "" ? faCalendarXmark : faCalendarDays}
                onReset={() => resetDatePicker(2)}
              />
            </Grid>
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
            <TableCell sx={{ fontFamily: "iranYekan" }}>
              {row.admission_number}
            </TableCell>
            <TableCell sx={{ fontFamily: "iranYekan" }}>
              {row.invoice_number}
            </TableCell>
            <ShowConvertedData date={row.invoice_date} />
            <ShowConvertedData date={row.admission_date} />
            <TableCell sx={{ fontFamily: "iranYekan" }}>
              {row.chassis_number}
            </TableCell>
            <TableCell sx={{ fontFamily: "iranYekan" }}>
              {row.national_code_owner}
            </TableCell>
            <TableCell sx={{ fontFamily: "iranYekan" }}>
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
export function ShowConvertedData({ date }) {
  const [persianDate, setPersianDate] = useState("");
  useEffect(() => {
    const gregorianDate = date?.slice(0, 10);
    const convert = convertGregorianToPersian(gregorianDate);
    setPersianDate(convert);
  }, [date]);
  return <TableCell sx={{ fontFamily: "iranYekan" }}>{persianDate}</TableCell>;
}

export default RepairCardMain;

export function convertPersianToGregorian(persianDate) {
  const m = moment.from(persianDate, "fa", "YYYY/MM/DD");
  if (m.isValid()) {
    return m.locale("en").format("YYYY-MM-DD");
  } else {
    return "Invalid Persian Date";
  }
}
export function convertGregorianToPersian(gregorianDate) {
  if (!gregorianDate || typeof gregorianDate !== "string") {
    return "Invalid Date";
  }
  // Expecting format yyyy-mm-dd
  const [year, month, day] = gregorianDate.split("-");
  const formattedDate = `${year}-${month}-${day}`; // Moment expects yyyy-mm-dd format

  const m = moment(formattedDate, "YYYY-MM-DD");
  if (m.isValid()) {
    return m.locale("fa").format("YYYY/MM/DD");
  } else {
    return "Invalid Gregorian Date";
  }
}
