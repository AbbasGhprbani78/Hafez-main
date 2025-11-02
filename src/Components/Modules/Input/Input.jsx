import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Input.module.css";
import { toEnglishNumber, toFarsiNumber } from "../../../utils/helper";

const Input = ({
  name,
  label,
  icon,
  placeholder,
  type = "text",
  styleInput,
  value,
  onChange,
  styled,
  disabled = false,
  convertNumbers = true,
}) => {
  const handleChange = (e) => {
    let val = e.target.value;

    if (convertNumbers) {
      val = toEnglishNumber(val);
    }

    onChange?.({
      target: { name: e.target.name, value: val },
    });
  };

  const displayValue = convertNumbers ? toFarsiNumber(value) : value;

  return (
    <div
      className={`${styles.input_container} ${styles[styleInput] || ""} ${
        styles[styled] || ""
      }`}
    >
      {label && (
        <label htmlFor={name} className={`label_input`}>
          {label}
        </label>
      )}

      <div className={styles.input_content_wrapper}>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          className={styles.input_form}
          autoComplete="off"
          maxLength={70}
          disabled={disabled}
        />
        {icon && <FontAwesomeIcon icon={icon} className={styles.icon_input} />}
      </div>
    </div>
  );
};

export default Input;
