import { useEffect, useState } from "react";
import styles from "./Geret.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import {
  faEnvelope,
  faPenToSquare,
  faTrash,
  faNewspaper,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import TableForm from "../../../Modules/Table/TableForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TableCell, TableRow } from "@mui/material";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
import Modal from "../../../Modules/Modal/Modal";
import OccultationItem from "../../../Modules/OccultationItem/OccultationItem";
import styles2 from "../../../../Pages/Repairs/Repairs.module.css";
import Grid from "@mui/material/Grid2";
import InputPrice from "../../../Modules/InputPrice/InputPrice";
import apiClient from "../../../../config/axiosConfig";
import {
  errorMessage,
  successMessage,
} from "../../../Modules/Toast/ToastCustom";
import "react-toastify/dist/ReactToastify.css";
import SearchAndSelectDropDwon from "../../../Modules/SearchAndSelectDropDwon/SearchAndSelectDropDwon";
import {
  formatWithThousandSeparators,
  toFarsiNumber,
} from "../../../../utils/helper";
export default function Geret() {
  const columns = ["کد اظهار", "عیب فنی", "تعمیرکار", "اجرت", "قیمت", "عملیات"];
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };
  const [editMode, setEditMode] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(null);
  const [expertTexts, setExpertTexts] = useState([]);

  const data = {
    data1: [
      {
        value_id: 1,
        value: "خاموش شدن موتور",
      },
      {
        value_id: 2,
        value: "روشن نشدن چراغ",
      },
      {
        value_id: 3,
        value: "کارنکردن برف پاک کن",
      },
    ],
    data2: [
      {
        value_id: 1,
        value: "عباس قربانی",
      },
      {
        value_id: 2,
        value: "احمد اسماعیلی",
      },
      {
        value_id: 3,
        value: "مهدی توسلی",
      },
    ],
    data3: [
      {
        value_id: 1,
        value: "اجرت 1",
      },
      {
        value_id: 2,
        value: "اجرت 2",
      },
      {
        value_id: 3,
        value: "اجرت 3",
      },
    ],
  };

  const [geretModalData, setGeretModalData] = useState({
    ExpertStatementsCode: "",
    technicalIssueCode: "",
    technicalIssueText: "",
    repairmanCode: "",
    repairmanText: "",
    wageCode: "",
    wageText: "",
    price: "",
  });

  const [geretDataTable, setGeretDataTable] = useState([]);

  const [errors, setErrors] = useState({});

  const handleChange = (field, value, label) => {
    setGeretModalData((prev) => {
      return {
        ...prev,
        [field]: value,
        [`${field.replace(/Code$/, "Text")}`]: label || "",
      };
    });

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePriceChange = (value) => {
    setGeretModalData((prev) => ({
      ...prev,
      price: value,
    }));

    setErrors((prev) => ({ ...prev, price: "" }));
  };

  const addToTable = () => {
    const newErrors = {};
    if (!geretModalData.ExpertStatementsCode) {
      newErrors.ExpertStatementsCode = "کد اظهار الزامی است";
    }
    if (!geretModalData.technicalIssueCode) {
      newErrors.technicalIssueCode = " کد عیب فنی الزامی است";
    }
    if (!geretModalData.repairmanCode) {
      newErrors.repairmanCode = "کد تعمیرکار الزامی است";
    }
    if (!geretModalData.wageCode) {
      newErrors.wageCode = "کد اجرت الزامی است";
    }
    if (!geretModalData.price) {
      newErrors.price = "وارد کردن قیمت الزامی است";
    } else if (
      isNaN(Number(geretModalData.price)) ||
      Number(geretModalData.price) < 0
    ) {
      newErrors.price = "قیمت باید عددی و غیر منفی باشد";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editMode) {
      setGeretDataTable((prev) => {
        const updateTable = [...prev];
        updateTable[indexToEdit] = {
          ExpertStatementsCode: geretModalData.ExpertStatementsCode,
          technicalIssueCode: geretModalData.technicalIssueCode,
          technicalIssueText: geretModalData.technicalIssueText,
          repairmanCode: geretModalData.repairmanCode,
          repairmanText: geretModalData.repairmanText,
          wageCode: geretModalData.wageCode,
          wageText: geretModalData.wageText,
          price: geretModalData.price,
        };
        return updateTable;
      });
      setEditMode(false);
      successMessage("اطلاعات با موفقیت تغییر کرد.");
    } else {
      const newTableRow = {
        ExpertStatementsCode: geretModalData.ExpertStatementsCode,
        technicalIssueCode: geretModalData.technicalIssueCode,
        technicalIssueText: geretModalData.technicalIssueText,
        repairmanCode: geretModalData.repairmanCode,
        repairmanText: geretModalData.repairmanText,
        wageCode: geretModalData.wageCode,
        wageText: geretModalData.wageText,
        price: geretModalData.price,
      };

      setGeretDataTable((prev) => [...prev, newTableRow]);
    }

    setShowModal(false);
    setGeretModalData({
      ExpertStatementsCode: "",
      technicalIssueCode: "",
      technicalIssueText: "",
      repairmanCode: "",
      repairmanText: "",
      wageCode: "",
      wageText: "",
      price: "",
    });
    setErrors({});
    successMessage("اطلاعات با موفقیت به جدول اضافه شد.");
  };

  const deleteRow = (index) => {
    setGeretDataTable((prev) => prev.filter((_, i) => i !== index));
    successMessage("ردیف با موفقیت حذف شد.");
  };

  const showEditModal = (index) => {
    setEditMode(true);
    setShowModal(true);
    const mainEditRow = [...geretDataTable].filter((_, i) => i === index);
    setGeretModalData({
      ExpertStatementsCode: mainEditRow[0]?.ExpertStatementsCode,
      technicalIssueCode: mainEditRow[0]?.technicalIssueCode,
      technicalIssueText: mainEditRow[0]?.technicalIssueText,
      repairmanCode: mainEditRow[0]?.repairmanCode,
      repairmanText: mainEditRow[0]?.repairmanText,
      wageCode: mainEditRow[0]?.wageCode,
      wageText: mainEditRow[0]?.wageText,
      price: mainEditRow[0]?.price,
    });

    setIndexToEdit(index);
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
      errorMessage(error?.response?.message || "خطا در دریافت داده‌ها");
    }
  };

  useEffect(() => {
    getExpertStatements();
  }, []);

  console.log(showModal);

  return (
    <>
      <Modal showModal={showModal} setShowModal={handleToggleModal}>
        <div className="modal_content">
          <div className="modal_top">
            <span className="titel_top">افزودن اجرت جدید</span>
          </div>
          <div className="modal_bottom">
            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              className={"distancerow"}
            >
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                <SearchAndSelectDropDwon
                  icon={faAngleDown}
                  label={"کد اظهار"}
                  items={expertTexts}
                  name="ExpertStatementsCode"
                  placeHolder={"کد اظهار را انتخاب کنید"}
                  onChange={handleChange}
                  value={geretModalData.ExpertStatementsCode}
                />
                {errors.ExpertStatementsCode && (
                  <p className="error">{errors.ExpertStatementsCode}</p>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                <SearchAndSelectDropDwon
                  icon={faAngleDown}
                  label={"عیب فنی"}
                  items={data.data1}
                  name="technicalIssueCode"
                  placeHolder={"عیب فنی را انتخاب کنید"}
                  onChange={handleChange}
                  value={geretModalData.technicalIssueCode}
                />
                {errors.technicalIssueCode && (
                  <p className="error">{errors.technicalIssueCode}</p>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              className={"distancerow"}
            >
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                <SearchAndSelectDropDwon
                  icon={faAngleDown}
                  label={"تعمیرکار"}
                  items={data.data2}
                  name="repairmanCode"
                  placeHolder={"تعمیرکار را انتخاب کنید"}
                  onChange={handleChange}
                  value={geretModalData.repairmanCode}
                />
                {errors.repairmanCode && (
                  <p className="error">{errors.repairmanCode}</p>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                <SearchAndSelectDropDwon
                  icon={faAngleDown}
                  label={"اجرت"}
                  items={data.data3}
                  name="wageCode"
                  placeHolder={" اجرت را انتخاب کنید"}
                  onChange={handleChange}
                  value={geretModalData.wageCode}
                />
                {errors.wageCode && <p className="error">{errors.wageCode}</p>}
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              className={"distancerow"}
            >
              <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
                <InputPrice
                  label="قیمت محصول"
                  value={geretModalData.price}
                  onChange={handlePriceChange}
                  name="price"
                  maxLength={30}
                />
                {errors.price && <p className="error">{errors.price}</p>}
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button2 onClick={addToTable}>تایید</Button2>
            </Box>
          </div>
        </div>
      </Modal>
      <div className={styles.box}>
        <span className={`${styles.box_title} subtitle-project`}>اجرت :</span>
        <div className={`${styles.wrap_actions} wrap_button_repairs`}>
          <Button2
            onClick={() => {
              handleToggleModal();
              setGeretModalData({
                ExpertStatementsCode: "",
                technicalIssueCode: "",
                technicalIssueText: "",
                repairmanCode: "",
                repairmanText: "",
                wageCode: "",
                wageText: "",
                price: "",
              });
            }}
          >
            {"افزودن اجرت"}
          </Button2>
          <Button2 onClick={""} icon={faEnvelope}>
            {"ارسال پیامک"}
          </Button2>
        </div>
        <div>
          <TableForm columns={columns}>
            {geretDataTable.length > 0 &&
              geretDataTable.map((item, i) => (
                <TableRow className="statment-row-table" key={i}>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(item.ExpertStatementsCode)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(item.technicalIssueText)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(item.repairmanText)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(item.wageCode)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(formatWithThousandSeparators(item.price))}
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
          <div className="p-form-actions">
            <ConfirmBtn type="submit" isSubmitting={""} />
          </div>
        </div>
        <p className={styles.sub_title}>نوع خدمات و انتخاب تعمیرکار :</p>
        <Grid
          container
          className={styles.occultationItem_container}
          rowSpacing={2}
          columnSpacing={4}
        >
          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <OccultationItem
              text={"تعمیرکار مکانیک"}
              placeHolder={"نام مکانیک"}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <OccultationItem
              text={"تعمیرکار صافکاری"}
              placeHolder={"نام صافکار"}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <OccultationItem text={"تعمیرکار نقاش"} placeHolder={"نام نقاش"} />
          </Grid>
        </Grid>
        <div className={styles.wrap_contract}>
          <FontAwesomeIcon icon={faNewspaper} />
          <p className={styles.contract_text}>قرارداد صافکاری - نقاشی</p>
        </div>
        <div className="p-form-actions">
          <div className="p-form-actions">
            <ConfirmBtn type="submit" isSubmitting={""} />
          </div>
        </div>
      </div>
    </>
  );
}
