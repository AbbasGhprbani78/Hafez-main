import React from "react";
import styles from "./OccultationItem.module.css";
import SelectDropDown2 from "../SelectDropDown2/SelectDropDown2";
export default function OccultationItem() {
  return (
    <div className={styles.occultationItem_wrapper}>
      <p className={styles.title}>مکانیک</p>
      <span className={styles.subtitle}>تعمیرکار مکانیک</span>
      <SelectDropDown2 text={"نام تعمیرکار"} styleList={"positionlist"} />
    </div>
  );
}
