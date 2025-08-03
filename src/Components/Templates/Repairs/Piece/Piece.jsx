import { useState } from "react";
import styles from "./Piece.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import {
  faEnvelope,
  faPenToSquare,
  faTrash,
  faAngleDown,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import TableForm from "../../../Modules/Table/TableForm";
import { Box, TableCell, TableRow } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../../Modules/Modal/Modal";
import styles2 from "../../../../Pages/Repairs/Repairs.module.css";
import SearchAndSelectDropDwon from "../../../Modules/SearchAndSelectDropDwon/SearchAndSelectDropDwon";
import InputPrice from "../../../Modules/InputPrice/InputPrice";
import {
  formatWithThousandSeparators,
  toEnglishNumber,
  toFarsiNumber,
} from "../../../../utils/helper";
import InputRadio from "../../../Modules/InputRadio/InputRadio";
import Input from "../../../Modules/Input/Input";
import { successMessage } from "../../../Modules/Toast/ToastCustom";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
export default function Piece() {
  const data = {
    data1: [
      {
        value_id: 1,
        value: "قطع1",
      },
      {
        value_id: 2,
        value: "قطعه 2",
      },
      {
        value_id: 3,
        value: "قطعه 3",
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
        value: "مارک 1",
      },
      {
        value_id: 2,
        value: "مارک 2",
      },
      {
        value_id: 3,
        value: "مارک 3",
      },
    ],
  };

  const columns = [
    "نام قطعه",
    "مارک قطعه",
    "قیمت",
    "تعمیرکار",
    "تعداد",
    "گارانتی",
    "عملیات",
  ];

  const [editMode, setEditMode] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [piceModalData, setPiceModalData] = useState({
    pieceCode: "",
    pieceText: "",
    markCode: "",
    markText: "",
    price: "",
    repairmanCode: "",
    repairmanText: "",
    numberPiece: "",
    iswarranty: false,
  });

  const [piceDataTable, setPiceDataTable] = useState([]);

  const handleChange = (field, value, label) => {
    setPiceModalData((prev) => {
      return {
        ...prev,
        [field]: value,
        [`${field.replace(/Code$/, "Text")}`]: label || "",
      };
    });

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePriceChange = (value) => {
    setPiceModalData((prev) => ({
      ...prev,
      price: value,
    }));

    setErrors((prev) => ({ ...prev, price: "" }));
  };

  const handleWarrantyChange = (e) => {
    const value = e.target.value === "true";
    setPiceModalData((prev) => ({
      ...prev,
      iswarranty: value,
    }));
  };

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };

  const deleteRow = (index) => {
    setPiceDataTable((prev) => prev.filter((_, i) => i !== index));
    successMessage("ردیف با موفقیت حذف شد.");
  };

  const showEditModal = (index) => {
    setEditMode(true);
    setShowModal(true);
    const mainEditRow = [...piceDataTable].filter((_, i) => i === index);
    setPiceModalData({
      pieceCode: mainEditRow[0]?.pieceCode,
      pieceText: mainEditRow[0]?.pieceText,
      markCode: mainEditRow[0]?.markCode,
      markText: mainEditRow[0]?.markText,
      price: mainEditRow[0]?.price,
      repairmanCode: mainEditRow[0]?.repairmanCode,
      repairmanText: mainEditRow[0]?.repairmanText,
      numberPiece: mainEditRow[0]?.numberPiece,
      iswarranty: mainEditRow[0]?.iswarranty,
    });

    setIndexToEdit(index);
  };

  const addToTable = () => {
    const newErrors = {};
    if (!piceModalData.pieceCode.trim()) {
      newErrors.pieceCode = "کد قطعه الزامی است.";
    }

    if (!piceModalData.markCode.trim()) {
      newErrors.markCode = "مارک الزامی است.";
    }

    if (!piceModalData.price.trim()) {
      newErrors.price = "قیمت الزامی است.";
    } else if (isNaN(piceModalData.price) || Number(piceModalData.price) <= 0) {
      newErrors.price = "قیمت باید یک عدد مثبت باشد.";
    }

    if (!piceModalData.repairmanCode.trim()) {
      newErrors.repairmanCode = "کد تعمیرکار الزامی است.";
    }

    if (!piceModalData.numberPiece.trim()) {
      newErrors.numberPiece = "تعداد قطعه الزامی است.";
    } else if (
      !/^\d+$/.test(piceModalData.numberPiece) ||
      Number(piceModalData.numberPiece) <= 0
    ) {
      newErrors.numberPiece = "تعداد قطعه باید یک عدد صحیح مثبت باشد.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editMode) {
      setPiceDataTable((prev) => {
        const updateTable = [...prev];
        updateTable[indexToEdit] = {
          pieceCode: piceModalData.pieceCode,
          pieceText: piceModalData.pieceText,
          markCode: piceModalData.markCode,
          markText: piceModalData.markText,
          price: piceModalData.price,
          repairmanCode: piceModalData.repairmanCode,
          repairmanText: piceModalData.repairmanText,
          numberPiece: piceModalData.numberPiece,
          iswarranty: piceModalData.iswarranty,
        };
        return updateTable;
      });
      setEditMode(false);
      successMessage("اطلاعات با موفقیت تغییر کرد.");
    } else {
      const newTableRow = {
        pieceCode: piceModalData.pieceCode,
        pieceText: piceModalData.pieceText,
        markCode: piceModalData.markCode,
        markText: piceModalData.markText,
        price: piceModalData.price,
        repairmanCode: piceModalData.repairmanCode,
        repairmanText: piceModalData.repairmanText,
        numberPiece: piceModalData.numberPiece,
        iswarranty: piceModalData.iswarranty,
      };

      setPiceDataTable((prev) => [...prev, newTableRow]);
    }

    setShowModal(false);
    setPiceModalData({
      pieceCode: "",
      pieceText: "",
      markCode: "",
      markText: "",
      price: "",
      repairmanCode: "",
      repairmanText: "",
      numberPiece: "",
      iswarranty: false,
    });
    setErrors({});
    successMessage("اطلاعات با موفقیت به جدول اضافه شد.");
  };

  const sendSms = () => {};

  return (
    <>
      <Modal showModal={showModal} setShowModal={handleToggleModal}>
        <div className="modal_top">
          <span className="titel_top">افزودن قطعه جدید</span>
        </div>
        <div className="modal_bottom">
          <Grid
            container
            className={"distancerow"}
            rowSpacing={2}
            columnSpacing={4}
          >
            <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
              <SearchAndSelectDropDwon
                icon={faAngleDown}
                label={"نام قطعه"}
                items={data.data1}
                name="pieceCode"
                placeHolder={" قطعه را انتخاب کنید"}
                onChange={handleChange}
                value={piceModalData.pieceCode}
              />
              {errors.pieceCode && <p className="error">{errors.pieceCode}</p>}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
              <SearchAndSelectDropDwon
                icon={faAngleDown}
                label={"مارک قطعه"}
                items={data.data3}
                name="markCode"
                placeHolder={"قطعه را انتخاب کنید انتخاب کنید"}
                onChange={handleChange}
                value={piceModalData.markCode}
              />
              {errors.markCode && <p className="error">{errors.markCode}</p>}
            </Grid>
          </Grid>
          <Grid
            container
            className={"distancerow"}
            rowSpacing={2}
            columnSpacing={4}
          >
            <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
              <InputPrice
                label="قیمت "
                value={piceModalData.price}
                onChange={handlePriceChange}
                name="price"
                maxLength={30}
              />
              {errors.price && <p className="error">{errors.price}</p>}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
              <SearchAndSelectDropDwon
                icon={faAngleDown}
                label={"تعمیرکار"}
                items={data.data2}
                name="repairmanCode"
                placeHolder={" تعمیرکار را انتخاب کنید"}
                onChange={handleChange}
                value={piceModalData.repairmanCode}
              />
              {errors.repairmanCode && (
                <p className="error">{errors.repairmanCode}</p>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            className={"distancerow"}
            rowSpacing={2}
            columnSpacing={4}
          >
            <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
              <Input
                label={"تعداد "}
                styled={"inputtire"}
                placeholder="تعداد قطعه"
                name="numberPiece"
                value={toFarsiNumber(piceModalData.numberPiece)}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const englishValue = toEnglishNumber(value);
                  const digitRegex = /^\d*$/;

                  if (digitRegex.test(englishValue)) {
                    setPiceModalData((prevState) => ({
                      ...prevState,
                      [name]: englishValue,
                    }));
                    setErrors((prev) => ({ ...prev, [name]: "" }));
                  }
                }}
              />
              {errors.numberPiece && (
                <p className="error">{errors.numberPiece}</p>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
              <div className={styles.wrap_radio}>
                <span className="label_input">گارانتی</span>
                <InputRadio
                  text="دارد"
                  onChange={handleWarrantyChange}
                  value={"true"}
                  checked={piceModalData.iswarranty == true}
                  name={"iswarranty"}
                />
                <InputRadio
                  text="ندارد"
                  onChange={handleWarrantyChange}
                  value={"false"}
                  checked={piceModalData.iswarranty == false}
                  name={"iswarranty"}
                />
              </div>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button2 onClick={addToTable}>تایید</Button2>
          </Box>
        </div>
      </Modal>
      <div className={`${styles.box}`}>
        <span className={`${styles.box_title} subtitle-project`}>قطعه :</span>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: "1rem",
          }}
        >
          <div className={`${styles.wrap_drop} `}>
            <span className={styles.text_drop}>تامین کننده :</span>
            <SearchAndSelectDropDwon
              text={"خدمات دهنده"}
              icon={faAngleDown}
              label={""}
              items={[]}
              name="ExpertStatementsCode"
              placeHolder={"خدمات دهنده"}
              onChange={""}
              value={""}
            />
          </div>
          <Button2 onClick={""}>مشاهده جزئیات گارانتی</Button2>
        </Box>
        <div className={`${styles.wrap_actions} wrap_button_repairs`}>
          <Button2
            onClick={() => {
              setErrors({});
              setPiceModalData({
                pieceCode: "",
                pieceText: "",
                markCode: "",
                markText: "",
                price: "",
                repairmanCode: "",
                repairmanText: "",
                numberPiece: "",
                iswarranty: false,
              });
              setShowModal(true);
            }}
          >
            {"افزودن قطعه"}
          </Button2>
          <Button2 onClick={""} icon={faEnvelope}>
            {"ارسال پیامک"}
          </Button2>
        </div>

        <TableForm columns={columns}>
          {piceDataTable.length > 0 &&
            piceDataTable.map((item, i) => (
              <TableRow className="statment-row-table" key={i}>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(item.pieceText)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(item.markText)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(formatWithThousandSeparators(item.price))}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {item.repairmanText}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(item.numberPiece)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {item.iswarranty ? (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{ color: "var(--color-3)" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      style={{ color: "var(--color-17)" }}
                    />
                  )}
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
    </>
  );
}
