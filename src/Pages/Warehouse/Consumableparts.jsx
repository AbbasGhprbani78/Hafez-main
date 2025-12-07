import { useCallback, useEffect, useState } from "react";
import Button2 from "../../Components/Modules/Button2/Button2";
import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
import {
  formatWithThousandSeparators,
  toFarsiNumber,
} from "../../utils/helper";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Modules/Input/Input";
import Grid from "@mui/material/Grid2";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import DateRangeFilter from "../../Components/Modules/DateRangeFilter/DateRangeFilter";
import apiClient from "../../config/axiosConfig";
import SelectDropDown2 from "../../Components/Modules/SelectDropDown2/SelectDropDown2";
import { ChnageDate } from "../../Components/Modules/ChnageDate/ChnageDate";
//مصرف قطعات

const columns = [
  "کد قطعه",
  "شرح قطعه",
  "نوع خودرو",
  "شماره موتور",
  "تاریخ پذیرش",
  "تاریخ ترخیص",
  "تعداد",
  "سریال قطعه",
  "اجرت",
  "تعداد مصرف",
];
const pageLength = 10;
const formatDate = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : null;

export default function Consumableparts() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [parts, setParts] = useState([]);
  const [filters, setFilters] = useState({
    admission_date_from: null,
    admission_date_to: null,
    release_date_from: null,
    release_date_to: null,
    piece_code: "",
    piece_description: "",
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

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getPartsOptions = async () => {
    try {
      const resposne = await apiClient.get(
        "app/api/consumable-parts-filter-options/"
      );
      if (resposne.status === 200) {
        const allParts =
          resposne.data?.pieces?.map((item) => ({
            value_id: item.id,
            value: item.name || item.value,
          })) || [];

        setParts(allParts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPartsdata = useCallback(async () => {
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
        `app/api/consumable-parts-report/?${params.toString()}`
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPartsdata();
    }, 500);

    return () => clearTimeout(timeout);
  }, [filters, page]);

  useEffect(() => {
    getPartsOptions();
  }, []);

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
        <Header title={"مصرف قطعات"} />
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
              <SelectDropDown2
                label="کد قطعه / سریال قطعه :"
                items={parts}
                name="piece_code"
                placeHolder={"قطعه را انتخاب یا وارد کنید"}
                isDesirableValue={false}
                onChange={handleChange}
                value={filters.piece_code}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name={"admission_number"}
                label="شرح قطعه :"
                placeholder="شرح قطعه"
                value={filters.piece_description}
                onChange={(e) =>
                  handleInputChange("piece_description", e.target.value)
                }
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
          {rows?.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                fontFamily: "iranYekan !important",
              }}
            >
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(`${row?.piece_code}`)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row?.piece_description)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row?.car_type)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row?.engine_number)}
              </TableCell>

              <ChnageDate date={row?.admission_date} />
              <ChnageDate date={row?.release_date} />
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row?.count)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row?.piece_serial)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(formatWithThousandSeparators(row?.wage))}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row?.consumption_count)}
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
