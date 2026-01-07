// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChartPie,
//   faHome,
//   faLayerGroup,
//   faListCheck,
//   faNewspaper,
//   faRightToBracket,
//   faScrewdriverWrench,
//   faXmark,
//   faChevronDown,
//   faChevronUp,
//   faWarehouse,
//   faMoneyCheckDollar,
//   faUserTie,
//   faWallet,
//   faUsers,
//   faTree,
// } from "@fortawesome/free-solid-svg-icons";
// import styles from "./Offcanvas.module.css";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useState } from "react";

// function ResponsiveDrawer({
//   show,
//   setIsShowSideBar,
//   routes = [
//     { path: "/", label: "خانه", icon: faHome },
//     { path: "/admission", label: "پذیرش", icon: faNewspaper },
//     { path: "/arboretum", label: "درختواره", icon: faTree },
//     { path: "/repairsall", label: "کارت تعمیر", icon: faScrewdriverWrench },
//     { path: "/fund", label: "حسابداری", icon: faLayerGroup },

//     {
//       label: "گزارشات",
//       icon: faChartPie,
//       subRoutes: [
//         { path: "/reports/reception-reports", label: "گزارش پذیرش" },
//         { path: "/reports/customer-list", label: "لیست مشتریان" },
//         { path: "/reports/customer-history", label: "سابقه مشتریان" },
//       ],
//     },
//     {
//       label: "انبار",
//       icon: faWarehouse,
//       subRoutes: [
//         { path: "/warehouse/consumableparts", label: "مصرف قطعات" },
//         { path: "/warehouse/consumptionofparts", label: "قطعات پر مصرف" },
//       ],
//     },
//     {
//       label: "مالی",
//       icon: faMoneyCheckDollar,
//       subRoutes: [
//         { path: "/finance/workofcontractors", label: "کارکرد پیمانکاران" },
//         { path: "/finance/dailybilling", label: "صورتحساب روزانه" },
//       ],
//     },
//     { path: "/allform", label: "فرم‌ها", icon: faListCheck },
//     {
//       label: "مدیریت",
//       icon: faUserTie,
//       subRoutes: [
//         { path: "/management/home", label: "داشبورد مدیریت" },
//         { path: "/management/status", label: "وضعیت ها" },
//         { path: "/management/account", label: "حساب" },
//         { path: "/management/users", label: "کاربران" },
//       ],
//     },
//   ],
// }) {
//   const navigate = useNavigate();
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (label) => {
//     setOpenDropdown((prev) => (prev === label ? null : label));
//   };

//   const logoutHandler = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     setIsShowSideBar(false);
//     navigate("/login");
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={show}
//       onClose={() => setIsShowSideBar(false)}
//       classes={{ paper: styles.offcanvas }}
//     >
//       <div className={styles.header}>
//         <div className={styles.wrap_close}>
//           <IconButton onClick={() => setIsShowSideBar(false)}>
//             <FontAwesomeIcon icon={faXmark} className={styles.close_icon} />
//           </IconButton>
//         </div>
//       </div>

//       <List className="content-offcanvas ">
//         {routes.map((item) => {
//           if (item.subRoutes) {
//             return (
//               <div
//                 key={item.label}
//                 className={`${styles.canvasitem} ${styles.offcanvas_wrap_submenu}`}
//               >
//                 <div
//                   className={`${styles.offcanvas_submenu} ${styles.dropdown_header}`}
//                   onClick={() => toggleDropdown(item.label)}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <FontAwesomeIcon
//                       icon={item.icon}
//                       className={styles.icon_offcanvas}
//                     />
//                     <p className={styles.canvas_item_text}>{item.label}</p>
//                   </div>
//                   <FontAwesomeIcon
//                     icon={
//                       openDropdown === item.label ? faChevronUp : faChevronDown
//                     }
//                     className={styles.chevron_icon}
//                   />
//                 </div>

//                 <div
//                   className={`${styles.submenu} ${
//                     openDropdown === item.label ? styles.open : ""
//                   }`}
//                 >
//                   {item.subRoutes.map((sub) => (
//                     <NavLink
//                       key={sub.path}
//                       to={sub.path}
//                       className={({ isActive }) =>
//                         `${styles.submenu_item} ${
//                           isActive ? styles.active : ""
//                         }`
//                       }
//                       onClick={() => setIsShowSideBar(false)}
//                       end
//                     >
//                       {sub.label}
//                     </NavLink>
//                   ))}
//                 </div>
//               </div>
//             );
//           }

//           return (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={styles.canvasitem}
//               onClick={() => setIsShowSideBar(false)}
//               end
//             >
//               <div className={styles.icon_offcanvas_wrapper}>
//                 <FontAwesomeIcon
//                   icon={item.icon}
//                   className={styles.icon_offcanvas}
//                 />
//               </div>
//               <p className={styles.canvas_item_text}>{item.label}</p>
//             </NavLink>
//           );
//         })}

//         <ListItem
//           button
//           className={`${styles.canvasitem} ${styles.logout_item}`}
//           onClick={logoutHandler}
//         >
//           <div className={styles.icon_offcanvas_wrapper}>
//             <FontAwesomeIcon icon={faRightToBracket} />
//           </div>
//           <p className={styles.canvas_item_text}>خروج</p>
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// }

// export default ResponsiveDrawer;

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faHome,
  faLayerGroup,
  faListCheck,
  faNewspaper,
  faRightToBracket,
  faXmark,
  faChevronDown,
  faChevronUp,
  faWarehouse,
  faMoneyCheckDollar,
  faUserTie,
  faTree,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Offcanvas.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useMemo, useContext } from "react";
import { MyContext } from "../../../context/context";

function ResponsiveDrawer({ show, setIsShowSideBar }) {
  const allRoutes = [
    { path: "/", label: "خانه", icon: faHome },
    { path: "/admission", label: "پذیرش", icon: faNewspaper },
    { path: "/arboretum", label: "درختواره", icon: faTree },
    { path: "/repairsall", label: "کارت تعمیر", icon: faScrewdriverWrench },
    { path: "/fund", label: "حسابداری", icon: faLayerGroup },
    { path: "/allform", label: "فرم‌ها", icon: faListCheck },

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
    {
      label: "مدیریت",
      icon: faUserTie,
      subRoutes: [
        { path: "/management/home", label: "داشبورد مدیریت" },
        { path: "/management/status", label: "وضعیت ها" },
        { path: "/management/account", label: "حساب" },
        { path: "/management/users", label: "کاربران" },
      ],
    },
  ];

  const navigate = useNavigate();
  const { permissions = [], isLoggedIn } = useContext(MyContext);

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const logoutHandler = () => {
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    localStorage.removeItem("level");
    setIsShowSideBar(false);
    navigate("/login");
  };

  const extractPermissionNames = (perms) => {
    const names = new Set();
    const traverse = (items) => {
      items.forEach((item) => {
        if (item.name) names.add(item.name);
        if (item.children && item.children.length > 0) {
          traverse(item.children);
        }
      });
    };
    traverse(perms);
    return Array.from(names);
  };

  const allowedNames = useMemo(() => {
    if (!isLoggedIn || permissions.length === 0) return null;
    return extractPermissionNames(permissions);
  }, [permissions, isLoggedIn]);

  const nameToPathMap = {
    view_home: "/",
    view_admission_reports: "/admission",
    view_arboretum: "/arboretum",
    view_repair_cards: "/repairsall",
    view_accounting: "/fund",
    view_forms: "/allform",

    Finance: "finance",
    Warehouse: "warehouse",
    Reports: "reports",
    Management: "management",

    dailybilling: "/finance/dailybilling",
    workofcontractors: "/finance/workofcontractors",

    consumableparts: "/warehouse/consumableparts",
    consumptionofparts: "/warehouse/consumptionofparts",

    Admission_report: "/reports/reception-reports",
    Customer_List: "/reports/customer-list",
    Customer_history: "/reports/customer-history",

    Management_Dashboard: "/management/home",
    Status: "/management/status",
    Account: "/management/account",
    Users: "/management/users",
  };

  const hasAccessToPath = (path) => {
    if (allowedNames === null) return true;

    const requiredNames = Object.entries(nameToPathMap)
      .filter(([_, mappedPath]) => mappedPath === path)
      .map(([name]) => name);

    if (requiredNames.length === 0) return true;

    return requiredNames.some((name) => allowedNames.includes(name));
  };

  const filteredRoutes = useMemo(() => {
    return allRoutes.filter((item) => {
      if (item.path) {
        return hasAccessToPath(item.path);
      }
      if (item.subRoutes) {
        return item.subRoutes.some((sub) => hasAccessToPath(sub.path));
      }
      return false;
    });
  }, [allowedNames]);

  return (
    <Drawer
      anchor="right"
      open={show}
      onClose={() => setIsShowSideBar(false)}
      classes={{ paper: styles.offcanvas }}
    >
      <div className={styles.header}>
        <div className={styles.wrap_close}>
          <IconButton onClick={() => setIsShowSideBar(false)}>
            <FontAwesomeIcon icon={faXmark} className={styles.close_icon} />
          </IconButton>
        </div>
      </div>

      <List className="content-offcanvas">
        {filteredRoutes.map((item) => {
          if (item.subRoutes) {
            const accessibleSubs = item.subRoutes.filter((sub) =>
              hasAccessToPath(sub.path)
            );

            if (accessibleSubs.length === 0) return null;

            return (
              <div
                key={item.label}
                className={`${styles.canvasitem} ${styles.offcanvas_wrap_submenu}`}
              >
                <div
                  className={`${styles.offcanvas_submenu} ${styles.dropdown_header}`}
                  onClick={() => toggleDropdown(item.label)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={styles.icon_offcanvas}
                    />
                    <p className={styles.canvas_item_text}>{item.label}</p>
                  </div>
                  <FontAwesomeIcon
                    icon={
                      openDropdown === item.label ? faChevronUp : faChevronDown
                    }
                    className={styles.chevron_icon}
                  />
                </div>

                <div
                  className={`${styles.submenu} ${
                    openDropdown === item.label ? styles.open : ""
                  }`}
                >
                  {accessibleSubs.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) =>
                        `${styles.submenu_item} ${
                          isActive ? styles.active : ""
                        }`
                      }
                      onClick={() => setIsShowSideBar(false)}
                      end
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          }

          // آیتم ساده
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={styles.canvasitem}
              onClick={() => setIsShowSideBar(false)}
              end
            >
              <div className={styles.icon_offcanvas_wrapper}>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={styles.icon_offcanvas}
                />
              </div>
              <p className={styles.canvas_item_text}>{item.label}</p>
            </NavLink>
          );
        })}

        {/* خروج فقط وقتی لاگین کرده باشه */}
        {isLoggedIn && (
          <ListItem
            button
            className={`${styles.canvasitem} ${styles.logout_item}`}
            onClick={logoutHandler}
          >
            <div className={styles.icon_offcanvas_wrapper}>
              <FontAwesomeIcon icon={faRightToBracket} />
            </div>
            <p className={styles.canvas_item_text}>خروج</p>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}

export default ResponsiveDrawer;
