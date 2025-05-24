import { useState, useRef, useEffect } from "react";
import styles from "./CodeCar.module.css";

export default function CodeCar({ name, value, setFieldValue }) {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [isEdited, setIsEdited] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (value) {
      const parts = [
        value.slice(0, 2),
        value.slice(2, 3),
        value.slice(3, 6),
        value.slice(6, 8),
      ];
      setInputs(parts);
    }
  }, [value]);

  useEffect(() => {
    if (isEdited) {
      const finalPlates = inputs.join("");
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
    const { value } = event.target;
    setIsEdited(true);
    if (validateInput(index, value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);

      if (
        (index === 0 && value.length === 2) ||
        (index === 1 && value.length === 1) ||
        (index === 2 && value.length === 3) ||
        (index === 3 && value.length === 2)
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

// useEffect(() => {
//     const finalPlates = inputs.join("");
//     setFieldValue(finalPlates);
// }, [inputs]);

// const finalPlates = inputs.join("");
// setFieldValue(finalPlates);
