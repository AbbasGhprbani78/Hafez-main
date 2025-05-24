import Home from "./src/Pages/Home/Home";
import SignUp from "./src/Pages/SignUp/SignUp";
import Paziresh from "./src/Pages/Paziresh/Paziresh";
import Login from "./src/Pages/Login/Login";
import Draft from "./src/Pages/Draft/Draft";
import AllForm from "./src/Pages/AllForm/AllForm";
import Repairs from "./src/Pages/Repairs/Repairs";
import RepairPlan from "./src/Pages/RepairPlan/RepairPlan";
import Fund from "./src/Pages/Fund/Fund";
import FundItem from "./src/Pages/Fund/FundItem";
import RepairCardMain from "./src/Pages/RepairCard/RepairCardMain";
import ManagementPage from "./src/Pages/Management/ManagementPage";
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
];

export default routes;
