import { useState } from "react";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import MuiStepper from "../../Components/Modules/MuiStepper/MuiStepper";
import Pform1 from "../../Components/Templates/paziresh/Pform1/Pform1";
import Pform2 from "../../Components/Templates/paziresh/Pform2/Pform2";
import AcceptenceForm3 from "../../Components/Templates/paziresh/AcceptenceForm3/AcceptenceForm3";
import Pform4 from "../../Components/Templates/paziresh/Pform4/Pform4";
import Header from "../../Components/Modules/Header/Header";
import { ToastContainerCustom } from "../../Components/Modules/Toast/ToastCustom";

import Grid from "@mui/material/Grid2";

export default function Paziresh() {
  const [content, setContent] = useState("اطلاعات اولیه مشتری:");
  const [currentTab, setCurrentTab] = useState(1);
  const [customer, setCustomer] = useState("");

  const handleNextTab = () => {
    if (currentTab === 4) {
      return false;
    } else {
      setCurrentTab((prevTab) => prevTab + 1);
    }
  };

  const handlePrevTab = () => {
    if (currentTab === 1) {
      return false;
    } else {
      setCurrentTab((prevTab) => prevTab - 1);
    }
  };

  return (
    <Grid size={12} sx={{ display: "flex" }}>
      <SideBar />
      <ToastContainerCustom />
      <div className="space-content">
        <Header
          title={content}
          disabledButton={true}
          key={999}
          disableBottomTitle={true}
        />
        <Grid container size={12}>
          <MuiStepper activeStep={currentTab} />
          {currentTab === 1 && (
            <Pform1
              nextTab={handleNextTab}
              setContent={setContent}
              setCoustomer={setCustomer}
            />
          )}
          {currentTab === 2 && (
            <Pform2
              nextTab={handleNextTab}
              prevTab={handlePrevTab}
              setContent={setContent}
              coustomer={customer}
            />
          )}
          {currentTab === 3 && (
            <AcceptenceForm3
              nextTab={handleNextTab}
              prevTab={handlePrevTab}
              setContent={setContent}
              customer={customer}
            />
          )}
          {currentTab === 4 && (
            <Pform4 prevTab={handlePrevTab} customer={customer} />
          )}
        </Grid>
      </div>
    </Grid>
  );
}
