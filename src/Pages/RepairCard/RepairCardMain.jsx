import { useState, useEffect } from "react";
import styles from "./RepairCardStyle.module.css";
import { useNavigate } from "react-router-dom";
//Components
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import Input from "../../Components/Modules/Input/Input";
import Button2 from "../../Components/Modules/Button2/Button2";
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
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../config/axiosConfig";
import { toFarsiNumber } from "../../utils/helper";
import {
  ChnageDate,
  convertPersianToGregorian,
} from "../../Components/Modules/ChnageDate/ChnageDate";
import DataInput from "../../Components/Modules/DataInput/DataInput";

function RepairCardMain() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(undefined);
  const pageLength = 4;

  const [information, setInformation] = useState([]);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
  const navigate = useNavigate();

  const handleGoToPaziresh = () => {
    navigate("/admission");
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const fetchCommonData = async () => {
    const pageNumber = page + 1;

    const formatDate = (date) =>
      date ? new Date(date).toISOString().split("T")[0] : "";

    const en_start_date = formatDate(startDate);
    const en_end_date = formatDate(endDate);

    setInformation([]);
    try {
      const response = await apiClient.get("/app/get-customer-all-form/", {
        params: {
          page: pageNumber,
          page_size: pageLength,
          admission_number: admissionNumber,
          from_date: en_start_date,
          to_date: en_end_date,
        },
      });

      if (response.status === 200) {
        setInformation(response.data.results || []);

        setTotalRows(response.data.count || 0);
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

  const handleSearchNow = () => {
    setPage(0);
    fetchCommonData();
  };

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchCommonData();
    }, 500);

    return () => clearTimeout(delayFetch);
  }, [admissionNumber, page]);

  useEffect(() => {
    if (startDate === null && endDate === null) {
      setPage(0);
      fetchCommonData();
    }
  }, [startDate, endDate]);

  return (
    <Grid className="content-conatiner">
      <SideBar />
      <ToastContainerCustom />
      <Grid
        size={{ xs: 12 }}
        container
        sx={{
          width: "100%",
        }}
        minWidth={100}
        className="space-content scroll-contant"
        gap={{ xs: "1rem", sm: "1.5rem", md: "2rem", lg: "2.5rem", xl: "3rem" }}
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
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container alignItems={"end"}>
              <Grid size={{ xs: 12, sm: 9, md: 8 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <label
                      className="label_input"
                      style={{ marginBottom: ".3rem", display: "inline-block" }}
                    >
                      از تاریخ پذیرش
                    </label>
                    <DataInput value={startDate} onChange={setStartDate} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <label
                      className="label_input"
                      style={{ marginBottom: ".3rem", display: "inline-block" }}
                    >
                      تا تاریخ پذیرش
                    </label>
                    <DataInput value={endDate} onChange={setEndDate} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 3, md: 4 }}
                className={`${styles.wrap_button}`}
              >
                <Button2 icon={faMagnifyingGlass} onClick={handleSearchNow}>
                  {"جستجو"}
                </Button2>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <InfoTabel
          tableInformation={information}
          handleChange={handleChangePage}
          handleExcel={handleClickOnDownloadExcel}
          page={page}
          pageLength={pageLength}
          totalRows={totalRows}
          loading={loading}
        />
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
        {tableInformation?.map((row, index) => (
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

{
  /* <ChnageDate date={row.invoice_date} />*/
}
