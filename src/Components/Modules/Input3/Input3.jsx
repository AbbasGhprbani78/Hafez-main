import styles from "./Input3Styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDropdown from "../ReactDropdown/ReactDropdown";

//MUI Components
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

function Input3({
  id = "input_id",
  name = "input",
  lable = "lable",
  value,
  handleChange,
  type = "text",
  placeholder = "placeholder",
  helperText = "",
  icon,
  styleInput,
  styled,
  isTextAarea = false,
  textAareaRows = 5,
}) {
  return (
    <Grid
      item
      size={12}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: { xs: ".2rem" },
      }}
      className={`${styles.input_container} ${styles[styleInput]} ${styles[styled]}`}
    >
      {lable && <Typography className={styles.label_input}>{lable}</Typography>}
      {isTextAarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          placeholder={placeholder}
          className={styles.textfield_form_modal}
          rows={textAareaRows}
        />
      ) : (
        <Grid
          item
          size={12}
          className={styles.input_content_wrapper}
          gap={"10px"}
        >
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            autoComplete="off"
            placeholder={placeholder}
            className={styles.input_form}
          />
          {icon && (
            <FontAwesomeIcon icon={icon} className={styles.icon_input} />
          )}
        </Grid>
      )}
      {helperText && (
        <Typography className={styles.helper_text_input}>
          {helperText}
        </Typography>
      )}
    </Grid>
  );
}

export default Input3;

export function FullReactDropDown({
  options = [],
  handleChange,
  helperText = "helper text",
  styleInput,
  lable = "lable",
  styled,
  selected = undefined,
}) {
  return (
    <Grid
      item
      size={12}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: { xs: ".2rem" },
      }}
      className={`${styles.input_container} ${styles[styleInput]} ${styles[styled]}`}
    >
      {lable && <Typography className={styles.label_input}>{lable}</Typography>}
      <ReactDropdown
        optionsProp={options}
        handleChange={handleChange}
        mainValue={selected}
      />
      {helperText && (
        <Typography className={styles.helper_text_input}>
          {helperText}
        </Typography>
      )}
    </Grid>
  );
}
