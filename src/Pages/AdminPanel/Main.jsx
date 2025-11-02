import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import {
  faHouse,
  faListCheck,
  faClockRotateLeft,
  faChartBar,
  faWallet,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const routes = [
  { path: "/p-admin", label: "خانه", icon: faHouse },
  { path: "/p-admin/account", label: "حساب", icon: faWallet },
  { path: "/p-admin/users", label: "کاربرها", icon: faUsers },
];

export default function Main() {
  return (
    <div className="content-conatiner">
      <Sidebar routes={routes} />
      <div className="space-content">
        <Header title={"دسترسی ادمین"} isPanel={"true"} routes={routes} />
        <Outlet />
      </div>
    </div>
  );
}
