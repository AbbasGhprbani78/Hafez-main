import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./SelectDropDown2.module.css";

export default function SelectDropDown2({ text, style, styleList }) {
  const [showOptions, setShowOptions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedValue, setSelectedValue] = useState(text);

  const options = [text, "2", "3", "4"];

  const handleInputFocus = () => {
    setShowOptions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowOptions(false), 200);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelect = (value) => {
    if (value !== text) {
      setSelectedValue(value);
      setShowOptions(false);
    }
  };

  const filteredOptions = options.filter((option) =>
    option?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={`${styles.selectDropDown_container} ${styles[style]}`}>
      <div className={styles.input_container}>
        <input
          type="text"
          autoComplete="off"
          value={searchText}
          placeholder={selectedValue}
          onChange={handleSearch}
          className={styles.input_dropdown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <FontAwesomeIcon icon={faChevronDown} className={styles.arrow_icon} />
      </div>
      {showOptions && (
        <ul className={`${styles.list_dropdwon} ${styles[styleList]}`}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`${styles.item_dropdown} ${option === text ? styles.disabled_item : ""
                  }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className={styles.item_dropdown}>موردی یافت نشد</li>
          )}
        </ul>
      )}
    </div>
  );
}
