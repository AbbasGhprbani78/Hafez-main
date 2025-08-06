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
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
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
import DeleContent from "../../../Modules/DeleteContent/DeleContent";

export default function Occultation({ data, id, getDataTable }) {
  const columns = ["کد اظهار", "اظهارات کارشناس", "اظهارات مشتری", "عملیات"];
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accultationModalData, setAccultationModalData] = useState({
    CustomerStatements: "",
    ExpertStatementsCode: "",
    ExpertStatmentsText: "",
    id: "",
  });

  const [accultationDataTable, setAccultationDataTable] = useState([]);
  const [errors, setErrors] = useState({});
  const [customerTexts, setCustomerTexts] = useState([]);
  const [expertTexts, setExpertTexts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [indexId, setIndexId] = useState({ id: "", index: "" });

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

    const newTableRow = {
      CustomerStatements: accultationModalData.CustomerStatements,
      ExpertStatmentsText: accultationModalData.ExpertStatmentsText,
      ExpertStatementsCode: accultationModalData.ExpertStatementsCode,
    };

    if (editMode) {
      setAccultationDataTable((prev) => {
        const updateTable = [...prev];
        updateTable[indexToEdit] = newTableRow;
        setTimeout(() => postDataTable(updateTable), 0);
        successMessage("با موفقیت ویرایش شد");
        return updateTable;
      });
      setEditMode(false);
    } else {
      setAccultationDataTable((prev) => {
        const updated = [...prev, newTableRow];

        setTimeout(() => postDataTable(updated), 0);
        successMessage("اطلاعات با موفقیت به جدول اضافه شد.");
        return updated;
      });
    }

    setShowModal(false);
    setAccultationModalData({
      CustomerStatements: "",
      ExpertStatements: "",
      ExpertStatementsCode: "",
    });
    setErrors({});
  };

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };

  const deleteRow = async () => {
    if (indexId.id) {
      setLoading(true);
      try {
        const response = await apiClient.delete("app/technical-defects/", {
          params: {
            form_id: indexId.id,
          },
        });
        if (response.status === 200) {
          successMessage("با موفقیت حذف شد");
          setAccultationDataTable((prev) =>
            prev.filter((_, i) => i !== indexId.index)
          );
          getDataTable();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setAccultationDataTable((prev) =>
        prev.filter((_, i) => i !== indexId.index)
      );
      successMessage(" با موفقیت حذف شد");
    }

    setShowModal(false);
    setShowDeleteModal(false);
  };

  const showEditModal = (index) => {
    setEditMode(true);
    setShowModal(true);
    const mainEditRow = [...accultationDataTable].filter((_, i) => i === index);

    setAccultationModalData({
      CustomerStatements: mainEditRow[0]?.CustomerStatements,
      ExpertStatmentsText: mainEditRow[0]?.ExpertStatmentsText,
      ExpertStatementsCode: Number(mainEditRow[0]?.ExpertStatementsCode),
    });

    setIndexToEdit(index);
  };

  const getCustomerStatements = async () => {
    try {
      const response = await apiClient.get(`/app/customer-statements/`);
      if (response.status === 200) {
        setCustomerTexts(
          response.data.map((item) => ({
            value_id: item?.description,
            value: item?.description,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getExpertStatements = async () => {
    try {
      const response = await apiClient.get(`/app/get-all-statement-code/`);
      if (response.status === 200) {
        setExpertTexts(
          response.data.map((item) => ({
            value_id: item?.id,
            value: item?.descriptions,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postDataTable = async (dataTable) => {
    if (!dataTable || dataTable.length === 0) {
      errorMessage("جدول حداقل باید یک ردیف داشته باشد");
      return;
    }

    const payload = {
      table: dataTable,
      form_id: id,
    };

    setLoading(true);
    try {
      const response = await apiClient.post("app/technical-defects/", payload);

      if (response.status === 201 || response.status === 200) {
        successMessage("با موفقیت ارسال شد");
      }
      getDataTable();
    } catch (error) {
      errorMessage(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerStatements();
    getExpertStatements();
  }, []);

  useEffect(() => {
    if (data) {
      const formattedData = data?.map((item) => ({
        CustomerStatements: item.customer_statement?.description || "",
        ExpertStatementsCode: item.expert_statement?.code || "",
        ExpertStatmentsText:
          item.expert_statement?.expert_statements_text || "",
        id: item.id,
      }));

      setAccultationDataTable(formattedData);
    }
  }, [data]);

  return (
    <>
      <Modal showModal={showModal} setShowModal={handleToggleModal}>
        {showDeleteModal ? (
          <>
            <DeleContent
              text={"آیا از حذف ردیف اطمینان دارید ؟"}
              close={handleToggleModal}
              onClick={deleteRow}
              loading={loading}
            />
          </>
        ) : (
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
        )}
      </Modal>
      <div className={`${styles.box}`}>
        <span className={`${styles.box_title} subtitle-project`}>
          عیب یابی :
        </span>
        <div className={` ${styles.occultation_content}`}>
          <div className="wrap_button_repairs">
            <Button2
              onClick={() => {
                setAccultationModalData({
                  CustomerStatements: "",
                  ExpertStatementsCode: "",
                  ExpertStatmentsText: "",
                });
                setShowModal(true);
              }}
            >
              عیب یابی جدید
            </Button2>
          </div>
          <div>
            <TableForm columns={columns}>
              {accultationDataTable?.length > 0 &&
                accultationDataTable.map((item, i) => (
                  <TableRow className="statment-row-table" key={i}>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {toFarsiNumber(item.ExpertStatementsCode)}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {toFarsiNumber(item.ExpertStatmentsText)}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {toFarsiNumber(item.CustomerStatements)}
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
                          onClick={() => {
                            setShowDeleteModal(true);
                            setShowModal(true);
                            setIndexId({
                              index: i,
                              id: item.id ? item.id : "",
                            });
                          }}
                          className={`${styles2.trash_row_table}`}
                        />
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          onClick={() => {
                            setShowDeleteModal(false);
                            showEditModal(i);
                          }}
                          className={styles2.edit_row_table}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableForm>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="p-form-actions">
            <div className="p-form-actions">
              <Button2 onClick={postDataTable} disable={loading}>
                تایید
                <FontAwesomeIcon icon={faCheck} />
              </Button2>
            </div>
          </div> */
}
