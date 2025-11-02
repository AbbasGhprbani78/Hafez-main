import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllForm.module.css";

//Component

import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import {
  successMessage,
  ToastContainerCustom,
} from "../../Components/Modules/Toast/ToastCustom";
import {
  errorMessage,
  warningMessage,
} from "../../Components/Modules/Toast/ToastCustom";
import ReactDropdown from "../../Components/Modules/ReactDropdown/ReactDropdown";

import Input from "../../Components/Modules/Input/Input";
import LoadingForm from "../../Components/Modules/Loading/LoadingForm";
import { InfoTabel } from "../Management/ManagementPage";

//MUI Component
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { Button, TableCell, TableRow, Typography } from "@mui/material";

//Icons
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../config/axiosConfig";
import { toFarsiNumber } from "../../utils/helper";
import Button2 from "../../Components/Modules/Button2/Button2";
import { MyContext } from "../../context/context";
import { ChnageDate } from "../../Components/Modules/ChnageDate/ChnageDate";

export default function AllForm() {
  const { setCurrentTab, setIdForm } = useContext(MyContext);
  const [information, setInformation] = useState(undefined);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [filter, setFilter] = useState(0);

  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const pageLength = 5;

  const handleChangeFilter = (newValue) => {
    setFilter(newValue);
    setPage(0);
  };

  const navigate = useNavigate();

  const handleGoToPaziresh = () => {
    navigate("/paziresh");
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

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

  const fetchCommonData = async () => {
    const pageNumber = page + 1;

    let carStep = null;
    if (filter === 1) {
      carStep = ["done"];
    } else if (filter === 2) {
      carStep = ["one", "two", "three"];
    } else if (filter === 3) {
      carStep = ["two"];
    } else if (filter === 4) {
      carStep = ["expert confirmation"];
    }

    setInformation(undefined);

    try {
      const response = await apiClient.get(`/app/get-admissions-office/`, {
        params: {
          page: pageNumber,
          page_size: pageLength,
          search: admissionNumber,
          step: carStep,
        },
        paramsSerializer: (params) => {
          const query = Object.keys(params)
            .filter((key) => params[key] !== null && params[key] !== undefined)
            .map((key) => {
              if (Array.isArray(params[key])) {
                return params[key]
                  .map(
                    (val) =>
                      `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
                  )
                  .join("&");
              }
              return `${encodeURIComponent(key)}=${encodeURIComponent(
                params[key]
              )}`;
            })
            .join("&");
          return query;
        },
      });

      if (response.status === 200) {
        setInformation(response.data.results);
        setTotalRows(response.data.count);
      }
    } catch (error) {
      warningMessage("خطا در برقراری ارتباط با سرور");
      setInformation([]);
      setTotalRows(0);
    }
  };
  const openFormHandler = (step, id) => {
    setIdForm(id);

    const tabMap = {
      one: 2,
      two: 3,
      "expert confirmation": 3,
      three: 4,
      done: 4,
      "repair card": 4,
      "reception desk": 4,
    };

    setCurrentTab(tabMap[step] ?? 2);
    navigate("/paziresh");
  };

  useEffect(() => {
    if (admissionNumber === "" || admissionNumber === null) {
      fetchCommonData();
    } else {
      const delayFetch = setTimeout(() => {
        fetchCommonData();
      }, 500);

      return () => clearTimeout(delayFetch);
    }
  }, [page, admissionNumber, filter]);

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
        direction={"column"}
        className="space-content "
      >
        <Header title={"کارتابل پذیرش:"} handleClick={handleGoToPaziresh} />
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", lg: "flex-start" },
            alignItems: "flex-end",
            width: "100%",
            padding: {
              xs: ".5rem 0",
              sm: "0.7rem 0",
              md: "0.8rem 0",
              lg: "1rem 0 ",
              xl: "1.2rem 0",
            },
            gap: { xs: "1rem", sm: "0" },
          }}
          size={{ xs: 12 }}
          className={styles.border_bottom}
        >
          <Grid
            size={{ xs: 12, sm: 6, md: 5, lg: 4 }}
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
              label="شماره پذیرش:"
              placeholder="شماره پذیرش"
              icon={faHashtag}
              value={admissionNumber}
              onChange={handleChangeAdmissionNumber}
            />
          </Grid>
          <Grid
            container
            size={{ xs: 12, sm: 6 }}
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
              alignItems: "flex-start",
              width: "100%",
              flexDirection: "column",
            }}
            paddingRight={{ xs: "0", sm: "1rem", md: "0" }}
          >
            <Typography
              sx={{ marginBottom: ".5rem" }}
              className={`${styles.label_dropdown}`}
              variant="body2"
            >
              فیلتر براساس:
            </Typography>
            <ReactDropdown
              optionsProp={filterItems}
              handleChange={handleChangeFilter}
              mainValue={filter}
            />
          </Grid>
        </Grid>
        <Grid
          container
          size={12}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: { md: "center", lg: "flex-start" },
            alignItems: "center",
            width: "100%",
            gap: { sm: "1rem", md: "1.2rem", lg: "1.4rem" },
            paddingTop: { xs: "0", md: "0.8rem ", lg: "1rem", xl: "1.2rem" },
          }}
        >
          {filterItems.map((item, index) => (
            <Button
              onClick={() => handleChangeFilter(item.value)}
              aria-label={item.tabNameEn}
              key={index}
              variant="contained"
              className={` ${
                filter === item.value ? styles.active_btn : styles.manual_btn
              }`}
            >
              {item.label}
            </Button>
          ))}
        </Grid>
        <Box
          sx={{
            width: "100%",
            paddingTop: {
              xs: ".5rem ",
              sm: "0.7rem",
              md: "0.8rem ",
              lg: "1rem",
              xl: "1.2rem",
            },
          }}
        >
          {information === undefined ? (
            <LoadingForm />
          ) : (
            <InfoTabel
              tableInformation={information}
              page={page}
              handleChange={handleChangePage}
              totalRows={totalRows}
              pageLength={pageLength}
              columnsTitle={columnsAcceptance}
              key={41}
            >
              {information.length > 0 ? (
                information.map((row, index) => (
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
                      {toFarsiNumber(row.pyramid_number)}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {toFarsiNumber(row.car_model)}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {row.chassis_number}
                    </TableCell>
                    <ChnageDate date={row.admission_date} />
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {toFarsiNumber(row.license_plate_number)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "iranYekan",
                        padding: "19px",
                      }}
                    >
                      <div
                        className={`${styles.status_btn} ${
                          row.step === "done" ||
                          row.step === "repair card" ||
                          row.step === "reception desk"
                            ? styles.status_none
                            : ["one", "two", "three"].includes(row.step)
                            ? styles.status_one
                            : row.step === "expert confirmation"
                            ? styles.status_three
                            : ""
                        }`}
                      >
                        {{
                          done: "اتمام پذیرش",
                          one: "ناتمام",
                          two: "ناتمام",
                          three: "ناتمام",
                          "expert confirmation": "در انتظار تاییدیه کارشناس",
                          "repair card": "اتمام پذیرش",
                          "reception desk": "اتمام پذیرش",
                        }[row.step] ?? "نامشخص"}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <Button2
                        onClick={() => openFormHandler(row.step, row.id)}
                      >
                        مشاهده
                      </Button2>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </InfoTabel>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

const columnsAcceptance = [
  "شماره پذیرش",
  "شماره هرم",
  "نوع خودرو",
  "شماره شاسی",
  "تاریخ پذیرش",
  "پلاک خودرو",
  "وضعیت پذیرش",
  "",
];
const filterItems = [
  { value: 0, label: "همه", tabNameEn: "all" },
  { value: 1, label: "فرم‌های تکمیل‌شده", tabNameEn: "completed" },
  { value: 2, label: "فرم‌های ناتمام", tabNameEn: "unfinished" },
  // { value: 3, label: "برگشتی", tabNameEn: "returned" },
  { value: 4, label: "در انتظار تایید کارشناس", tabNameEn: "pending approval" },
];

//  styles.status_two
// styles.status_three
