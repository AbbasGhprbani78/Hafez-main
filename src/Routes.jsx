import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Paziresh from "./Pages/Paziresh/Paziresh";
import Login from "./Pages/Login/Login";
import Draft from "./Pages/Draft/Draft";
import AllForm from "./Pages/AllForm/AllForm";
import Repairs from "./Pages/Repairs/Repairs";
import RepairPlan from "./Pages/RepairPlan/RepairPlan";
import Fund from "./Pages/Fund/Fund";
import FundItem from "./Pages/Fund/FundItem";
import RepairCardMain from "./Pages/RepairCard/RepairCardMain";
import ManagementPage from "./Pages/Management/ManagementPage";
import PRepairmanPrivate from "./Components/Modules/Privates/PRepairmanPrivate";
import RepairManPanel from "./Pages/RepairmanPanel/index";
import PRepairIndex from "./Pages/RepairmanPanel/Index/Index";
import RunningTasks from "./Pages/RepairmanPanel/RunningTasks/RunningTasks";
import History from "./Pages/RepairmanPanel/History/History";
const routes = [
  { path: "/", element: <Home /> },
  { path: "/draft", element: <Draft /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/paziresh", element: <Paziresh /> },
  { path: "/login", element: <Login /> },
  { path: "/allform", element: <AllForm /> },
  { path: "/repairs", element: <Repairs /> },
  // { path: "/repairs", element: <RepairCardMain /> },
  { path: "/repairplan", element: <RepairPlan /> },
  { path: "/fund", element: <Fund /> },
  { path: "/fund/:id", element: <FundItem /> },
  { path: "/settings", element: <ManagementPage /> },

  {
    path: "/p-repairman/*",
    element: (
      <PRepairmanPrivate>
        <RepairManPanel />
      </PRepairmanPrivate>
    ),
    children: [
      { path: "", element: <PRepairIndex /> },
      { path: "tasks", element: <RunningTasks /> },
      { path: "history", element: <History /> },
      // { path: "courses", element: <AdminCourses /> },
    ],
  },
];

export default routes;
