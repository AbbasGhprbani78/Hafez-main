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
    { path: "/p-repairman", label: "خانه", icon: faHouse },
    { path: "/p-repairman/tasks", label: "تسک ها", icon: faListCheck },
    { path: "/p-repairman/history", label: "سوابق", icon: faClockRotateLeft },
    { path: "/p-repairman/reports", label: "گزارشات", icon: faChartBar },
  ];
  return (
    <div className="content-conatiner">
      <Sidebar routes={routes} />
      <div className="space-content">
        <Header title={"پنل تعمیرکار"} isPanel={"true"} routes={routes} />
        <Outlet />
      </div>
    </div>
  );
}
