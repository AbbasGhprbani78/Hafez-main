// import Offcanvas from "react-bootstrap/Offcanvas";
// import styles from "./Offcanvas.module.css";
// import {
//   faBoxArchive,
//   faCalendarPlus,
//   faChartPie,
//   faHome,
//   faLayerGroup,
//   faListCheck,
//   faNewspaper,
//   faRightToBracket,
//   faScrewdriverWrench,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { NavLink } from "react-router-dom";

// function ResponsiveExample({ show, setIsShowSideBar }) {
//   return (
//     <>
//       <Offcanvas
//         show={show}
//         onHide={() => setIsShowSideBar(false)}
//         placement="end"
//         className={styles.offcanvas}
//       >
//         <Offcanvas.Body>
//           <div className={styles.header}>
//             <div className={styles.wrap_close}>
//               <FontAwesomeIcon
//                 icon={faXmark}
//                 onClick={() => setIsShowSideBar(false)}
//                 className={styles.close_icon}
//               />
//             </div>
//           </div>
//           <ul className={"content-offcanvas mt-5 px-1"}>
//             <NavLink to={"/"} className={styles.canvasitem}>
//               <div className={styles.icon_offcanvas_wrapper}>
//                 <FontAwesomeIcon
//                   icon={faHome}
//                   className={styles.icon_offcanvas}
//                 />
//               </div>
//               <p className={styles.canvas_item_text}>خانه</p>
//             </NavLink>
//             <NavLink to={"/paziresh"} className={styles.canvasitem}>
//               <div className={styles.icon_offcanvas_wrapper}>
//                 <FontAwesomeIcon
//                   icon={faNewspaper}
//                   className={styles.icon_offcanvas}
//                 />
//               </div>
//               <p className={styles.canvas_item_text}>پذیرش</p>
//             </NavLink>
//             <NavLink to={"/repairs"} className={styles.canvasitem}>
//               <div className={styles.icon_offcanvas_wrapper}>
//                 <FontAwesomeIcon
//                   icon={faScrewdriverWrench}
//                   className={styles.icon_offcanvas}
//                 />
//               </div>
//               <p className={styles.canvas_item_text}>کارت تعمیر</p>
//             </NavLink>
//             <NavLink to={"/h"} className={styles.canvasitem}>
//               <div className={styles.icon_offcanvas_wrapper}>
//                 <FontAwesomeIcon
//                   icon={faLayerGroup}
//                   className={styles.icon_offcanvas}
//                 />
//               </div>
//               <p className={styles.canvas_item_text}>حسابداری</p>
//             </NavLink>
//             <NavLink to={"/g"} className={styles.canvasitem}>
//               <div className={styles.icon_offcanvas_wrapper}>
//                 <FontAwesomeIcon
//                   icon={faChartPie}
//                   className={styles.icon_offcanvas}
//                 />
//               </div>
//               <p className={styles.canvas_item_text}>گزارشات</p>
//             </NavLink>
//             <NavLink to={"/allform"} className={styles.canvasitem}>
//               <div className={styles.icon_offcanvas_wrapper}>
//                 <FontAwesomeIcon
//                   icon={faListCheck}
//                   className={styles.icon_offcanvas}
//                 />
//               </div>
//               <p className={styles.canvas_item_text}>فرم‌ها</p>
//             </NavLink>
//             <NavLink to={"/settings"} className={styles.canvasitem}>
//               <div className={styles.icon_offcanvas_wrapper}>
//                 <FontAwesomeIcon
//                   icon={faCalendarPlus}
//                   className={styles.icon_offcanvas}
//                 />
//               </div>
//               <p className={styles.canvas_item_text}>مدیریت</p>
//             </NavLink>
//             <li className={`${styles.canvasitem} ${styles.logout_item}`}>
//               <div className={styles.icon_offcanvas_wrapper}>
//                 <FontAwesomeIcon icon={faRightToBracket} />
//               </div>
//               <p className={styles.canvas_item_text}>خروج</p>
//             </li>
//           </ul>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }
// export default ResponsiveExample;

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faCalendarPlus,
  faChartPie,
  faHome,
  faLayerGroup,
  faListCheck,
  faNewspaper,
  faRightToBracket,
  faScrewdriverWrench,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Offcanvas.module.css";
import { NavLink } from "react-router-dom";

function ResponsiveDrawer({
  show,
  setIsShowSideBar,
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

      <List className="content-offcanvas ">
        {routes.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={styles.canvasitem}
            onClick={() => setIsShowSideBar(false)}
            end
          >
            <div className={styles.icon_offcanvas_wrapper}>
              <FontAwesomeIcon icon={icon} className={styles.icon_offcanvas} />
            </div>
            <p className={styles.canvas_item_text}>{label}</p>
          </NavLink>
        ))}

        <ListItem
          button
          className={`${styles.canvasitem} ${styles.logout_item}`}
        >
          <div className={styles.icon_offcanvas_wrapper}>
            <FontAwesomeIcon icon={faRightToBracket} />
          </div>
          <p className={styles.canvas_item_text}>خروج</p>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default ResponsiveDrawer;
