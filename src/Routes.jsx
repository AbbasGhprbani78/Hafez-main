import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Paziresh from "./Pages/Paziresh/Paziresh";
import Login from "./Pages/Login/Login";
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
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },

  {
    //خانه
    path: "/",
    element: (
      <NonRepairmanPrivate>
        <Home />
      </NonRepairmanPrivate>
    ),
  },
  {
    //پذیرش
    path: "/admission",
    element: (
      <NonRepairmanPrivate>
        <Paziresh />
      </NonRepairmanPrivate>
    ),
  },
  {
    //فرم ها
    path: "/allform",
    element: (
      <NonRepairmanPrivate>
        <AllForm />
      </NonRepairmanPrivate>
    ),
  },
  {
    //کارت های تعمیر
    path: "/repairsall",
    element: (
      <NonRepairmanPrivate>
        <RepairCardMain />
      </NonRepairmanPrivate>
    ),
  },
  {
    //حسابداری
    path: "/fund",
    element: (
      <NonRepairmanPrivate>
        <Fund />
      </NonRepairmanPrivate>
    ),
  },
  {
    //درختواره
    path: "/arboretum",
    element: (
      <NonRepairmanPrivate>
        <Arboretum />
      </NonRepairmanPrivate>
    ),
  },
  {
    //گزارش پذیرش
    path: "/reports/reception-reports",
    element: (
      <NonRepairmanPrivate>
        <Receptionreports />
      </NonRepairmanPrivate>
    ),
  },
  {
    //لیست مشتریان
    path: "/reports/customer-list",
    element: (
      <NonRepairmanPrivate>
        <CustomerList />
      </NonRepairmanPrivate>
    ),
  },
  {
    //سابقه مشتریان
    path: "/reports/customer-history",
    element: (
      <NonRepairmanPrivate>
        <CustomerHistory />
      </NonRepairmanPrivate>
    ),
  },
  {
    // مصرف قطعات
    path: "/warehouse/consumableparts",
    element: (
      <NonRepairmanPrivate>
        <Consumableparts />
      </NonRepairmanPrivate>
    ),
  },
  {
    //قطعات پرمصرف
    path: "/warehouse/consumptionofparts",
    element: (
      <NonRepairmanPrivate>
        <Consumptionofparts />
      </NonRepairmanPrivate>
    ),
  },
  {
    //صورتحساب روزانه
    path: "/finance/dailybilling",
    element: (
      <NonRepairmanPrivate>
        <DailyBilling />
      </NonRepairmanPrivate>
    ),
  },
  {
    //کارکرد پیمانکاران
    path: "/finance/workofcontractors",
    element: (
      <NonRepairmanPrivate>
        <WorkOfContractors />
      </NonRepairmanPrivate>
    ),
  },
  {
    //داشبورد مدیریت
    path: "/management/home",
    element: (
      <NonRepairmanPrivate>
        <Mangement />
      </NonRepairmanPrivate>
    ),
  },
  {
    //وضعیت ها
    path: "/management/status",
    element: (
      <NonRepairmanPrivate>
        <ManagementStatus />
      </NonRepairmanPrivate>
    ),
  },
  {
    //حساب
    path: "/management/account",
    element: (
      <NonRepairmanPrivate>
        <Account />
      </NonRepairmanPrivate>
    ),
  },
  {
    //کاربران
    path: "/management/users",
    element: (
      <NonRepairmanPrivate>
        <Users />
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
    //سینگل فاکتور
    path: "/fund/:id",
    element: (
      <NonRepairmanPrivate>
        <FundItem />
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
  {
    path: "/repairplan",
    element: (
      <NonRepairmanPrivate>
        <RepairPlan />
      </NonRepairmanPrivate>
    ),
  },
];

export default routes;

// { path: "/expert-referral", element: <ExpertReferra /> },
