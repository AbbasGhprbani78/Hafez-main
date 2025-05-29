import React from "react";
import Select, { components } from "react-select";
import styles from "./SearchAndSelectDropDwon.module.css";

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        height="20"
        width="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        focusable="false"
        style={{ color: "var(--color-2)" }}
      >
        <path d="M7 7l5 5 5-5H7z" fill="currentColor" />
      </svg>
    </components.DropdownIndicator>
  );
};

const options = [
  { value: "benz", label: "بنز" },
  { value: "bmw", label: "بی‌ام‌و" },
  { value: "peugeot", label: "پژو" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "var(--color-20)",
    border: "1px solid var(--color-8)",
    borderRadius: "var(--border-radius-1)",
    height: "44px",
    padding: "0 10px",
    boxShadow: "none",
    cursor: "pointer",
    direction: "rtl",
    fontFamily: "iranYekan, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  indicatorSeparator: () => ({
    display: "none", // حذف خط بین آیکن و input
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--color-3)",
    fontFamily: "iranYekan, sans-serif",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--color-21)",
    fontSize: "0.7rem",
    fontFamily: "iranYekan, sans-serif",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--color-3)",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--color-20)",
    border: "1px solid var(--color-8)",
    borderRadius: "var(--border-radius-1)",
    marginTop: "5px",
    zIndex: 99,
    maxHeight: "220px",
    overflowY: "auto",
  }),
  option: (provided, state) => ({
    ...provided,
    padding: "10px",
    marginTop: "10px",
    backgroundColor: state.isFocused ? "#a8a4a4d1" : "transparent",
    color: state.isFocused ? "#fff" : "var(--color-3)",
    cursor: "pointer",
  }),
};

const CustomStyledSelect = () => {
  const handleChange = (selectedOption) => {
    console.log("انتخاب شد:", selectedOption);
  };

  return (
    <div className={styles.select_car_wrapper}>
      <Select
        options={options}
        onChange={handleChange}
        isSearchable
        placeholder="نام خودرو را وارد کنید"
        styles={customStyles}
        classNamePrefix="input_cars"
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
    </div>
  );
};

export default CustomStyledSelect;
