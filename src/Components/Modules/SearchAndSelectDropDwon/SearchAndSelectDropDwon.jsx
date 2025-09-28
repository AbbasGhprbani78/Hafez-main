import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import styles from "./SearchAndSelectDropDwon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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

export default function CustomStyledSelect({
  icon,
  label,
  items,
  name,
  value,
  onChange,
  material,
  placeHolder,
  disable = false,
  isDesirableValue = false,
}) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (items && items.length > 0) {
      const formattedOptions = items.map((item) => ({
        value: item.value_id,
        label: item.value,
      }));
      setOptions(formattedOptions);
    }
  }, [items]);

  useEffect(() => {
    if (material && options.length > 0) {
      const matched = options.find((opt) => opt.value === material);
      if (matched) {
        setSelectedOption(matched);
        return;
      }
    }

    if (value && options.length > 0) {
      const matched = options.find((opt) =>
        isDesirableValue ? opt.label === value : opt.value === value
      );
      if (matched) {
        setSelectedOption(matched);
      } else {
        setSelectedOption(null);
      }
    } else {
      setSelectedOption(null);
    }
  }, [value, material, options, isDesirableValue]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    if (selected) {
      onChange(name, selected.value, selected.label);
    } else {
      onChange(name, null);
    }
  };

  return (
    <div className={styles.select_car_wrapper}>
      {label && (
        <label htmlFor={`${name}-select`} className="label_input">
          {label}
        </label>
      )}
      <Select
        name={name}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        isSearchable
        placeholder={placeHolder}
        styles={customStyles}
        classNamePrefix="input_cars"
        components={{
          DropdownIndicator: CustomDropdownIndicator,
          NoOptionsMessage: CustomNoOptionsMessage,
        }}
        isDisabled={disable}
        menuPlacement="auto"
        menuShouldScrollIntoView={false}
      />
    </div>
  );
}
