import styles from "./OccultationItem.module.css";
import SearchAndSelectDropDwon from "../SearchAndSelectDropDwon/SearchAndSelectDropDwon";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
export default function OccultationItem({ text, placeHolder }) {
  return (
    <div className={styles.occultationItem_wrapper}>
      <span className={styles.subtitle}>{text}</span>
      <SearchAndSelectDropDwon
        icon={faAngleDown}
        label={"کد اظهار"}
        items={[]}
        name=""
        placeHolder={placeHolder}
        onChange={""}
        value={""}
      />
    </div>
  );
}
