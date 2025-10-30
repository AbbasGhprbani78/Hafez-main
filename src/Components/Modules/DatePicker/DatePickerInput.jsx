import styles from "./DataPickerStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//MUI Components
import Grid from "@mui/material/Grid2";

//Date Picker Component
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/teal.css";
import opacity from "react-element-popper/animations/opacity";

function DatePickerInput({
  value,
  onChange,
  label,
  name = "datePicker",
  icon,
  placeholder = "",
  onReset,
  labelClass = "label_input",
  minDate,
  maxDate,
  disabled,
}) {
  return (
    <Grid
      item
      container
      size={{ xs: 12 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "0.3rem",
      }}
    >
      {label && (
        <Grid
          item
          size={{ xs: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <label htmlFor={name} className={` ${labelClass}`}>
            {label}
          </label>
        </Grid>
      )}
      <Grid
        item
        container
        size={{ xs: 12 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
        className={styles.date_picker_content_wrapper}
      >
        <Grid
          item
          size={{ xs: 10 }}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            cursor: "pointer",
          }}
          className="date_input"
        >
          <DatePicker
            placeholder={placeholder}
            animations={[opacity()]}
            className="teal"
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            value={value ? value : undefined}
            onChange={onChange}
            format="YYYY/MM/DD"
            onlyShowInPopover={true}
            multiple={false}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              boxShadow: "none",
              width: "100%",
            }}
          />
        </Grid>
        <Grid
          item
          size={{ xs: 2 }}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={value === "" ? "" : onReset}
        >
          {icon && (
            <FontAwesomeIcon
              fontSize={18}
              icon={icon}
              className={
                value !== "" ? styles.icon_input_remove : styles.icon_input_pick
              }
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DatePickerInput;
