import "./Home.css";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import Notifications from "../../Components/Modules/Notifications/Notifications";
import Chart from "../../Components/Modules/Chart/Chart";
import Box from "../../Components/Modules/Box/Box";
import { faBoxArchive, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <div className="content-conatiner">
        <SideBar />
        <div className="space-content">
          <Header title={"خانه"} />
          <div className="home-container">
            <div className="home-item div1">
              <Box title={"ظرفیت تعمیرگاه"} icon={faBoxArchive}></Box>
            </div>
            <div className="home-item div2">
              <Box title={"اطلاعات انبار"} icon={faBoxArchive}></Box>
            </div>
            <div className="home-item div3">
              <Box title={"تعداد پذیرش روزانه"} icon={faUsers}></Box>
            </div>
            <div className="home-item div4">
              <Notifications />
            </div>
            <div className="home-item div5">
              <Box title={"وضعیت لحظه ای تعمیرکار"} icon={faUsers}></Box>
            </div>
            <div className="home-item div6">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
