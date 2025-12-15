import { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import MuiStepper from "../../Components/Modules/MuiStepper/MuiStepper";
import Pform1 from "../../Components/Templates/paziresh/Pform1/Pform1";
import Pform2 from "../../Components/Templates/paziresh/Pform2/Pform2";
import AcceptenceForm3 from "../../Components/Templates/paziresh/AcceptenceForm3/AcceptenceForm3";
import Pform4 from "../../Components/Templates/paziresh/Pform4/Pform4";
import Header from "../../Components/Modules/Header/Header";
import {
  errorMessage,
  successMessage,
  ToastContainerCustom,
} from "../../Components/Modules/Toast/ToastCustom";
import Grid from "@mui/material/Grid2";
import { MyContext } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPrint } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Paziresh() {
  const [content, setContent] = useState("اطلاعات اولیه مشتری:");
  const [formId, setFormId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [allDataForms, setAllDataForms] = useState({});
  const [loading, setLoading] = useState(false);
  const { currentTab, setCurrentTab, idForm, setIdForm } =
    useContext(MyContext);

  const printRef = useRef();
  const navigate = useNavigate();

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
      if (!editMode) {
        setEditMode(true);
      }
    }
  };

  const getDataAllForm = async () => {
    try {
      const response = await apiClient.get(
        `/app/get-complated-form/${idForm ? idForm : formId}`
      );
      if (response.status === 200) {
        setAllDataForms(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataEditForms = async () => {
    try {
      const response = await apiClient.get(
        `/app/get-full-complated-form/${idForm ? idForm : formId}/`
      );
      if (response.status === 200) {
        setAllDataForms(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmFromHandler = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post(
        `/app/forms-update-step-reception-desk/${idForm ? idForm : formId}`
      );
      if (response.status == 200) {
        successMessage("فرم با موفقیت تکمیل و تایید شد");
        navigate("/repairsall");
      }
    } catch (error) {
      console.log(error);
      errorMessage("خطا در تایید فرم");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!idForm && !formId) {
      setCurrentTab(1);
    }
  }, [idForm, formId]);

  useEffect(() => {
    return () => {
      setIdForm("");
      setCurrentTab(1);
    };
  }, []);

  useEffect(() => {
    if (idForm || formId) {
      getDataAllForm();
    }
  }, [idForm, formId]);

  useEffect(() => {
    if (editMode) {
      getDataEditForms();
    }
  }, [editMode]);

  return (
    <Grid size={12} sx={{ display: "flex" }}>
      <SideBar />
      <ToastContainerCustom />
      <div className="space-content scroll-contant" ref={printRef}>
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
              form1={allDataForms.customer_form}
              editMode={editMode}
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
              form2Data={allDataForms.customer_form_two}
              editMode={editMode}
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
              form3={allDataForms.customer_form_three}
            />
          </div>

          <div
            style={{
              display: currentTab === 4 ? "block" : "none",
              width: "100%",
              marginBottom: "1.5rem",
            }}
          >
            <Pform4 />
          </div>
        </Grid>
        {!(
          (currentTab === 4 &&
            allDataForms?.customer_form?.step_form !== "reception desk") ||
          allDataForms?.customer_form?.step_form !== "done"
        ) && (
          <div className="no-print confirmation-btns">
            <button
              className="edit-btn confirmation-btn"
              onClick={() => setCurrentTab(3)}
            >
              قبلی
              <FontAwesomeIcon icon={faPen} className="penicon" />
            </button>
            <button
              className="print-btn confirmation-btn"
              onClick={() => window.print()}
            >
              پرینت
              <FontAwesomeIcon icon={faPrint} />
            </button>
            <button
              className="print-btn confirmation-btn"
              onClick={confirmFromHandler}
              disabled={loading}
            >
              {loading ? "درحال تایید" : "تایید"}
              <FontAwesomeIcon icon={faPrint} />
            </button>
          </div>
        )}
      </div>
    </Grid>
  );
}
