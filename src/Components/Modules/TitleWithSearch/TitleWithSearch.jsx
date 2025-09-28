import styles from "./TitleWithSearch.module.css";
import Button2 from "../Button2/Button2";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function TitleWithSearch({
  searchInput,
  onChange,
  title,
  isbackButton = true,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search_container}>
        <div className={styles.title_back}>
          <span className={styles.title}>{title} :</span>
          {isbackButton && (
            <button className={styles.btn}>
              بازگشت
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}
        </div>

        <div className={styles.search_box}>
          <div className={styles.wrap_input}>
            <Input
              icon={faMagnifyingGlass}
              value={searchInput}
              onChange={onChange}
              placeholder={"جستجو"}
            />
          </div>
          <Button2 onClick={() => {}} icon={faMagnifyingGlass}>
            جستجو
          </Button2>
        </div>
      </div>
    </div>
  );
}
