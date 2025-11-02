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
import RepairManPanel from "./Pages/RepairmanPanel/Main";
import PRepairIndex from "./Pages/RepairmanPanel/Home/Home";
import PAdminPrivate from "./Components/Modules/Privates/PAdminPrivate";
import PanelAdmin from "./Pages/AdminPanel/Main";
import PAdminIndex from "./Pages/AdminPanel/Home/Home";
import RunningTasks from "./Pages/RepairmanPanel/RunningTasks/RunningTasks";
import History from "./Pages/RepairmanPanel/History/History";
import Users from "./Pages/AdminPanel/Users/Users";
import Account from "./Pages/AdminPanel/Account/Account";
import Arboretum from "./Pages/Arboretum/Arboretum";
import Receptionreports from "./Pages/Report/Receptionreports";
import CustomerList from "./Pages/Report/CustomerList";
import CustomerHistory from "./Pages/Report/CustomerHistory";
import Consumableparts from "./Pages/Warehouse/Consumableparts";
import Consumptionofparts from "./Pages/Warehouse/Consumptionofparts";
import DailyBilling from "./Pages/finance/DailyBilling";
import WorkOfContractors from "./Pages/finance/WorkOfContractors";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/draft", element: <Draft /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/paziresh", element: <Paziresh /> },
  { path: "/login", element: <Login /> },
  { path: "/allform", element: <AllForm /> },
  { path: "/repairs/:id", element: <Repairs /> },
  { path: "/repairsall", element: <RepairCardMain /> },
  { path: "/repairplan", element: <RepairPlan /> },
  { path: "/fund", element: <Fund /> },
  { path: "/fund/:id", element: <FundItem /> },
  { path: "/management", element: <ManagementPage /> },
  { path: "/arboretum", element: <Arboretum /> },
  { path: "/report/reception-reports", element: <Receptionreports /> },
  { path: "/report/customer-list", element: <CustomerList /> },
  { path: "/report/customer-history", element: <CustomerHistory /> },
  { path: "/warehouse/consumableparts", element: <Consumableparts /> },
  { path: "/warehouse/consumptionofparts", element: <Consumptionofparts /> },
  { path: "/finance/dailybilling", element: <DailyBilling /> },
  { path: "/finance/workofcontractors", element: <WorkOfContractors /> },
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
    ],
  },
  {
    path: "/p-admin/*",
    element: (
      <PAdminPrivate>
        <PanelAdmin />
      </PAdminPrivate>
    ),
    children: [
      { path: "", element: <PAdminIndex /> },
      { path: "users", element: <Users /> },
      { path: "account", element: <Account /> },
    ],
  },
];

export default routes;
