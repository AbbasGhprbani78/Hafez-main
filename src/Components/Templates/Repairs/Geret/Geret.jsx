import { useEffect, useState } from "react";
import styles from "./Geret.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import {
  faEnvelope,
  faPenToSquare,
  faTrash,
  faNewspaper,
  faAngleDown,
  faCheck,
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
export default function Geret({ data }) {
  const columns = ["عیب فنی", "تعمیرکار", "اجرت", "قیمت", "عملیات"];
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };
  const [editMode, setEditMode] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(null);
  const [expertTexts, setExpertTexts] = useState([]);
  const [geretModalData, setGeretModalData] = useState({
    ExpertStatementsCode: "",
    ExpertStatementsText: "",
    repairmanCode: "",
    repairmanText: "",
    wageCode: "",
    wageText: "",
    price: "",
    third_form: "",
  });

  const [wages, setWages] = useState([]);
  const [prices, setPrices] = useState();
  const [repairmen, setRepairmen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geretDataTable, setGeretDataTable] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value, label) => {
    let updatedFields = {
      [field]: value,
      [`${field.replace(/Code$/, "Text")}`]: label || "",
    };

    if (field === "ExpertStatementsCode" && Array.isArray(data?.table)) {
      const matchedItem = data.table.find(
        (item) => item.ExpertStatementsCode === value
      );
      if (matchedItem) {
        updatedFields.third_form = matchedItem.third_form_id || "";
      }
    }

    setGeretModalData((prev) => ({
      ...prev,
      ...updatedFields,
    }));

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleChangeWage = (name, value, label) => {
    const selectedPriceItem = prices.find((item) => item.value_id === value);
    setGeretModalData((prev) => ({
      ...prev,
      [name]: value,
      wageText: label,
      price: Number(selectedPriceItem?.value) || "",
    }));
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
          ExpertStatementsText: geretModalData.ExpertStatementsText,
          repairmanCode: geretModalData.repairmanCode,
          repairmanText: geretModalData.repairmanText,
          wageCode: geretModalData.wageCode,
          wageText: geretModalData.wageText,
          price: geretModalData.price,
          third_form: geretModalData.third_form,
        };
        return updateTable;
      });
      setEditMode(false);
      successMessage("اطلاعات با موفقیت تغییر کرد.");
    } else {
      const newTableRow = {
        ExpertStatementsCode: geretModalData.ExpertStatementsCode,
        ExpertStatementsText: geretModalData.ExpertStatementsText,
        repairmanCode: geretModalData.repairmanCode,
        repairmanText: geretModalData.repairmanText,
        wageCode: geretModalData.wageCode,
        wageText: geretModalData.wageText,
        price: geretModalData.price,
        third_form: geretModalData.third_form,
      };

      setGeretDataTable((prev) => [...prev, newTableRow]);
    }

    setShowModal(false);
    setGeretModalData({
      ExpertStatementsCode: "",
      ExpertStatementsText: "",
      repairmanCode: "",
      repairmanText: "",
      wageCode: "",
      wageText: "",
      price: "",
      third_form: "",
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
      ExpertStatementsText: mainEditRow[0]?.ExpertStatementsText,
      repairmanCode: mainEditRow[0]?.repairmanCode,
      repairmanText: mainEditRow[0]?.repairmanText,
      wageCode: mainEditRow[0]?.wageCode,
      wageText: mainEditRow[0]?.wageText,
      price: mainEditRow[0]?.price,
    });

    setIndexToEdit(index);
  };

  const getWagesPricerepairman = async () => {
    try {
      const response = await apiClient.get(
        `/app/get-statement/${geretModalData.ExpertStatementsCode}`
      );
      if (response.status === 200) {
        setRepairmen(
          response.data.repairmen.map((item) => ({
            value_id: item.id,
            value: item.full_name,
          }))
        );
        setWages(
          response.data.statements.map((item) => ({
            value_id: item.id,
            value: item.descriptions,
          }))
        );

        setPrices(
          response.data.statements.map((item) => ({
            value_id: item.id,
            value: item.price,
          }))
        );
      }
    } catch (error) {
      errorMessage(error?.response?.message || "خطا در دریافت داده‌ها");
    }
  };

  const postTableData = async () => {
    if (geretDataTable.length === 0) {
      errorMessage("جدول حداقل باید یک ردیف داشته باشد");
      return;
    }

    const filteredTable = geretDataTable.map((item) => ({
      statement: item.wageCode,
      repairman: item.repairmanCode,
      price: String(item.price),
      third_form: item.third_form,
    }));

    const payload = {
      table: filteredTable,
    };

    console.log(JSON.stringify(payload));
    setLoading(true);
    try {
      const response = await apiClient.post("/app/api/car-defects/", payload);

      if (response.status === 201 || response.status === 200) {
        successMessage("با موفقیت ارسال شد");
      }
    } catch (error) {
      errorMessage(error?.response?.data?.message || error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDataTable = async () => {
    try {
      const response = await apiClient.get("/app/api/car-defects/");
      if (response.status === 200) {
        console.log(response.data);
        // setGeretDataTable(response.data?.table);
      }
    } catch (error) {
      errorMessage(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (geretModalData.ExpertStatementsCode) {
      getWagesPricerepairman();
    }
  }, [geretModalData.ExpertStatementsCode]);

  useEffect(() => {
    getDataTable();
  }, []);

  useEffect(() => {
    if (Array.isArray(data?.table)) {
      setExpertTexts(
        data?.table?.map((item) => ({
          value_id: item?.ExpertStatementsCode,
          value: item?.ExpertStatmentsText,
        }))
      );
    } else {
      console.warn("data is not an array:", data);
    }
  }, [data]);

  console.log(geretModalData);
  console.log(data?.table);

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
              <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
                <SearchAndSelectDropDwon
                  icon={faAngleDown}
                  label={"اظهار کارشناس"}
                  items={expertTexts}
                  name="ExpertStatementsCode"
                  placeHolder={"اظهار کارشناس را انتخاب کنید"}
                  onChange={handleChange}
                  value={geretModalData.ExpertStatementsCode}
                />
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
                  label={"اجرت"}
                  items={wages}
                  name="wageCode"
                  placeHolder={" اجرت را انتخاب کنید"}
                  onChange={handleChangeWage}
                  value={geretModalData.wageCode}
                />
                {errors.wageCode && <p className="error">{errors.wageCode}</p>}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
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
            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              className={"distancerow"}
            >
              <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
                <SearchAndSelectDropDwon
                  icon={faAngleDown}
                  label={"تعمیرکار"}
                  items={repairmen}
                  name="repairmanCode"
                  placeHolder={"تعمیرکار را انتخاب کنید"}
                  onChange={handleChange}
                  value={geretModalData.repairmanCode}
                />
                {errors.repairmanCode && (
                  <p className="error">{errors.repairmanCode}</p>
                )}
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
                ExpertStatementsText: "",
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
                    {toFarsiNumber(item?.ExpertStatementsText)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(item?.repairmanText)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(item?.wageText)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(formatWithThousandSeparators(item?.price))}
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
            <Button2 onClick={postTableData} disable={loading}>
              تایید
              <FontAwesomeIcon icon={faCheck} />
            </Button2>
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

// {"table":[
//   {"statement":2,
//     "repairman":26,
//     "price":"580000",
//     "third_form":176
//   },
//   {"statement":3,
//     "repairman":34,
//     "price":"400000",
//     "third_form":177}
//   ]}
