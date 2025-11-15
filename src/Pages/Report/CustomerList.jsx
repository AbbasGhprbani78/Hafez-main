import { useCallback, useEffect, useState } from "react";
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
import apiClient from "../../config/axiosConfig";
import { ChnageDate } from "../../Components/Modules/ChnageDate/ChnageDate";

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
const pageLength = 10;
const formatDate = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : null;

export default function CustomerList() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [receptionFilterData, setReceptionFilterData] = useState({});

  const [filters, setFilters] = useState({
    admission_date_from: null,
    admission_date_to: null,
    release_date_from: null,
    release_date_to: null,
    national_code: "",
    owner_name: "",
    car_type: [],
  });

  const applyFilter = (updater) => {
    setFilters((prev) =>
      typeof updater === "function" ? updater(prev) : { ...prev, ...updater }
    );
    setPage(0);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const getReceptionFilterData = async () => {
    try {
      const response = await apiClient.get("app/reception-filter-data/");
      if (response.status === 200) {
        setReceptionFilterData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomers = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: page + 1,
        page_size: pageLength,
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value == null || value === "" || value?.length === 0) return;

        if (Array.isArray(value)) {
          value.forEach((item) => params.append(key, item));
        } else {
          params.append(key, value);
        }
      });

      const response = await apiClient.get(
        `app/api/customers/?${params.toString()}`
      );

      if (response.status === 200) {
        const data = response.data;
        setTotalRows(data.count || 0);
        setRows(data.results);
      }
    } catch (error) {
      console.error("خطا در دریافت لیست مشتریان:", error);
    }
  }, [filters, page]);

  const handleAdmissionDateChange = ({ startDate, endDate }) => {
    applyFilter({
      admission_date_from: formatDate(startDate),
      admission_date_to: formatDate(endDate),
    });
  };

  const handleReleaseDateChange = ({ startDate, endDate }) => {
    applyFilter({
      release_date_from: formatDate(startDate),
      release_date_to: formatDate(endDate),
    });
  };

  const handleInputChange = (name, value) => {
    applyFilter({ [name]: value });
  };

  const handleCarTypeChange = (field, selectedOptions) => {
    const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    applyFilter({ [field]: ids });
  };

  const carTypeOptions =
    receptionFilterData?.car_types?.map((item) => ({
      value: item.id,
      label: item.name || item.value,
    })) || [];

  useEffect(() => {
    getReceptionFilterData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCustomers();
    }, 500);

    return () => clearTimeout(timeout);
  }, [filters, page]);
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
                onDateChange={handleAdmissionDateChange}
                startLabel="از تاریخ پذیرش"
                endLabel="تا تاریخ پذیرش"
                startDateProp={filters.admission_date_from}
                endDateProp={filters.admission_date_to}
                spacingxl={30}
                spacingmd={10}
                spacingsx={2}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ width: "100%" }}>
            <Grid size={{ xs: 12 }}>
              <DateRangeFilter
                onDateChange={handleReleaseDateChange}
                startLabel="از تاریخ ترخیص"
                endLabel="تا تاریخ ترخیص"
                startDateProp={filters.release_date_from}
                endDateProp={filters.release_date_to}
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
                name="national_code"
                label="کد ملی :"
                placeholder="کد ملی"
                icon={faHashtag}
                value={filters.national_code}
                onChange={(e) =>
                  handleInputChange("national_code", e.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name="owner_name"
                label="نام مشتری :"
                placeholder="نام مشتری"
                icon={faHashtag}
                value={filters.owner_name}
                onChange={(e) =>
                  handleInputChange("owner_name", e.target.value)
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 2, md: 10, xl: 30 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <MultiSelectDropDwon
                label="نوع خودرو"
                onChange={(values) => handleCarTypeChange("car_type", values)}
                items={carTypeOptions}
              />
            </Grid>
          </Grid>
        </Box>
        <TableCustom
          rows={totalRows}
          columns={columns}
          onChange={handleChangePage}
          page={page}
          rowsPerPage={pageLength}
          total={totalRows}
        >
          {rows?.length > 0 &&
            rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                  fontFamily: "iranYekan !important",
                }}
              >
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(row?.id)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(row?.customer_name)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(row?.national_code)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(row?.phone_number)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(row?.car_type)}
                </TableCell>
                <ChnageDate date={row?.admission_date} />
                <ChnageDate date={row?.release_date} />
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(row?.total_invoice)}
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
