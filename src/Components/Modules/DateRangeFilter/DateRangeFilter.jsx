import { useState } from "react";
import styles from "./DateRangeFilter.module.css";
import DatePicker from "../DatePicker/DatePickerInput";
import {
  faCalendarDays,
  faCalendarXmark,
} from "@fortawesome/free-solid-svg-icons";

//MUI Components
import Grid from "@mui/material/Grid2";

function DateRangeFilter({
  onDateChange,
  startDateProp = "",
  endDateProp = "",
  startLabel = "از تاریخ",
  endLabel = "تا تاریخ",
  startPlaceholder = "۱۴۰۰/۰۱/۰۱",
  endPlaceholder = "۱۴۰۳/۰۱/۰۱",
  spacingxl = 10,
  spacingmd = 10,
  spacingsx = 2,
}) {
  const [startDate, setStartDate] = useState(startDateProp);
  const [endDate, setEndDate] = useState(endDateProp);

  const handleChangeStartDate = (date) => {
    if (!date || !date.year || !date.month || !date.day) return;
    const persianDate = `${date.year}/${date.month.number}/${date.day}`;
    const newStartDate = persianDate;
    setStartDate(newStartDate);

    if (newStartDate !== "" && endDate !== "") {
      onDateChange({ startDate: newStartDate, endDate });
    }
  };

  const handleChangeEndDate = (date) => {
    if (!date || !date.year || !date.month || !date.day) return;
    const persianDate = `${date.year}/${date.month.number}/${date.day}`;
    const newEndDate = persianDate;
    setEndDate(newEndDate);
    if (startDate !== "" && newEndDate !== "") {
      onDateChange({ startDate, endDate: newEndDate });
    }
  };

  const resetDatePicker = (number) => {
    if (number === 1) {
      setStartDate("");
      onDateChange({ startDate: "", endDate });
    } else if (number === 2) {
      setEndDate("");
      onDateChange({ startDate, endDate: "" });
    }
  };

  return (
    <Grid
      item
      container
      size={{ xs: 12 }}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        width: "100%",
      }}
      spacing={{ xs: spacingsx, md: spacingmd, xl: spacingxl }}
    >
      <Grid
        item
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DatePicker
          value={startDate}
          onChange={handleChangeStartDate}
          label={startLabel}
          placeholder={startPlaceholder}
          icon={startDate !== "" ? faCalendarXmark : faCalendarDays}
          onReset={() => resetDatePicker(1)}
        />
      </Grid>
      <Grid
        item
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DatePicker
          value={endDate}
          onChange={handleChangeEndDate}
          label={endLabel}
          placeholder={endPlaceholder}
          icon={endDate !== "" ? faCalendarXmark : faCalendarDays}
          onReset={() => resetDatePicker(2)}
        />
      </Grid>
    </Grid>
  );
}

export default DateRangeFilter;
