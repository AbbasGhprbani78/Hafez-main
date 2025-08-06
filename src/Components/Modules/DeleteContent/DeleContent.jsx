import React from "react";
import styles from "./DeletContent.module.css";
import Button2 from "../Button2/Button2";
import { CircularProgress } from "@mui/material";

export default function DeleContent({ text, close, onClick, loading = false }) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
      <div className={styles.wrap_btns}>
        <button className={`${styles.btn} ${styles.btn_yes}`} onClick={onClick}>
          {loading ? <CircularProgress color="#fff" size={15} /> : "بله"}
        </button>
        <button className={`${styles.btn} ${styles.btn_no}`} onClick={close}>
          خیر
        </button>
      </div>
    </div>
  );
}
