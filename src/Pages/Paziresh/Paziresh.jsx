import { useContext, useRef, useState } from "react";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import MuiStepper from "../../Components/Modules/MuiStepper/MuiStepper";
import Pform1 from "../../Components/Templates/paziresh/Pform1/Pform1";
import Pform2 from "../../Components/Templates/paziresh/Pform2/Pform2";
import AcceptenceForm3 from "../../Components/Templates/paziresh/AcceptenceForm3/AcceptenceForm3";
import Pform4 from "../../Components/Templates/paziresh/Pform4/Pform4";
import Header from "../../Components/Modules/Header/Header";
import { ToastContainerCustom } from "../../Components/Modules/Toast/ToastCustom";
import Grid from "@mui/material/Grid2";
import { MyContext } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPrint } from "@fortawesome/free-solid-svg-icons";

export default function Paziresh() {
  const [content, setContent] = useState("اطلاعات اولیه مشتری:");
  const [currentTab, setCurrentTab] = useState(2);
  const [formId, setFormId] = useState("");
  const { editMode, setEditMode } = useContext(MyContext);
  const printRef = useRef();

  const handleNextTab = () => {
    if (currentTab === 4) {
      return false;
    } else {
      setCurrentTab((prevTab) => prevTab + 1);
      if (editMode) {
        setEditMode(false);
      }
    }
  };

  const handlePrevTab = () => {
    if (currentTab === 1) {
      return false;
    } else {
      setCurrentTab((prevTab) => prevTab - 1);
      if (!editMode) {
        setEditMode(true);
      }
    }
  };

  return (
    <Grid size={12} sx={{ display: "flex" }}>
      <SideBar />
      <ToastContainerCustom />
      <div className="space-content" ref={printRef}>
        <Header
          title={content}
          disabledButton={true}
          key={999}
          disableBottomTitle={true}
        />
        <Grid container size={12} spacing={2}>
          <MuiStepper activeStep={currentTab} />
          <div
            style={{
              display: currentTab === 1 || currentTab === 4 ? "block" : "none",
              width: "100%",
            }}
          >
            <Pform1
              nextTab={handleNextTab}
              setContent={setContent}
              setFormId={setFormId}
              formId={formId}
              currentTab={currentTab}
            />
          </div>

          <div
            style={{
              display: currentTab === 2 || currentTab === 4 ? "block" : "none",
              width: "100%",
            }}
          >
            <Pform2
              nextTab={handleNextTab}
              prevTab={handlePrevTab}
              setContent={setContent}
              formId={formId}
              currentTab={currentTab}
            />
          </div>

          <div
            style={{
              display: currentTab === 3 || currentTab === 4 ? "block" : "none",
              width: "100%",
            }}
          >
            <AcceptenceForm3
              nextTab={handleNextTab}
              prevTab={handlePrevTab}
              setContent={setContent}
              formId={formId}
              currentTab={currentTab}
            />
          </div>

          <div
            style={{
              display: currentTab === 4 ? "block" : "none",
              width: "100%",
            }}
          >
            <Pform4 formId={formId} />
          </div>
        </Grid>

        {currentTab === 4 && (
          <div className="confirmation-btns">
            <button className="edit-btn confirmation-btn " onClick={""}>
              قبلی
              <FontAwesomeIcon icon={faPen} className={`penicon`} />
            </button>
            <button
              className="print-btn confirmation-btn"
              onClick={() => window.print()}
            >
              پرینت
              <FontAwesomeIcon icon={faPrint} />
            </button>
          </div>
        )}
      </div>
    </Grid>
  );
}
