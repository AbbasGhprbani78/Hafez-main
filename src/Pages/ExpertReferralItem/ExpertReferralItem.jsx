import { useContext, useEffect, useState } from "react";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import AcceptenceForm3 from "../../Components/Templates/paziresh/AcceptenceForm3/AcceptenceForm3";
import Grid from "@mui/material/Grid2";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/context";
import apiClient from "../../config/axiosConfig";
import { ToastContainerCustom } from "../../Components/Modules/Toast/ToastCustom";
import { errorMessage } from "../../Components/Modules/Toast/ToastCustom";
import CircularProgress from "@mui/material/CircularProgress";

export default function ExpertReferralItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentTab } = useContext(MyContext);
  const [formId, setFormId] = useState(id || "");
  const [content, setContent] = useState("اظهارات مشتری:");

  useEffect(() => {
    if (id) {
      setFormId(id);
      setCurrentTab(3);
    }
  }, [id]);

  const handleNextTab = () => {
    return false;
  };

  const handlePrevTab = () => {
    navigate("/expert-referral");
  };

  return (
    <Grid size={12} sx={{ display: "flex" }}>
      <SideBar />
      <ToastContainerCustom />
      <div className="space-content scroll-contant">
        <Header
          title={content}
          disabledButton={true}
          key={999}
          disableBottomTitle={true}
        />
        <Grid container size={12} spacing={2}>
          <div style={{ display: "block", width: "100%", marginTop: "1.5rem" }}>
            <AcceptenceForm3
              nextTab={handleNextTab}
              prevTab={handlePrevTab}
              setContent={setContent}
              formId={formId}
              currentTab={3}
              fromExpertReferral={true}
            />
          </div>
        </Grid>
      </div>
    </Grid>
  );
}
