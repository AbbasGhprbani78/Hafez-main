import styles from "./TitleWithSearch.module.css";
import Button2 from "../Button2/Button2";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function TitleWithSearch({ searchInput, onChange }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search_container}>
        <span className={styles.title}>تسک‌های در حال اجرا :</span>
        <div className={styles.search_box}>
          <Input
            icon={faMagnifyingGlass}
            value={searchInput}
            onChange={onChange}
            placeholder={"جستجو"}
            styled={"width"}
          />
          <Button2 onClick={() => {}} icon={faMagnifyingGlass}>
            جستجو
          </Button2>
        </div>
      </div>
      <button className={styles.btn}>
        بازگشت
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
}
