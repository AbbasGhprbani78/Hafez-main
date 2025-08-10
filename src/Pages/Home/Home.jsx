import "./Home.css";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import Notifications from "../../Components/Modules/Notifications/Notifications";
import Chart from "../../Components/Modules/Chart/Chart";
import { faBoxArchive, faUsers } from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid2";
import BoxCard from "../../Components/Modules/Box/Box";
import { Box, TableCell, TableRow } from "@mui/material";
import TableForm from "../../Components/Modules/Table/TableForm";
import Button2 from "../../Components/Modules/Button2/Button2";
const columns = [
  "کد",
  "نام تعمیرکار",
  "تخصص تعمیرکار",
  "قابلیت زمانی تعمیرکار",
  "وضعیت",
  "عملیات",
];

const data = [
  {
    id: "0012",
    repairmanname: "مهدی رضائی",
    respairmanexp: "مکانیک",
    timework: "3 ساعت کار در روز",
    status: "1",
  },
  {
    id: "0013",
    repairmanname: "نیما سلیمانی",
    respairmanexp: "برق",
    timework: "8 ساعت کار در روز",
    status: "2",
  },
  {
    id: "0014",
    repairmanname: "سعید رضائی",
    respairmanexp: "صافکاری",
    timework: "10 ساعت کار در روز",
    status: "3",
  },
  {
    id: "0014",
    repairmanname: "رضا احمدی",
    respairmanexp: "نقاشی",
    timework: "3 ساعت کار در روز",
    status: "1",
  },
];
export default function Home() {
  return (
    <>
      <div className="content-conatiner">
        <SideBar />
        <div className="space-content">
          <Header title={"خانه"} />
          <div className="home-container">
            <div className="home-item div1">
              <BoxCard title={"ظرفیت تعمیرگاه"} icon={faBoxArchive}>
                <Grid
                  container
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <span className={"titleone"}>سالن</span>
                    <span className="value-one">3</span>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <span className={"titleone"}>تجهیزات</span>
                    <span className="value-one">124</span>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <span className={"titleone"}>تعمیرکار</span>
                    <span className="value-one">23</span>
                  </Box>
                </Grid>
              </BoxCard>
            </div>
            <div className="home-item div2">
              <BoxCard title={"اطلاعات انبار"} icon={faBoxArchive}>
                <Grid container gap={12} sx={{ width: "100%", height: "100%" }}>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.3rem",
                      padding: "1.2rem",
                    }}
                  >
                    <li className="item-box2">کسری انبار</li>
                    <li className="item-box2">موجودی انبار</li>
                  </ul>
                </Grid>
              </BoxCard>
            </div>
            <div className="home-item div3">
              <BoxCard title={"تعداد پذیرش روزانه"} icon={faUsers}>
                <span className="value-one">56</span>
              </BoxCard>
            </div>
            <div className="home-item div4">
              <Notifications />
            </div>
            <div className="home-item div5">
              <Chart />
            </div>
            <div className="home-item div6" style={{ overflow: "hidden" }}>
              <div style={{ width: "100%", overflow: "hidden" }}>
                <BoxCard title={"وضعیت لحظه ای تعمیرکار"} icon={faUsers}>
                  <TableForm columns={columns} maxHeight={200}>
                    {data.length > 0 &&
                      data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {item.id}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {item.repairmanname}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {item.respairmanexp}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {item.timework}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {item.status}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            <Button2>مشاهده</Button2>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableForm>
                </BoxCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
