import { useState } from "react";
import styles from "./Piece.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import {
  faEnvelope,
  faPenToSquare,
  faTrash,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import TableForm from "../../../Modules/Table/TableForm";
import { Box, TableCell, TableRow } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../../Modules/Modal/Modal";
import styles2 from "../../../../Pages/Repairs/Repairs.module.css";
import SearchAndSelectDropDwon from "../../../Modules/SearchAndSelectDropDwon/SearchAndSelectDropDwon";
import InputPrice from "../../../Modules/InputPrice/InputPrice";
import { toEnglishNumber, toFarsiNumber } from "../../../../utils/helper";
import InputRadio from "../../../Modules/InputRadio/InputRadio";
import Input from "../../../Modules/Input/Input";
export default function Piece() {
  const columns = [
    "نام قطعه",
    "مارک قطعه",
    "قیمت",
    "تعمیرکار",
    "تعداد",
    "گارانتی",
    "عملیات",
  ];
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

  const deleteRow = (index) => {};

  const showEditModal = (index) => {};

  const addToTable = () => {};

  const sendSms = () => {};

  console.log(piceModalData);
  return (
    <>
      <Modal showModal={showModal} setShowModal={handleToggleModal}>
        <div className="modal_content">
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
                  items={[]}
                  name="pieceCode"
                  placeHolder={"کد اظهار را انتخاب کنید"}
                  onChange={handleChange}
                  value={piceModalData.pieceCode}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                <SearchAndSelectDropDwon
                  icon={faAngleDown}
                  label={"مارک قطعه"}
                  items={[]}
                  name="markCode"
                  placeHolder={"قطعه را انتخاب کنید انتخاب کنید"}
                  onChange={handleChange}
                  value={piceModalData.markCode}
                />
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
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                <SearchAndSelectDropDwon
                  icon={faAngleDown}
                  label={"تعمیرکار"}
                  items={[]}
                  name="repairmanCode"
                  placeHolder={" تعمیرکار را انتخاب کنید"}
                  onChange={handleChange}
                  value={piceModalData.repairmanCode}
                />
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
                    const digitRegex = /^[0-9]?$/;

                    if (digitRegex.test(value)) {
                      const englishValue = toEnglishNumber(value);
                      setPiceModalData((prevState) => ({
                        ...prevState,

                        [name]: englishValue,
                      }));
                    }
                  }}
                />
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
              <Button2>تایید</Button2>
            </Box>
          </div>
        </div>
      </Modal>
      <div className={`${styles.box}`}>
        <span className={`${styles.box_title} subtitle-project`}>قطعه :</span>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <Button2 onClick={() => setShowModal(true)}>{"افزودن قطعه"}</Button2>
          <Button2 onClick={""} icon={faEnvelope}>
            {"ارسال پیامک"}
          </Button2>
        </div>
        <div className="mt-3">
          <TableForm columns={columns}>
            <TableRow className="statment-row-table">
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <TableCell sx={{ fontFamily: "iranYekan" }}>
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
                    onClick={() => {}}
                    className={`${styles2.trash_row_table}`}
                  />
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => {}}
                    className={styles2.edit_row_table}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableForm>
        </div>
      </div>
    </>
  );
}
