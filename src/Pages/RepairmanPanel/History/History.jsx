import { useState, useEffect, useRef, useCallback } from "react";
import TitleWithSearch from "../../../Components/Modules/TitleWithSearch/TitleWithSearch";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import TableCustom from "../../../Components/Modules/TableCustom/TableCustom";
import { errorMessage } from "../../../Components/Modules/Toast/ToastCustom";
import apiClient from "../../../config/axiosConfig";
import { ChnageDate } from "../../../Components/Modules/ChnageDate/ChnageDate";
import { toFarsiNumber } from "../../../utils/helper";
import Grid from "@mui/material/Grid2";
import DateRangeFilter from "../../../Components/Modules/DateRangeFilter/DateRangeFilter";

export default function History() {
  const columns = [
    "شماره پذیرش",
    "مدل ماشین",
    "تاریخ شروع",
    "تاریخ پایان",
    "تاریخ پذیرش",
    "وضعیت تعمیر",
  ];
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState([]);
  const rowsPerPage = 5;
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const debounceTimeoutRef = useRef(null);

  const [filters, setFilters] = useState({
    admission_date_from: null,
    admission_date_to: null,
    start_date_from: null,
    end_date_to: null,
  });

  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : null;

  const getHistoryrepairman = useCallback(
    async (currentPage, currentSearch, currentFilters) => {
      setLoading(true);
      try {
        const params = {
          page: currentPage + 1,
          page_size: rowsPerPage,
        };

        if (currentSearch && currentSearch.trim()) {
          params.query = currentSearch.trim();
        }

        if (currentFilters?.admission_date_from) {
          params.admission_date_from = currentFilters.admission_date_from;
        }

        if (currentFilters?.admission_date_to) {
          params.admission_date_to = currentFilters.admission_date_to;
        }

        if (currentFilters?.start_date_from) {
          params.start_date_from = currentFilters.start_date_from;
        }

        if (currentFilters?.end_date_to) {
          params.end_date_to = currentFilters.end_date_to;
        }

        const response = await apiClient.get("app/api/repair-history/", {
          params,
        });

        if (response.status === 200) {
          setRows(response.data.results || []);
          setTotalRows(response.data.count || 0);
        }
      } catch (error) {
        errorMessage("خطا در دریافت اطلاعات");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getHistoryrepairman(0, "", filters);
  }, []);

  useEffect(() => {
    getHistoryrepairman(page, searchInput, filters);
  }, [page]);

  useEffect(() => {
    setPage(0);
    getHistoryrepairman(0, searchInput, filters);
  }, [filters]);

  const handleChangeSearchField = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setPage(0);
      getHistoryrepairman(0, value, filters);
    }, 500);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleAdmissionDateChange = ({ startDate, endDate }) => {
    setFilters((prev) => ({
      ...prev,
      admission_date_from: formatDate(startDate),
      admission_date_to: formatDate(endDate),
    }));
  };

  const handleRepairDateChange = ({ startDate, endDate }) => {
    setFilters((prev) => ({
      ...prev,
      start_date_from: formatDate(startDate),
      end_date_to: formatDate(endDate),
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
          title={"سوابق"}
          placeholder="جستوجو بر اساس شماره پذیرش و مدل ماشین"
        />
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
              onDateChange={handleRepairDateChange}
              startLabel="از تاریخ شروع تعمیر"
              endLabel="تا تاریخ پایان تعمیر"
              startDateProp={filters.start_date_from}
              endDateProp={filters.end_date_to}
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
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                fontFamily: "iranYekan",
              }}
            >
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row?.admission_number)}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {row.car_model}
              </TableCell>
              <ChnageDate date={row?.start_date} />

              <ChnageDate date={row?.end_date} />
              <ChnageDate date={row?.admission_date} />

              <TableCell
                align="center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{ width: "180px" }}
                  className={`status_btn ${
                    row.status === "none"
                      ? "status_none"
                      : row.status === "one"
                      ? "status_one"
                      : row.status === "two"
                      ? "status_two"
                      : row.status === "three"
                      ? "status_three"
                      : row.status === "repair card"
                      ? "status_repair_card"
                      : row.status === "reception desk"
                      ? "status_reception_desk"
                      : row.status === "done"
                      ? "status_done"
                      : row.status === "cancelled"
                      ? "status_cancelled"
                      : row.status === "expert confirmation"
                      ? "status_expert_confirmation"
                      : row.status === "awaiting expert approval"
                      ? "status_awaiting_expert"
                      : "status_none" // fallback
                  }`}
                >
                  {row.status === "none"
                    ? "هیچ‌کدام"
                    : row.status === "one"
                    ? "مرحله یک"
                    : row.status === "two"
                    ? "مرحله دو"
                    : row.status === "three"
                    ? "مرحله سه"
                    : row.status === "repair card"
                    ? "در حال تعمیر"
                    : row.status === "reception desk"
                    ? "میز پذیرش"
                    : row.status === "done"
                    ? "اتمام تعمیر"
                    : row.status === "cancelled"
                    ? "لغو شده"
                    : row.status === "expert confirmation"
                    ? "تایید کارشناس"
                    : row.status === "awaiting expert approval"
                    ? "در انتظار تایید کارشناس"
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

{
  /* 
                'none': 'هیچ‌کدام',
                'one': 'مرحله یک',
                'two': 'مرحله دو',
                'three': 'مرحله سه',
                'repair card': 'در حال تعمیر',
                'reception desk': 'میز پذیرش',
                'done': 'اتمام تعمیر',
                'cancelled': 'لغو شده',
                'expert confirmation': 'تایید کارشناس',
                'awaiting expert approval': 'در انتظار تایید کارشناس'
 */
}
