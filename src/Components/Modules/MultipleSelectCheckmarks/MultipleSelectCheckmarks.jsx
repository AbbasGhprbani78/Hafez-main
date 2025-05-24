import styles from "./MultipleSelectCheckmarksStyle.module.css";

// MUI Components
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      direction: "rtl",
    },
  },
};

export default function MultipleSelectCheckmarks({
  options,
  selectedValues = [],
  onChange,
  lable = "lable",
  helperText = "helper text",
}) {
  const [selected, setSelected] = useState(selectedValues);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes("all")) {
      const allSelected = selected.length === options.length;
      setSelected(allSelected ? [] : options.map((opt) => opt.value));
      onChange(allSelected ? [] : options.map((opt) => opt.value));
    } else {
      setSelected(typeof value === "string" ? value.split(",") : value);
      onChange(typeof value === "string" ? value.split(",") : value);
    }
  };
  useEffect(() => {
    if (selectedValues.length > 0) {
      setSelected(selectedValues);
    } else {
      setSelected([]);
    }
  }, [selectedValues, options]);
  return (
    <Grid
      container
      size={12}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: { xs: ".2rem" },
      }}
      dir="rtl"
    >
      {lable && <Typography className={styles.label_input}>{lable}</Typography>}

      <FormControl sx={{ width: "100%" }}>
        <Select
          id="multiple_checkbox"
          className={styles.multiple_checkbox_styles}
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) =>
            selected
              .map((val) => options.find((opt) => opt.value === val)?.label)
              .join(", ")
          }
          MenuProps={MenuProps}
          dir="rtl"
        >
          {options.length > 0 ? (
            <MenuItem className={styles.menu_item_all} value="all">
              <Checkbox
                color="success"
                checked={selected.length === options.length}
              />
              <ListItemText primary="انتخاب همه" />
            </MenuItem>
          ) : (
            <MenuItem className={styles.menu_item_all} value="null">
              <ListItemText primary="گزینه‌ای برای انتخاب وجود ندارد!" />
            </MenuItem>
          )}

          {options.map((option) => (
            <MenuItem
              className={styles.menu_item_custom}
              key={option.value}
              value={option.value}
            >
              <Checkbox
                color="success"
                checked={selected.includes(option.value)}
              />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {helperText && (
        <Typography className={styles.helper_text_input}>
          {helperText}
        </Typography>
      )}
    </Grid>
  );
}
