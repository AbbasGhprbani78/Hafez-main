import styles from "./SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faAlignRight,
  faNewspaper,
  faScrewdriverWrench,
  faLayerGroup,
  faChartPie,
  faRightToBracket,
  faListCheck,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../../context/context";
export default function SideBar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const { toggleOpen, isOpen } = useContext(MyContext);

  return (
    <div
      className={`${styles.sidebar_container} ${
        isOpen ? styles.active_sidebar : null
      } `}
    >
      <ul className={"sidebarlist"}>
        <li
          className={`${styles.sidebar_item} ${styles.first_icon_sidebar}`}
          onClick={toggleOpen}
        >
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faAlignRight} />
          </div>
          <p className={styles.sidebar_item_text}></p>
        </li>
        <NavLink to={"/"} className={`${styles.sidebar_item} navlink`}>
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faHome} />
          </div>
          <p className={styles.sidebar_item_text}>خانه</p>
        </NavLink>
        <NavLink to={"/paziresh"} className={`${styles.sidebar_item} navlink`}>
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faNewspaper} />
          </div>
          <p className={styles.sidebar_item_text}>پذیرش</p>
        </NavLink>
        <NavLink to={"/repairs"} className={`${styles.sidebar_item} navlink`}>
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faScrewdriverWrench} />
          </div>
          <p className={styles.sidebar_item_text}>کارت تعمیر</p>
        </NavLink>
        <NavLink to={"/fund"} className={`${styles.sidebar_item} navlink`}>
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>
          <p className={styles.sidebar_item_text}>حسابداری</p>
        </NavLink>
        <NavLink to={"/g"} className={`${styles.sidebar_item} navlink`}>
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faChartPie} />
          </div>
          <p className={styles.sidebar_item_text}>گزارشات</p>
        </NavLink>
        <NavLink to={"/allform"} className={`${styles.sidebar_item} navlink`}>
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faListCheck} />
          </div>
          <p className={styles.sidebar_item_text}>فرم‌ها</p>
        </NavLink>
        <NavLink to={"/settings"} className={`${styles.sidebar_item} navlink`}>
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faCalendarPlus} />
          </div>
          <p className={styles.sidebar_item_text}>مدیریت</p>
        </NavLink>
        <li
          className={`${styles.sidebar_item} navlink ${styles.logou_sidebar}`}
          onClick={logoutHandler}
        >
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faRightToBracket} />
          </div>
          <p className={styles.sidebar_item_text}>خروج</p>
        </li>
      </ul>
    </div>
  );
}
