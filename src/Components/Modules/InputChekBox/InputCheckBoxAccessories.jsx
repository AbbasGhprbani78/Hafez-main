import { useState, useEffect } from "react";
import styles from "./InputCheckBox.module.css";
export default function InputCheckBoxAccessories({
  value,
  onChange,
  onDescriptionChange,
  name,
  checked,
  accessoriesFill,
  allAccessories,
}) {
  const [isChecked, setIsChecked] = useState(checked);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const matched = accessoriesFill.find((acc) => acc.parts === value);
    if (matched) {
      setDescription(matched.description || "");
    } else {
      setDescription("");
    }
  }, [accessoriesFill, value]);
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    onChange(isChecked);
    if (!isChecked) {
      setDescription("");
      onDescriptionChange("");
    }
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
    onDescriptionChange(newDescription);
  };

  return (
    <>
      <div className={`${styles.checkbox_container} mx-2`}>
        <input
          type="checkbox"
          className={styles.check_input}
          value={value}
          onChange={handleChange}
          checked={accessoriesFill?.some((acc) => acc.parts === value) || false}
        />
        <label className={styles.label_check}>{name}</label>
      </div>
      {isChecked && (
        <div className={styles.wrap_checkbox_dec}>
          <textarea
            className={`${styles.wrap_checkbox} ${styles.textarea}`}
            placeholder="توضیحات"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      )}
    </>
  );
}
