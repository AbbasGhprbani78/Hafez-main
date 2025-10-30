import Select from "react-select";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./MultiSelectDropDwon.module.css";
const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid var(--color-8)",
    borderRadius: "var(--border-radius-1)",
    backgroundColor: "var(--color-20)",
    minHeight: "unset",
    padding: "4px 9px 4px 15px",
    fontFamily: '"iranYekan", sans-serif',
    direction: "rtl",
    boxShadow: "none",
    ...(state.isFocused
      ? { border: "1px solid var(--color-8)", boxShadow: "none" }
      : {}),
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-21)",
    fontSize: "clamp(0.8rem, 0.9vw, 1rem)",
    fontFamily: '"iranYekan", sans-serif',
    opacity: 1,
    direction: "rtl",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "var(--color-8)",
    borderRadius: "8px",
    color: "#fff",
    fontFamily: '"iranYekan", sans-serif',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    fontFamily: '"iranYekan", sans-serif',
    direction: "rtl",
    backgroundColor: state.isFocused ? "var(--color-5)" : base.backgroundColor,
    color: state.isFocused ? "#fff" : base.color, // متن سفید اگر هاور باشد
  }),
};

const defaultOptions = [
  { value: "option1", label: "گزینه یک" },
  { value: "option2", label: "گزینه دو" },
  { value: "option3", label: "گزینه سه" },
];

export default function MultiSelectDropDwon({
  value,
  onChange,
  items = defaultOptions,
  placeholder = "انتخاب کنید...",
  label,
}) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  const handleChange = (selectedOptions) => {
    setSelected(selectedOptions);
    if (onChange) onChange(selectedOptions);
  };

  return (
    <div className={styles.input_container} style={{ width: "100%" }}>
      {label && <label className={`label_input`}>{label}</label>}
      <Select
        isMulti
        options={items}
        styles={customStyles}
        placeholder={placeholder}
        value={selected}
        onChange={handleChange}
        classNamePrefix="multi-select"
        menuPlacement="auto"
      />
    </div>
  );
}

MultiSelectDropDwon.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  items: PropTypes.array,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};
