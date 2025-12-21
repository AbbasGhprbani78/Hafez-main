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
import ManagementStatus from "./Pages/ManagementStatus/ManagementStatus";
import PRepairmanPrivate from "./Components/Modules/Privates/PRepairmanPrivate";
import NonRepairmanPrivate from "./Components/Modules/Privates/NonRepairmanPrivate";
import RepairManPanel from "./Pages/RepairmanPanel/Main";
import PRepairIndex from "./Pages/RepairmanPanel/Home/Home";
import RunningTasks from "./Pages/RepairmanPanel/RunningTasks/RunningTasks";
import History from "./Pages/RepairmanPanel/History/History";
import Users from "./Pages/Users/Users";
import Account from "./Pages/Account/Account";
import Arboretum from "./Pages/Arboretum/Arboretum";
import Receptionreports from "./Pages/Report/Receptionreports";
import CustomerList from "./Pages/Report/CustomerList";
import CustomerHistory from "./Pages/Report/CustomerHistory";
import Consumableparts from "./Pages/Warehouse/Consumableparts";
import Consumptionofparts from "./Pages/Warehouse/Consumptionofparts";
import DailyBilling from "./Pages/finance/DailyBilling";
import WorkOfContractors from "./Pages/finance/WorkOfContractors";
import Mangement from "./Pages/Managment/Managment";
import ExpertReferralItem from "./Pages/ExpertReferralItem/ExpertReferralItem";
const routes = [
  {
    path: "/",
    element: (
      <NonRepairmanPrivate>
        <Home />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/draft",
    element: (
      <NonRepairmanPrivate>
        <Draft />
      </NonRepairmanPrivate>
    ),
  },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/paziresh",
    element: (
      <NonRepairmanPrivate>
        <Paziresh />
      </NonRepairmanPrivate>
    ),
  },
  { path: "/login", element: <Login /> },
  {
    path: "/allform",
    element: (
      <NonRepairmanPrivate>
        <AllForm />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/repairs/:id",
    element: (
      <NonRepairmanPrivate>
        <Repairs />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/repairsall",
    element: (
      <NonRepairmanPrivate>
        <RepairCardMain />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/repairplan",
    element: (
      <NonRepairmanPrivate>
        <RepairPlan />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/fund",
    element: (
      <NonRepairmanPrivate>
        <Fund />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/fund/:id",
    element: (
      <NonRepairmanPrivate>
        <FundItem />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/arboretum",
    element: (
      <NonRepairmanPrivate>
        <Arboretum />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/reports/reception-reports",
    element: (
      <NonRepairmanPrivate>
        <Receptionreports />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/reports/customer-list",
    element: (
      <NonRepairmanPrivate>
        <CustomerList />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/reports/customer-history",
    element: (
      <NonRepairmanPrivate>
        <CustomerHistory />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/warehouse/consumableparts",
    element: (
      <NonRepairmanPrivate>
        <Consumableparts />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/warehouse/consumptionofparts",
    element: (
      <NonRepairmanPrivate>
        <Consumptionofparts />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/finance/dailybilling",
    element: (
      <NonRepairmanPrivate>
        <DailyBilling />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/finance/workofcontractors",
    element: (
      <NonRepairmanPrivate>
        <WorkOfContractors />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/management/home",
    element: (
      <NonRepairmanPrivate>
        <Mangement />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/management/status",
    element: (
      <NonRepairmanPrivate>
        <ManagementStatus />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/account",
    element: (
      <NonRepairmanPrivate>
        <Account />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/users",
    element: (
      <NonRepairmanPrivate>
        <Users />
      </NonRepairmanPrivate>
    ),
  },
  {
    path: "/expert-referral/:id",
    element: (
      <NonRepairmanPrivate>
        <ExpertReferralItem />
      </NonRepairmanPrivate>
    ),
  },
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
];

export default routes;

// { path: "/expert-referral", element: <ExpertReferra /> },
