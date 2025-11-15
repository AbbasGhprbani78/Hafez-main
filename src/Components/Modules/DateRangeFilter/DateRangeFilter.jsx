import { useState } from "react";

//MUI Components
import Grid from "@mui/material/Grid2";
import DataInput from "../DataInput/DataInput";

function DateRangeFilter({
  onDateChange,
  startDateProp = "",
  endDateProp = "",
  startLabel = "از تاریخ",
  endLabel = "تا تاریخ",
  spacingxl = 10,
  spacingmd = 10,
  spacingsx = 2,
}) {
  const [startDate, setStartDate] = useState(startDateProp);
  const [endDate, setEndDate] = useState(endDateProp);

  const handleChangeStartDate = (persianDateString) => {
    setStartDate(persianDateString);

    if (persianDateString && endDate) {
      onDateChange({ startDate: persianDateString, endDate });
    } else if (!persianDateString) {
      onDateChange({ startDate: "", endDate });
    }
  };

  const handleChangeEndDate = (persianDateString) => {
    setEndDate(persianDateString);

    if (startDate && persianDateString) {
      onDateChange({ startDate, endDate: persianDateString });
    } else if (!persianDateString) {
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
          flexDirection: "column",
        }}
      >
        <label
          className={`label_input`}
          style={{
            marginBottom: ".3rem",
            display: "inline-block",
          }}
        >
          {startLabel}
        </label>
        <DataInput value={startDate} onChange={handleChangeStartDate} />
      </Grid>
      <Grid
        item
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label
          className={`label_input`}
          style={{
            marginBottom: ".3rem",
            display: "inline-block",
          }}
        >
          {endLabel}
        </label>
        <DataInput value={endDate} onChange={handleChangeEndDate} />
      </Grid>
    </Grid>
  );
}

export default DateRangeFilter;
