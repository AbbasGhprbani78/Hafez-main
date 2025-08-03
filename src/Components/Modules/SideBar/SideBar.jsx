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
export default function SideBar({
  routes = [
    { path: "/", label: "خانه", icon: faHome },
    { path: "/paziresh", label: "پذیرش", icon: faNewspaper },
    { path: "/repairsall", label: "کارت تعمیر", icon: faScrewdriverWrench },
    { path: "/fund", label: "حسابداری", icon: faLayerGroup },
    { path: "/g", label: "گزارشات", icon: faChartPie },
    { path: "/allform", label: "فرم‌ها", icon: faListCheck },
    { path: "/settings", label: "مدیریت", icon: faCalendarPlus },
  ],
}) {
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
        isOpen ? styles.active_sidebar : ""
      }`}
    >
      <ul className={"sidebarlist"}>
        <li
          className={`${styles.sidebar_item} ${styles.first_icon_sidebar}`}
          onClick={toggleOpen}
        >
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faAlignRight} />
          </div>
        </li>

        {routes.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`${styles.sidebar_item} navlink`}
            end
          >
            <div className={styles.icon_sidebar_wrapper}>
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <p className={styles.sidebar_item_text}>{item.label}</p>
          </NavLink>
        ))}

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
