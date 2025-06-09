import { useEffect, useState } from "react";
import styles from "./Occultation.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import TableForm from "../../../Modules/Table/TableForm";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
import Modal from "../../../Modules/Modal/Modal";
import { Box } from "@mui/material";
import styles2 from "../../../../Pages/Repairs/Repairs.module.css";
import SearchAndSelectDropDwon from "../../../Modules/SearchAndSelectDropDwon/SearchAndSelectDropDwon";
import {
  errorMessage,
  successMessage,
} from "../../../Modules/Toast/ToastCustom";
import "react-toastify/dist/ReactToastify.css";
import { toFarsiNumber } from "../../../../utils/helper";
import SelectDropDown2 from "../../../Modules/SelectDropDown2/SelectDropDown2";
import apiClient from "../../../../config/axiosConfig";

export default function Occultation() {
  const columns = ["کد اظهار", "اظهارات کارشناس", "اظهارات مشتری", "عملیات"];
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(null);
  const [accultationModalData, setAccultationModalData] = useState({
    CustomerStatements: "",
    ExpertStatementsCode: "",
    ExpertStatmentsText: "",
  });

  const [accultationDataTable, setAccultationDataTable] = useState([]);
  const [errors, setErrors] = useState({});
  const [customerTexts, setCustomerTexts] = useState([]);
  const [expertTexts, setExpertTexts] = useState([]);

  const handleChange = (field, value, label) => {
    setAccultationModalData((prev) => {
      if (field === "ExpertStatementsCode") {
        return {
          ...prev,
          ExpertStatementsCode: value,
          ExpertStatmentsText: label || "",
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const addToTable = () => {
    const newErrors = {};
    if (!accultationModalData.CustomerStatements.trim()) {
      newErrors.CustomerStatements = "اظهار مشتری الزامی است.";
    }
    if (!accultationModalData.ExpertStatementsCode) {
      newErrors.ExpertStatementsCode = "کد اظهار الزامی است.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editMode) {
      setAccultationDataTable((prev) => {
        const updateTable = [...prev];
        updateTable[indexToEdit] = {
          CustomerStatements: accultationModalData.CustomerStatements,
          ExpertStatmentsText: accultationModalData.ExpertStatmentsText,
          ExpertStatementsCode: accultationModalData.ExpertStatementsCode,
        };
        return updateTable;
      });
      setEditMode(false);
      successMessage("اطلاعات با موفقیت تغییر کرد.");
    } else {
      const newTableRow = {
        CustomerStatements: accultationModalData.CustomerStatements,
        ExpertStatmentsText: accultationModalData.ExpertStatmentsText,
        ExpertStatementsCode: accultationModalData.ExpertStatementsCode,
      };

      setAccultationDataTable((prev) => [...prev, newTableRow]);
    }
    setShowModal(false);
    setAccultationModalData({
      CustomerStatements: "",
      ExpertStatements: "",
      ExpertStatementsCode: "",
    });
    setErrors({});
    successMessage("اطلاعات با موفقیت به جدول اضافه شد.");
  };

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };

  const deleteRow = (index) => {
    setAccultationDataTable((prev) => prev.filter((_, i) => i !== index));
    successMessage("ردیف با موفقیت حذف شد.");
  };

  const showEditModal = (index) => {
    setEditMode(true);
    setShowModal(true);
    const mainEditRow = [...accultationDataTable].filter((_, i) => i === index);
    setAccultationModalData({
      CustomerStatements: mainEditRow[0]?.CustomerStatements,
      ExpertStatmentsText: mainEditRow[0]?.ExpertStatmentsText,
      ExpertStatementsCode: mainEditRow[0]?.ExpertStatementsCode,
    });

    setIndexToEdit(index);
  };

  const getCustomerStatements = async () => {
    try {
      const response = await apiClient.get(
        `${apiClient}/app/customer-statements/`
      );
      if (response.status === 200) {
        setCustomerTexts(
          response.data.map((item) => ({
            value_id: item?.description,
            value: item?.description,
          }))
        );
      }
    } catch (error) {
      errorMessage(error.response.message);
    }
  };

  const getExpertStatements = async () => {
    try {
      const response = await apiClient.get(
        `${apiClient}/app/get-all-statement-code/`
      );
      if (response.status === 200) {
        setExpertTexts(
          response.data.map((item) => ({
            value_id: item?.id,
            value: item?.descriptions,
          }))
        );
      }
    } catch (error) {
      errorMessage(error.response.message);
    }
  };

  useEffect(() => {
    getCustomerStatements();
    getExpertStatements();
  }, []);

  return (
    <>
      <Modal showModal={showModal} setShowModal={handleToggleModal}>
        <div className="modal_content">
          <div className="modal_top">
            <span className="titel_top">عیب یابی جدید</span>
          </div>
          <div className="modal_bottom">
            <SelectDropDown2
              icon={faAngleDown}
              label={"اظهارات مشتری"}
              items={customerTexts}
              name="CustomerStatements"
              placeHolder={"اظهارات مشتری را انتخاب  کنید."}
              isDesirableValue={false}
              onChange={handleChange}
              value={accultationModalData.CustomerStatements}
            />
            {errors.CustomerStatements && (
              <p className="error">{errors.CustomerStatements}</p>
            )}

            <Box sx={{ marginY: "20px" }}>
              <SearchAndSelectDropDwon
                icon={faAngleDown}
                label={"اظهارات کارشناس"}
                items={expertTexts}
                name="ExpertStatementsCode"
                placeHolder={"اظهار کارشناس را انتخاب کنید."}
                isDesirableValue={false}
                onChange={handleChange}
                value={accultationModalData.ExpertStatementsCode}
              />
              {errors.ExpertStatementsCode && (
                <p className="error">{errors.ExpertStatementsCode}</p>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button2 onClick={addToTable}>تایید</Button2>
            </Box>
          </div>
        </div>
      </Modal>
      <div className={`${styles.box}`}>
        <span className={`${styles.box_title} subtitle-project`}>
          عیب یابی :
        </span>
        <div className={` ${styles.occultation_content}`}>
          <div className="wrap_button_repairs">
            <Button2 onClick={() => setShowModal(true)}>
              {"افزودن اظهار"}
            </Button2>
          </div>
          <div>
            <TableForm columns={columns}>
              {accultationDataTable.length > 0 &&
                accultationDataTable.map((item, i) => (
                  <TableRow className="statment-row-table" key={i}>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {toFarsiNumber(item.ExpertStatementsCode)}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {item.CustomerStatements}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {item.ExpertStatements}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => deleteRow(i)}
                          className={`${styles2.trash_row_table}`}
                        />
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          onClick={() => showEditModal(i)}
                          className={styles2.edit_row_table}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableForm>
          </div>

          <div className="p-form-actions">
            <div className="p-form-actions">
              <ConfirmBtn type="submit" isSubmitting={""} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// const changeHandler = (e) => {
//   const { name, value } = e.target;
//   setAccultationModalData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
//   setErrors((prev) => ({ ...prev, [name]: "" }));
// };

{
  /* <Texteara
                text={"اظهارات کارشناس"}
                value={accultationModalData.ExpertStatements}
                onChange={changeHandler}
                name={"ExpertStatements"}
              /> */
}

{
  /* <Texteara
              text={"اظهارات مشتری"}
              value={accultationModalData.CustomerStatements}
              onChange={changeHandler}
              name={"CustomerStatements"}
            /> */
}
