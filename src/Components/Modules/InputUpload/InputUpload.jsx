import React, { useState, useEffect } from "react";
import styles from "./InputUpload.module.css";

export default function InputUpload({ label, name, onChange }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageUpload(file);
      setPreviewUrl(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageUpload(file);
      setPreviewUrl(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.uploadInput_container}>
      <p className={`${styles.uploadInput_title}`}>{label}</p>
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
          {imageUpload ? (
            <img
              src={previewUrl}
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

          <label htmlFor={name} className={`${styles.label_uploadInput} mt-2`}>
            آپلود
          </label>
        </div>
      </div>
    </div>
  );
}
