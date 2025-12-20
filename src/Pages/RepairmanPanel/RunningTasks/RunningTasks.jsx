import TitleWithSearch from "../../../Components/Modules/TitleWithSearch/TitleWithSearch";
import TableCustom from "../../../Components/Modules/TableCustom/TableCustom";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./RunningTasks.module.css";
import { errorMessage } from "../../../Components/Modules/Toast/ToastCustom";
import apiClient from "../../../config/axiosConfig";
import { ChnageDate } from "../../../Components/Modules/ChnageDate/ChnageDate";
import Grid from "@mui/material/Grid2";
import DateRangeFilter from "../../../Components/Modules/DateRangeFilter/DateRangeFilter";

export default function RunningTasks() {
  const columns = [
    "عنوان",
    "تاریخ شروع",
    "تاریخ پایان",
    "تاریخ ایجاد تسک ",
    "وضعیت تعمیر",
  ];

  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const rowsPerPage = 5;

  const debounceTimeoutRef = useRef(null);

  const [filters, setFilters] = useState({
    start_date_from: null,
    start_date_to: null,
    due_date_from: null,
    due_date_to: null,
  });

  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : null;

  const fetchData = useCallback(
    async (currentPage, currentSearch, currentFilters) => {
      setLoading(true);
      try {
        const params = {
          page: currentPage + 1,
          page_size: rowsPerPage,
        };

        if (currentSearch && currentSearch.trim()) {
          params.search = currentSearch.trim();
        }

        if (currentFilters?.start_date_from) {
          params.start_date_from = currentFilters.start_date_from;
        }

        if (currentFilters?.start_date_to) {
          params.start_date_to = currentFilters.start_date_to;
        }

        if (currentFilters?.due_date_from) {
          params.due_date_from = currentFilters.due_date_from;
        }

        if (currentFilters?.due_date_to) {
          params.due_date_to = currentFilters.due_date_to;
        }

        const response = await apiClient.get("/app/api/tasks/", { params });

        if (response.status === 200) {
          setRows(response.data.results || []);
          setTotalRows(response.data.count || 0);
        }
      } catch (error) {
        errorMessage("خطا در دریافت داده ها");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(0, "", filters);
  }, []);

  useEffect(() => {
    fetchData(page, searchInput, filters);
  }, [page]);

  useEffect(() => {
    setPage(0);
    fetchData(0, searchInput, filters);
  }, [filters]);

  const handleChangeSearchField = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setPage(0);
      fetchData(0, value, filters);
    }, 500);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleAdmissionDateChange = ({ startDate, endDate }) => {
    setFilters((prev) => ({
      ...prev,
      start_date_from: formatDate(startDate),
      start_date_to: formatDate(endDate),
    }));
  };

  const handleReleaseDateChange = ({ startDate, endDate }) => {
    setFilters((prev) => ({
      ...prev,
      due_date_from: formatDate(startDate),
      due_date_to: formatDate(endDate),
    }));
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          margin: "1rem 0",
        }}
      >
        <TitleWithSearch
          searchInput={searchInput}
          onChange={handleChangeSearchField}
          title={"تسک های درحال اجرا"}
          isbackButton={false}
          placeholder="جستوجو براساس عنوان"
        />
        <Grid container sx={{ width: "100%" }}>
          <Grid size={{ xs: 12 }}>
            <DateRangeFilter
              onDateChange={handleAdmissionDateChange}
              startLabel="از تاریخ شروع"
              endLabel="تا تاریخ شروع"
              startDateProp={filters.start_date_from}
              endDateProp={filters.start_date_to}
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
              startLabel="از تاریخ پایان"
              endLabel="تا تاریخ پایان"
              startDateProp={filters.due_date_from}
              endDateProp={filters.due_date_to}
              spacingxl={30}
              spacingmd={10}
              spacingsx={2}
            />
          </Grid>
        </Grid>
      </Box>

      <TableCustom
        rows={totalRows}
        columns={columns}
        onChange={handleChangePage}
        page={page}
        rowsPerPage={rowsPerPage}
        total={totalRows}
        maxHeight={"70vh"}
        loading={loading}
      >
        {rows.length > 0 ? (
          rows.map((row, index) => (
            <TableRow
              key={row.id || index}
              sx={{
                backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                fontFamily: "iranYekan",
              }}
            >
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row?.title}
              </TableCell>
              <ChnageDate date={row?.start_date} />
              <ChnageDate date={row?.completed_date} />
              <ChnageDate date={row?.created_at} />
              <TableCell
                align="center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className={`${styles.status_btn} ${
                    row.status === "pending"
                      ? styles.status_pending
                      : row.status === "in_progress"
                      ? styles.status_in_progress
                      : row.status === "completed"
                      ? styles.status_completed
                      : row.status === "cancelled"
                      ? styles.status_cancelled
                      : row.status === "on_hold"
                      ? styles.status_on_hold
                      : styles.status_pending
                  }`}
                >
                  {row.status === "pending"
                    ? "در انتظار"
                    : row.status === "in_progress"
                    ? "در حال انجام"
                    : row.status === "completed"
                    ? "تکمیل شده"
                    : row.status === "cancelled"
                    ? "لغو شده"
                    : row.status === "on_hold"
                    ? "معلق"
                    : "نامشخص"}
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <Typography style={{ fontFamily: "iranYekan" }} variant="body2">
            داده‌ای برای نمایش وجود ندارد.
          </Typography>
        )}
      </TableCustom>
    </>
  );
}
