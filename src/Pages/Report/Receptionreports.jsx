import { useCallback, useEffect, useMemo, useState } from "react";
import { TableRow, TableCell, Box, CircularProgress } from "@mui/material";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import Grid from "@mui/material/Grid2";
import {
  formatWithThousandSeparators,
  toFarsiNumber,
} from "../../utils/helper";
import styles from "./Report.module.css";
import Input from "../../Components/Modules/Input/Input";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import DateRangeFilter from "../../Components/Modules/DateRangeFilter/DateRangeFilter";
import MultiSelectDropDwon from "../../Components/Modules/MultiSelectDropdown/MultiSelectDropDwon";
import Button2 from "../../Components/Modules/Button2/Button2";
import apiClient from "../../config/axiosConfig";
import { convertGregorianToPersian } from "../../Components/Modules/ChnageDate/ChnageDate";
const columns = [
  "شماره پذیرش",
  "نوع خودرو",
  "اطلاعات خودرو",
  "اطلاعات پذیرش و مشتری",
  "نوع خدمات",
  "سالن",
  "زمان و هزینه تخمینی",
  "زمان تعمیرات (ساعت)",
  "تعمیرگاه",
  "نوقف در سالن (ساعت)",
  "زمان پیش فاکتور (ساعت)",
  "زمان پذیرش تا ترخیص (ساعت)",
  "وضعیت",
];
const pageLength = 10;

const formatDate = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : null;

const defaultFilters = {
  admission_number: null,
  chassis_number: null,
  admission_date_from: null,
  admission_date_to: null,
  release_date_from: null,
  release_date_to: null,
  car_type: [],
  status: [],
  typeof_service: [],
};
export default function Receptionreports() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [receptionFilterData, setReceptionFilterData] = useState({});

  const applyFilter = (data) => {
    setFilters((prev) => ({ ...prev, ...data }));
    setPage(0);
  };

  const handleInputChange = (name, value) => {
    applyFilter({ [name]: value || null });
  };

  const handleMultiSelectChange = (field, selectedOptions) => {
    const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    applyFilter({ [field]: ids });
  };

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

  const statusOptions = useMemo(
    () =>
      receptionFilterData?.reception_status?.map((item) => ({
        value: item.id,
        label: item.value,
      })) || [],
    [receptionFilterData]
  );

  const serviceOptions = useMemo(
    () =>
      receptionFilterData?.type_of_services?.map((item) => ({
        value: item.id,
        label: item.name,
      })) || [],
    [receptionFilterData]
  );

  const carTypeOptions = useMemo(
    () =>
      receptionFilterData?.car_types?.map((item) => ({
        value: item.id,
        label: item.name || item.value,
      })) || [],
    [receptionFilterData]
  );

  const fetchReceptionReports = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: page + 1,
        page_size: pageLength,
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value === null || value === "" || value?.length === 0) return;

        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      });

      const response = await apiClient.get(
        `app/report/reception-reports/?${params.toString()}`
      );

      if (response.status === 200) {
        const data = response.data;

        setTotalRows(data.count || 0);
        const mappedRows = (data.results || []).map((item) => ({
          id: item.admission_number,
          carType: item.second_form?.car_type || "-",
          carInfo: {
            vin: item?.second_form?.chassis_number || "-",
            color: item.second_form?.color || "-",
            plate: item.second_form?.license_plate_number || "-",
            mileage: item.second_form?.mileage || "-",
          },
          customerInfo: {
            name: `${item.owner_first_name || ""} ${
              item.owner_last_name || ""
            }`,
            type: item.form_type || "-",
            acceptTime: item.admission_date || "-",
            deliveryTime: item.duration_estimated || "-",
          },
          services: item.type_of_service?.map((s) => s.name) || [],
          hall: item.salon?.name || "-",
          estimate: {
            time: item.salon?.time || "-",
            cost: item.salon?.cost || "-",
          },
          repairTime: item.repair_time_hours || "-",
          repairShop: "-",
          stopTime: item.stay_in_salon_hours || "-",
          preInvoiceTime: item.pre_invoice_time_hours || "-",
          totalTime: item.total_time_hours || "-",
          status: item.status_display || "-",
        }));

        setRows(mappedRows);
      }
    } catch (error) {
      console.error("خطا در دریافت گزارش:", error);
    }
  }, [filters, page]);

  useEffect(() => {
    getReceptionFilterData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchReceptionReports();
    }, 400);

    return () => clearTimeout(timeout);
  }, [filters, page]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

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
        <Header title={"گزارش پذیرش"} />

        <Box
          sx={{
            margin: "2rem 0",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 2, md: 10, xl: 30 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name="chassis_number"
                label="شماره شاسی :"
                placeholder="شماره شاسی"
                icon={faHashtag}
                value={filters.chassis_number}
                onChange={(e) =>
                  handleInputChange("chassis_number", e.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name="admission_number"
                label="شماره پذیرش :"
                placeholder="شماره پذیرش"
                icon={faHashtag}
                value={filters.admission_number}
                onChange={(e) =>
                  handleInputChange("admission_number", e.target.value)
                }
              />
            </Grid>
          </Grid>
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
              <MultiSelectDropDwon
                label="وضعیت پذیرش"
                onChange={(values) => handleMultiSelectChange("status", values)}
                items={statusOptions}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <MultiSelectDropDwon
                label="نوع خودرو"
                onChange={(values) =>
                  handleMultiSelectChange("car_type", values)
                }
                items={carTypeOptions}
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
                label="نوع خدمات"
                onChange={(values) =>
                  handleMultiSelectChange("typeof_service", values)
                }
                items={serviceOptions}
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
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                fontFamily: "iranYekan !important",
              }}
            >
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.id)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.carType)}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                <div>{toFarsiNumber(`شماره شاسی: ${row.carInfo.vin}`)}</div>
                <div>{toFarsiNumber(`رنگ: ${row.carInfo.color}`)}</div>
                <div>{toFarsiNumber(`پلاک: ${row.carInfo.plate}`)}</div>
                <div>{toFarsiNumber(`کیلومتر: ${row.carInfo.mileage}`)}</div>
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                <div>
                  {toFarsiNumber(`نام مشتری: ${row.customerInfo.name}`)}
                </div>
                <div>{toFarsiNumber(`نوع: ${row.customerInfo.type}`)}</div>
                <div>
                  {toFarsiNumber(
                    `پذیرش: ${convertGregorianToPersian(
                      row.customerInfo.acceptTime
                    )}`
                  )}
                </div>
                <div>
                  {toFarsiNumber(
                    `ترخیص: ${convertGregorianToPersian(
                      row.customerInfo.deliveryTime
                    )}`
                  )}
                </div>
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.services && row.services.length > 0
                  ? toFarsiNumber(row.services.join("، "))
                  : "-"}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.hall)}
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                <div>{toFarsiNumber(`زمان: ${row.estimate.time}`)}</div>
                <div>
                  {toFarsiNumber(
                    `هزینه: ${formatWithThousandSeparators(row.estimate.cost)}`
                  )}
                </div>
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.repairTime)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.repairShop)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.stopTime)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.preInvoiceTime)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.totalTime)}
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  color: "#333",
                  fontWeight: "bold",
                  fontFamily: "iranYekan",
                }}
              >
                {toFarsiNumber(row.status)}
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
            margin: "1rem 0",
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

{
  /* <Grid container sx={{ width: "100%" }}>
          <Grid size={{ xs: 12 }}></Grid>
        </Grid> */
}

// const GetreceptionreportsFilter = async () => {
//   try {
//     const response = await apiClient.get(
//       "app/report/reception-reports/filter/"
//     );
//     if (response.status === 200) {
//       console.log(response);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
