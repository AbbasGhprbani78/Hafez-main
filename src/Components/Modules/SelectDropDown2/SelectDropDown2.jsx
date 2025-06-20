import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatableSelect from "react-select/creatable";
import styles from "./SelectDropDown2.module.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { components } from "react-select";

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={faAngleDown} style={{ color: "var(--color-3)" }} />
    </components.DropdownIndicator>
  );
};

const CustomNoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span style={{ color: "var(--color-21)" }}>موردی یافت نشد !</span>
    </components.NoOptionsMessage>
  );
};

const customStyles = {
  control: (provided, state) => ({
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
    outline: "none",
    marginTop: ".5rem",
    width: "100%",
    minWidth: "198px",
    borderColor: "var(--color-8)",
    "&:hover": {
      borderColor: "var(--color-8)",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
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
    maxHeight: "500px",
    overflowY: "auto",
    width: "100%",
    minWidth: "198px",
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

export default function SelectDropDown2({
  icon,
  label,
  items,
  name,
  placeHolder,
  isDesirableValue = false,
  onChange,
  value,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const newOptions =
      items?.map((item) => ({
        value: item.value_id,
        label: item.value,
      })) || [];
    setOptions(newOptions);
  }, [items]);

  useEffect(() => {
    if (value && options.length > 0) {
      const matched = options.find((opt) =>
        isDesirableValue ? opt.label === value : opt.value === value
      );
      setSelectedOption(matched || null);
    } else {
      setSelectedOption(null);
    }
  }, [value, options, isDesirableValue]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    setInputValue(selected ? selected.label : "");

    if (selected) {
      onChange(name, selected.value);
    } else {
      onChange(name, null);
    }
  };

  const handleInputChange = (newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleBlur = () => {
    if (
      !selectedOption ||
      selectedOption.label.toLowerCase() !== inputValue.toLowerCase()
    ) {
      if (inputValue.trim() !== "") {
        const customValue = { label: inputValue, value: inputValue };

        const exists = options.find((opt) => opt.value === inputValue);
        if (!exists) {
          setOptions((prev) => [...prev, customValue]);
        }

        setSelectedOption(customValue);
        onChange(name, inputValue);
      } else {
        setSelectedOption(null);
        onChange(name, null);
      }
    }
  };

  return (
    <>
      {label && (
        <label htmlFor={`${name}-select`} className="label_input">
          {label}
        </label>
      )}
      <CreatableSelect
        isClearable
        onChange={handleChange}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
        options={options}
        value={selectedOption}
        placeholder={placeHolder || "جستجو یا وارد کردن گزینه"}
        styles={customStyles}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
          NoOptionsMessage: CustomNoOptionsMessage,
        }}
        name={name}
      />
    </>
  );
}
