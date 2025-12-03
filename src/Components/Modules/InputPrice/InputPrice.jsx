import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  formatWithThousandSeparators,
  toEnglishNumber,
  toFarsiNumber,
} from "../../../utils/helper";

import styles from "./InputPrice.module.css";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

export default function InputPrice({
  label,
  value,
  onChange,
  name,
  maxLength,
  icon,
}) {
  return (
    <>
      <label className="label_input">{label}</label>
      <div className="input_content_wrapper" style={{ marginTop: ".5rem" }}>
        <input
          name={name}
          type="text"
          placeholder="قیمت"
          value={toFarsiNumber(formatWithThousandSeparators(value))}
          onChange={(e) => {
            const englishNumber = toEnglishNumber(
              e.target.value.replace(/,/g, "")
            );
            onChange(englishNumber);
          }}
          className="input_form"
          autoComplete="off"
          maxLength={maxLength}
        />
        <FontAwesomeIcon icon={faMoneyCheckDollar} color="var(--color-1)" />
      </div>
    </>
  );
}
