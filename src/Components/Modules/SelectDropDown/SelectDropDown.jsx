import { useState, useRef, useEffect } from "react";
import styles from "./SelectDropDown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toFarsiNumber } from "../../../utils/helper";

export default function SelectDropDown({
  icon,
  label,
  items,
  name,
  setother,
  value,
  onChange,
  material,
  placeHolder,
  disable = false,
  isDesirableValue = false,
}) {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [displayedValue, setDisplayedValue] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setOptions(items);
    setFilteredOptions(items);

    if (material) {
      const matchedItem = items.find((item) => item.value_id === material);
      if (matchedItem) {
        setDisplayedValue(matchedItem.value);
      }
    }
  }, [items, material]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDisplayedValue(value);

    setFilteredOptions(
      options.filter((option) =>
        option.value.toLowerCase().includes(value.toLowerCase())
      )
    );
    if ((options.length === 0) & isDesirableValue) {
      onChange(name, value);
      setShowOptions(false);
    } else setShowOptions(true);
  };

  const handleOptionClick = (value, id) => {
    setDisplayedValue(value);
    if (setother) {
      setother(value === "سایر");
    }

    onChange(name, id);
    setShowOptions(false);
  };

  const handleInputFocus = () => {
    setShowOptions(true);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDisplayedValue(value || "");
  }, [value]);

  return (
    <div className={styles.select_car_wrapper} ref={dropdownRef}>
      {label && (
        <label htmlFor="myInput" className={`label_input`}>
          {label}
        </label>
      )}
      <div className={styles.select_car}>
        <input
          type="text"
          id="myInput"
          name={name}
          className={styles.input_cars}
          value={toFarsiNumber(displayedValue)}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          autoComplete="off"
          disabled={disable}
          placeholder={placeHolder}
        />
        <FontAwesomeIcon icon={icon} className={styles.select_car_icon} />
        {showOptions && (
          <ul className={styles.list_cars}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, i) => (
                <li
                  key={i}
                  className={styles.car_item}
                  onClick={() => handleOptionClick(item.value, item.value_id)}
                >
                  {toFarsiNumber(item.value)}
                </li>
              ))
            ) : (
              <li className={styles.car_item}>موردی یافت نشد!</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
