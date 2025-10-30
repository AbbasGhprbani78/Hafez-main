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
    {
      label: "گزارشات",
      icon: faChartPie,
      subRoutes: [
        { path: "/report/reception-reports", label: "گزارش پذیرش" },
        { path: "/report/customer-list", label: "لیست مشتریان" },
        { path: "/report/customer-history", label: "سابقه مشتریان" },
      ],
    },
    { path: "/allform", label: "فرم‌ها", icon: faListCheck },
    { path: "/management", label: "مدیریت", icon: faCalendarPlus },
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
