import { useState, useRef, useEffect } from "react";
import styles from "./CodeCar.module.css";

export default function CodeCar({ name, value, setFieldValue }) {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [isEdited, setIsEdited] = useState(false);

  const inputRefs = useRef([]);

  const toPersianDigits = (str) => {
    if (!str) return "";
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const toEnglishDigits = (str) => {
    if (!str) return "";
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str.replace(/[۰-۹]/g, (char) => {
      const index = persianDigits.indexOf(char);
      return index !== -1 ? index.toString() : char;
    });
  };

  useEffect(() => {
    if (value) {
      const parts = [
        value.slice(0, 2),
        value.slice(2, 3),
        value.slice(3, 6),
        value.slice(6, 8),
      ];
      // تبدیل اعداد به فارسی برای نمایش
      const displayParts = [
        toPersianDigits(parts[0]),
        parts[1], // حرف فارسی است
        toPersianDigits(parts[2]),
        toPersianDigits(parts[3]),
      ];
      setInputs(displayParts);
    }
  }, [value]);

  useEffect(() => {
    if (isEdited) {
      const englishInputs = inputs.map((input, idx) =>
        idx !== 1 ? toEnglishDigits(input) : input
      );
      const finalPlates = englishInputs.join("");
      setFieldValue(finalPlates);
      setIsEdited(false);
    }
  }, [inputs]);

  const validateInput = (index, value) => {
    switch (index) {
      case 0:
        return /^\d{0,2}$/.test(value);
      case 1:
        return /^[\u0600-\u06FF]?$/.test(value);
      case 2:
        return /^\d{0,3}$/.test(value);
      case 3:
        return /^\d{0,2}$/.test(value);
      default:
        return true;
    }
  };

  const handleInputChange = (index, event) => {
    let { value } = event.target;

    let englishValue = value;
    if (index !== 1) {
      englishValue = toEnglishDigits(value);
    }

    setIsEdited(true);
    if (validateInput(index, englishValue)) {
      const newInputs = [...inputs];
      if (index !== 1) {
        newInputs[index] = toPersianDigits(englishValue);
      } else {
        newInputs[index] = value;
      }
      setInputs(newInputs);

      const checkLength = index !== 1 ? englishValue.length : value.length;
      if (
        (index === 0 && checkLength === 2) ||
        (index === 1 && checkLength === 1) ||
        (index === 2 && checkLength === 3) ||
        (index === 3 && checkLength === 2)
      ) {
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    }
  };

  return (
    <div className={`${styles.inputs_wrapper}`}>
      <p className={`${styles.code_car} ${styles.title_item_form}`}>
        شماره پلاک
      </p>
      <div className={` ${styles.codecar_itemes}`}>
        <div
          className=""
          style={{
            marginRight: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            className={styles.input_carector}
            type="text"
            value={inputs[3]}
            placeholder="ایران"
            onChange={(e) => handleInputChange(3, e)}
            ref={(el) => (inputRefs.current[3] = el)}
          />
          <span className={styles.text_carector}>عدد 2 تایی</span>
        </div>

        <div
          style={{
            marginRight: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            className={styles.input_carector}
            type="text"
            value={inputs[2]}
            onChange={(e) => handleInputChange(2, e)}
            ref={(el) => (inputRefs.current[2] = el)}
          />
          <span className={styles.text_carector}>عدد 3 تایی</span>
        </div>

        <div
          style={{
            marginRight: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            className={styles.input_carector}
            type="text"
            value={inputs[1]}
            onChange={(e) => handleInputChange(1, e)}
            ref={(el) => (inputRefs.current[1] = el)}
          />
          <span className={styles.text_carector}>حرف</span>
        </div>

        <div
          style={{
            marginRight: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            className={styles.input_carector}
            type="text"
            value={inputs[0]}
            onChange={(e) => handleInputChange(0, e)}
            ref={(el) => (inputRefs.current[0] = el)}
          />
          <span className={styles.text_carector}>عدد 2 تایی</span>
        </div>
      </div>
    </div>
  );
}
