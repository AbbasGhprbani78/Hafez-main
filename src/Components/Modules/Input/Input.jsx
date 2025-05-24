import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Input.module.css";

const Input = ({
  name,
  label,
  icon,
  placeholder,
  type,
  styleInput,
  value,
  onChange,
  styled,
}) => {
  return (
    <div
      className={`${styles.input_container} ${styles[styleInput]} ${styles[styled]}`}
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
          value={value}
          onChange={onChange}
          className={styles.input_form}
          autoComplete="off"
          maxLength={70}
        />
        {icon && <FontAwesomeIcon icon={icon} className={styles.icon_input} />}
      </div>
    </div>
  );
};

export default Input;
