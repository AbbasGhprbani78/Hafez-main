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
  faTree,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useMemo } from "react";
import { MyContext } from "../../../context/context";

export default function SideBar() {
  const allRoutes = [
    { path: "/", label: "خانه", icon: faHome, permission: "view_home" },
    {
      path: "/admission",
      label: "پذیرش",
      icon: faNewspaper,
      permission: "view_admission_reports",
    },
    {
      path: "/arboretum",
      label: "درختواره",
      icon: faTree,
      permission: "view_arboretum",
    },
    {
      path: "/repairsall",
      label: "کارت تعمیر",
      icon: faScrewdriverWrench,
      permission: "view_repair_cards",
    },
    {
      path: "/fund",
      label: "صندوق",
      icon: faCircleDollarToSlot,
      permission: "view_fund",
    },
    {
      path: "/accounting",
      label: "حسابداری",
      icon: faLayerGroup,
      permission: "view_accounting",
    },
    {
      path: "/allform",
      label: "فرم‌ها",
      icon: faListCheck,
      permission: "view_forms",
    },

    {
      label: "گزارشات",
      icon: faChartPie,
      permission: "Reports",
      subRoutes: [
        {
          path: "/reports/reception-reports",
          label: "گزارش پذیرش",
          permission: "Admission_report",
        },
        {
          path: "/reports/customer-list",
          label: "لیست مشتریان",
          permission: "Customer_List",
        },
        {
          path: "/reports/customer-history",
          label: "سابقه مشتریان",
          permission: "Customer_history",
        },
      ],
    },
    {
      label: "انبار",
      icon: faWarehouse,
      permission: "Warehouse",
      subRoutes: [
        {
          path: "/warehouse/consumableparts",
          label: "مصرف قطعات",
          permission: "consumableparts",
        },
        {
          path: "/warehouse/consumptionofparts",
          label: "قطعات پر مصرف",
          permission: "consumptionofparts",
        },
      ],
    },
    {
      label: "مالی",
      icon: faMoneyCheckDollar,
      permission: "Finance",
      subRoutes: [
        {
          path: "/finance/workofcontractors",
          label: "کارکرد پیمانکاران",
          permission: "workofcontractors",
        },
        {
          path: "/finance/dailybilling",
          label: "صورتحساب روزانه",
          permission: "dailybilling",
        },
      ],
    },
    {
      label: "مدیریت",
      icon: faUserTie,
      permission: "Management",
      subRoutes: [
        {
          path: "/management/home",
          label: "داشبورد مدیریت",
          permission: "Management_Dashboard",
        },
        { path: "/management/status", label: "وضعیت ها", permission: "Status" },
        { path: "/management/account", label: "حساب", permission: "Account" },
        { path: "/management/users", label: "کاربران", permission: "Users" },
      ],
    },
  ];

  const navigate = useNavigate();
  const {
    toggleOpen,
    isOpen,
    permissions = [],
    isLoggedIn,
  } = useContext(MyContext);
  const [openDropdown, setOpenDropdown] = useState(null);

  const allowedPermissions = useMemo(() => {
    if (!isLoggedIn || permissions.length === 0) return new Set();

    const set = new Set();
    const traverse = (nodes) => {
      nodes.forEach((node) => {
        if (node.name) set.add(node.name);
        if (node.children?.length > 0) traverse(node.children);
      });
    };
    traverse(permissions);
    return set;
  }, [permissions, isLoggedIn]);

  const hasPermission = (permissionName) => {
    if (!isLoggedIn || allowedPermissions.size === 0) return false;
    return allowedPermissions.has(permissionName);
  };

  const filteredRoutes = useMemo(() => {
    return allRoutes.filter((route) => {
      if (route.path) {
        // Ensure the `/fund` route is always visible regardless of permissions
        if (route.path === "/fund") return true;

        return hasPermission(route.permission);
      }

      if (route.subRoutes) {
        if (!hasPermission(route.permission)) return false;

        return route.subRoutes.some((sub) => hasPermission(sub.permission));
      }

      return false;
    });
  }, [allowedPermissions, isLoggedIn]);

  const toggleDropdown = (label) => {
    if (!isOpen) toggleOpen();
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const logoutHandler = () => {
    sessionStorage.clear();
    localStorage.removeItem("level");
    navigate("/login");
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

        {filteredRoutes.map((item) => {
          if (item.subRoutes) {
            const accessibleSubs = item.subRoutes.filter((sub) =>
              hasPermission(sub.permission),
            );

            return (
              <li
                onClick={() => toggleDropdown(item.label)}
                key={item.label}
                className={`${styles.sidebar_item} ${styles.sidebar_submenu}`}
              >
                <div
                  className={`${styles.icon_sidebar_wrapper} ${styles.dropdown_header}`}
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
                  {accessibleSubs.map((sub) => (
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

          // روت‌های ساده
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

        {isLoggedIn && (
          <li
            className={`${styles.sidebar_item} navlink ${styles.logou_sidebar}`}
            onClick={logoutHandler}
          >
            <div className={styles.icon_sidebar_wrapper}>
              <FontAwesomeIcon icon={faRightToBracket} />
            </div>
            <p className={styles.sidebar_item_text}>خروج</p>
          </li>
        )}
      </ul>
    </div>
  );
}
