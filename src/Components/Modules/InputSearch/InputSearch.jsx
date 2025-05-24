import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./InputSearch.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function InputSearch({
  inputSearch,
  handleSerach,
  lable,
  placeholder,
}) {
  return (
    <div className={`${styles.input_container}`}>
      {lable && <label className={`label_input mb-2`}>{lable}</label>}

      <div className={styles.input_content_wrapper}>
        <input
          type="text"
          placeholder={placeholder}
          value={inputSearch}
          onChange={handleSerach}
          className={styles.input_form}
          autoComplete="off"
          maxLength={70}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.icon_input}
        />
      </div>
    </div>
  );
}
