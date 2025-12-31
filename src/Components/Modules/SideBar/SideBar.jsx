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
  faChevronDown,
  faChevronUp,
  faWarehouse,
  faMoneyCheckDollar,
  faUserTie,
  faUsers,
  faWallet,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MyContext } from "../../../context/context";

export default function SideBar({
  routes = [
    { path: "/", label: "خانه", icon: faHome },
    { path: "/paziresh", label: "پذیرش", icon: faNewspaper },
    { path: "/arboretum", label: "درختواره", icon: faTree },
    { path: "/repairsall", label: "کارت تعمیر", icon: faScrewdriverWrench },
    { path: "/fund", label: "حسابداری", icon: faLayerGroup },

    {
      label: "گزارشات",
      icon: faChartPie,
      subRoutes: [
        { path: "/reports/reception-reports", label: "گزارش پذیرش" },
        { path: "/reports/customer-list", label: "لیست مشتریان" },
        { path: "/reports/customer-history", label: "سابقه مشتریان" },
      ],
    },
    {
      label: "انبار",
      icon: faWarehouse,
      subRoutes: [
        { path: "/warehouse/consumableparts", label: "مصرف قطعات" },
        { path: "/warehouse/consumptionofparts", label: "قطعات پر مصرف" },
      ],
    },
    {
      label: "مالی",
      icon: faMoneyCheckDollar,
      subRoutes: [
        { path: "/finance/workofcontractors", label: "کارکرد پیمانکاران" },
        { path: "/finance/dailybilling", label: "صورتحساب روزانه" },
      ],
    },
    { path: "/allform", label: "فرم‌ها", icon: faListCheck },
    {
      label: "مدیریت",
      icon: faUserTie,
      subRoutes: [
        { path: "/management/home", label: "داشبورد مدیریت" },
        { path: "/management/status", label: "وضعیت ها" },
        { path: "/account", label: "حساب" },
        { path: "/users", label: "کاربران" },
      ],
    },
  ],
}) {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const { toggleOpen, isOpen } = useContext(MyContext);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    if (!isOpen) {
      toggleOpen();
    }
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <div
      className={`no-print ${styles.sidebar_container} hide-scroll ${
        isOpen ? styles.active_sidebar : ""
      }`}
    >
      <ul className="scroll-contant">
        <li
          className={`${styles.sidebar_item} ${styles.first_icon_sidebar}`}
          onClick={toggleOpen}
        >
          <div className={styles.icon_sidebar_wrapper}>
            <FontAwesomeIcon icon={faAlignRight} />
          </div>
        </li>

        {routes.map((item) => {
          if (item.subRoutes) {
            return (
              <li
                onClick={() => toggleDropdown(item.label)}
                key={item.label}
                className={`${styles.sidebar_item} ${styles.sidebar_submenu}`}
              >
                <div
                  className={`${styles.icon_sidebar_wrapper} ${styles.dropdown_header} `}
                >
                  <div style={{ display: "flex" }}>
                    <FontAwesomeIcon icon={item.icon} />
                    <p className={styles.sidebar_item_text}>{item.label}</p>
                  </div>
                  <FontAwesomeIcon
                    icon={
                      isOpen && openDropdown === item.label
                        ? faChevronUp
                        : faChevronDown
                    }
                    className={styles.chevron_icon}
                  />
                </div>

                <ul
                  className={`${styles.submenu} ${
                    isOpen && openDropdown === item.label ? styles.open : ""
                  }`}
                >
                  {item.subRoutes.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) =>
                        `${styles.submenu_item} ${
                          isActive ? styles.activesub : ""
                        }`
                      }
                      end
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </ul>
              </li>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.sidebar_item} navlink ${
                  isActive ? styles.active : ""
                }`
              }
              end
            >
              <div className={styles.icon_sidebar_wrapper}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <p className={styles.sidebar_item_text}>{item.label}</p>
            </NavLink>
          );
        })}

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
