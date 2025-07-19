import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import {
  faHouse,
  faListCheck,
  faClockRotateLeft,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
export default function index() {
  const routes = [
    { path: "/dashboard", label: "خانه", icon: faHouse },
    { path: "/tasks", label: "تسک ها", icon: faListCheck },
    { path: "/history", label: "سوابق", icon: faClockRotateLeft },
    { path: "/reports", label: "گزارشات", icon: faChartBar },
  ];
  return (
    <div className="content-conatiner">
      <Sidebar routes={routes} />
      <div className="space-content">
        <Header title={"پنل تعمیرکار"} isPanel={"true"} />
        <Outlet />
      </div>
    </div>
  );
}
