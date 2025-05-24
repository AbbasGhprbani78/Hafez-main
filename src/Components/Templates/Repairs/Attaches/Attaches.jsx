import React from "react";
import styles from "./Attaches.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import Texteara from "../../../Modules/Texteara/Textarea";
export default function Attaches() {
  return (
    <div className={styles.box}>
      <span className={`${styles.box_title} subtitle-project`}>
        پیوست :
        <Button2 onClick={""}>{"تاریخچه پیوست‌ها"}</Button2>
      </span>
      <div className="mt-4">
        <Texteara value={""} onChange={""} name={""} text={"توضیحات"} />
      </div>
    </div>
  );
}
