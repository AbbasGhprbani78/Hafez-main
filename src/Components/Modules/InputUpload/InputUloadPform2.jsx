import { useState } from "react";
import styles from "./InputUpload.module.css";

export default function InputUloadPform2({
  label,
  name,
  setForm2,
  src,
  setIsEdit,
}) {
  const [defaultImg, setDefaultImg] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setDefaultImg(URL.createObjectURL(file));
      handleFileUpload(file);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDefaultImg(URL.createObjectURL(file));
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm2((prevForm) => ({
        ...prevForm,
        customer_secend_form: {
          ...prevForm.customer_secend_form,
          [name]: reader.result,
        },
      }));
    };
    reader.readAsDataURL(file);
    setIsEdit(true);
  };

  return (
    <div className={styles.uploadInput_container}>
      <p className={`${styles.uploadInput_title} mb-2`}>{label}</p>
      <div
        className={styles.uploadInput_wrapper}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={styles.uploadInput_content}>
          <input
            type="file"
            id={name}
            className={styles.uploadInput}
            onChange={handleChange}
            accept="image/*"
          />
          {defaultImg || src ? (
            <img
              src={defaultImg ? defaultImg : src ? `${apiUrl}${src}` : ""}
              alt="upload-preview"
              className={styles.img_input}
            />
          ) : (
            <div className={styles.drag_drop_text}>
              drag and drop
              <br />
              or
            </div>
          )}

          <label htmlFor={name} className={`${styles.label_uploadInput}`}>
            آپلود
          </label>
        </div>
      </div>
    </div>
  );
}
