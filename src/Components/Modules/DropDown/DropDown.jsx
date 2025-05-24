import { useEffect } from "react";
import styles from "./DropDown.module.css";

export default function DropDown({ lable, styled, items, onChange, name }) {
  const handleChange = (event) => {
    const value = event.target.value;
    onChange(name, value);
  };

  useEffect(() => {
    if (items && items.length > 0) {
      onChange(name, items[0]?.value);
    }
  }, [items[0]?.value]);

  return (
    <div className={`${styles.dropdown_container} ${styled}`}>
      {lable && <label className={`label_input`}>{lable}</label>}
      <div className={styles.dropdown_wrapper}>
        <select
          className={styles.dropdown}
          onChange={handleChange}
          name={name}
          defaultValue={items[0]?.value}
        >
          {items?.map((item, i) => (
            <option value={item.value} key={i}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
