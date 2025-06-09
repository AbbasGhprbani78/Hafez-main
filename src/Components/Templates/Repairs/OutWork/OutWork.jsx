import { useState } from "react";
import styles from "./OutWork.module.css";
import moment from "jalali-moment";
import Button2 from "../../../Modules/Button2/Button2";
import {
  faEnvelope,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TableForm from "../../../Modules/Table/TableForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TableCell, TableRow } from "@mui/material";
import InputRadio from "../../../Modules/InputRadio/InputRadio";
import Modal from "../../../Modules/Modal/Modal";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
import Input from "../../../Modules/Input/Input";
import DataInput from "../../../Modules/DataInput/DataInput";
import styles2 from "../../../../Pages/Repairs/Repairs.module.css";
import Grid from "@mui/material/Grid2";
import InputPrice from "../../../Modules/InputPrice/InputPrice";
import Texteara from "../../../Modules/Texteara/Textarea";
import { successMessage } from "../../../Modules/Toast/ToastCustom";
import {
  formatWithThousandSeparators,
  toFarsiNumber,
} from "../../../../utils/helper";
export default function OutWork() {
  const columns = [
    "عمل",
    "قیمت",
    "کیلومتر خروج",
    "زمان خروج",
    "کیلومتر ورود",
    "زمان ورود",
    "توضیحات",
    "عملیات",
  ];
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(null);
  const [isOutCarPiece, setIsOutCarPiece] = useState(null);
  const [outOfworkModaldata, setOutOfworkModalData] = useState({
    action: "",
    price: "",
    departurekm: "",
    departuretime: "",
    Arrivalkm: "",
    arrivaltime: "",
    description: "",
  });

  const [outOfworkModaldataTable, setOutOfworkModaldataTable] = useState([]);

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutOfworkModalData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePriceChange = (value) => {
    setOutOfworkModalData((prev) => ({
      ...prev,
      price: value,
    }));

    setErrors((prev) => ({ ...prev, price: "" }));
  };

  const handleTimeDeparturetimeChange = (newDate) => {
    setOutOfworkModalData((prev) => ({
      ...prev,
      departuretime: newDate,
    }));
  };

  const handleTimeArrivaltimeChange = (newDate) => {
    setOutOfworkModalData((prev) => ({
      ...prev,
      arrivaltime: newDate,
    }));
  };

  const addToTable = () => {
    const newErrors = {};
    const onlyNumbers = /^[0-9]+$/;

    if (!outOfworkModaldata.action.trim()) {
      newErrors.action = "عمل الزامی است";
    }

    if (!outOfworkModaldata.price) {
      newErrors.price = "قیمت الزامی است";
    }

    if (!outOfworkModaldata.departurekm.trim()) {
      newErrors.departurekm = "کیلومتر خروج الزامی است";
    } else if (!onlyNumbers.test(outOfworkModaldata.departurekm)) {
      newErrors.departurekm = "فقط عدد مجاز است";
    }

    if (!outOfworkModaldata.departuretime) {
      newErrors.departuretime = "زمان خروج الزامی است";
    }

    if (!outOfworkModaldata.Arrivalkm.trim()) {
      newErrors.Arrivalkm = "کیلومتر ورود الزامی است";
    } else if (!onlyNumbers.test(outOfworkModaldata.Arrivalkm)) {
      newErrors.Arrivalkm = "فقط عدد مجاز است";
    }

    if (!outOfworkModaldata.arrivaltime) {
      newErrors.arrivaltime = "زمان ورود الزامی است";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editMode) {
      setOutOfworkModaldataTable((prev) => {
        const updateTable = [...prev];
        updateTable[indexToEdit] = {
          action: outOfworkModaldata.action,
          price: outOfworkModaldata.price,
          departurekm: outOfworkModaldata.departurekm,
          departuretime: outOfworkModaldata.departuretime,
          Arrivalkm: outOfworkModaldata.Arrivalkm,
          arrivaltime: outOfworkModaldata.arrivaltime,
          description: outOfworkModaldata.description,
        };
        return updateTable;
      });
      setEditMode(false);
      successMessage("اطلاعات با موفقیت تغییر کرد.");
    } else {
      const newTableRow = {
        action: outOfworkModaldata.action,
        price: outOfworkModaldata.price,
        departurekm: outOfworkModaldata.departurekm,
        departuretime: outOfworkModaldata.departuretime,
        Arrivalkm: outOfworkModaldata.Arrivalkm,
        arrivaltime: outOfworkModaldata.arrivaltime,
        description: outOfworkModaldata.description,
      };

      setOutOfworkModaldataTable((prev) => [...prev, newTableRow]);
    }
    setShowModal(false);
    setOutOfworkModalData({
      action: "",
      price: "",
      departurekm: "",
      departuretime: "",
      Arrivalkm: "",
      arrivaltime: "",
      description: "",
    });
    setErrors({});
    successMessage("اطلاعات با موفقیت به جدول اضافه شد.");
  };

  const deleteRow = (index) => {
    setOutOfworkModaldataTable((prev) => prev.filter((_, i) => i !== index));
    successMessage("ردیف با موفقیت حذف شد.");
  };

  const showEditModal = (index) => {
    setEditMode(true);
    setShowModal(true);
    const mainEditRow = [...outOfworkModaldataTable].filter(
      (_, i) => i === index
    );
    setOutOfworkModalData({
      action: mainEditRow[0]?.action,
      price: mainEditRow[0]?.price,
      departurekm: mainEditRow[0]?.departurekm,
      departuretime: mainEditRow[0]?.departuretime,
      Arrivalkm: mainEditRow[0]?.Arrivalkm,
      arrivaltime: mainEditRow[0]?.arrivaltime,
      description: mainEditRow[0]?.description,
    });

    setIndexToEdit(index);
  };

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
              className={"distancerow"}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
                <Input
                  name={"action"}
                  label={"عمل"}
                  placeholder={"عمل"}
                  value={outOfworkModaldata.action}
                  onChange={handleChange}
                />
                {errors.action && <p className="error">{errors.action}</p>}
              </Grid>
            </Grid>
            <Grid
              container
              className={"distancerow"}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
                <InputPrice
                  label="قیمت "
                  value={outOfworkModaldata.price}
                  onChange={handlePriceChange}
                  name="price"
                  maxLength={30}
                />
                {errors.price && <p className="error">{errors.price}</p>}
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
                  label="کیلومتر خروج"
                  styled={""}
                  placeholder="کیلومتر خروج"
                  icon={""}
                  name="departurekm"
                  value={outOfworkModaldata.departurekm}
                  onChange={handleChange}
                />
                {errors.departurekm && (
                  <p className="error">{errors.departurekm}</p>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                <Input
                  label="کیلومتر ورود"
                  styled={""}
                  placeholder="کیلومتر ورود"
                  icon={""}
                  name="Arrivalkm"
                  value={outOfworkModaldata.Arrivalkm}
                  onChange={handleChange}
                />
                {errors.Arrivalkm && (
                  <p className="error">{errors.Arrivalkm}</p>
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
                <label
                  className={`label_input`}
                  style={{ marginBottom: ".5rem", display: "inline-block" }}
                >
                  زمان ورود
                </label>
                <DataInput
                  name={"arrivaltime"}
                  placeHolder="زمان ورود"
                  value={outOfworkModaldata.arrivaltime}
                  onChange={handleTimeArrivaltimeChange}
                />
                {errors.arrivaltime && (
                  <p className="error">{errors.arrivaltime}</p>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                <label
                  className={`label_input`}
                  style={{ marginBottom: ".5rem", display: "inline-block" }}
                >
                  زمان خروج
                </label>
                <DataInput
                  placeHolder="زمان خروج"
                  name={"departuretime"}
                  value={outOfworkModaldata.departuretime}
                  onChange={handleTimeDeparturetimeChange}
                />
                {errors.departuretime && (
                  <p className="error">{errors.departuretime}</p>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              className={"distancerow"}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
                <Texteara
                  value={outOfworkModaldata.description}
                  onChange={handleChange}
                  name={"description"}
                  text={"توضیحات"}
                />
              </Grid>
              {errors.description && (
                <p className="error">{errors.description}</p>
              )}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button2 onClick={addToTable}>تایید</Button2>
            </Box>
          </div>
        </div>
      </Modal>
      <div className={`${styles.box}`}>
        <span className={`${styles.box_title} subtitle-project`}>
          افزودن کار خارج :
        </span>
        <div className={`${styles.wrap_actions} wrap_button_repairs`}>
          <Button2 onClick={() => setShowModal(true)}>{"افزودن اجرت"}</Button2>
          <Button2 onClick={""} icon={faEnvelope}>
            {"ارسال پیامک"}
          </Button2>
        </div>
        <TableForm columns={columns}>
          {outOfworkModaldataTable.length > 0 &&
            outOfworkModaldataTable.map((item, i) => (
              <TableRow className="statment-row-table" key={i}>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {item.action}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(formatWithThousandSeparators(item.price))}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(item.departurekm)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(
                    moment(item.departuretime).format("jYYYY/jMM/jDD HH:mm")
                  )}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(item.Arrivalkm)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(
                    moment(item.arrivaltime).format("jYYYY/jMM/jDD HH:mm")
                  )}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(item.description)}
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
        <div className={styles.wrap_radio}>
          <InputRadio
            text="خروج ماشین"
            onChange={() => setIsOutCarPiece(1)}
            value={isOutCarPiece}
            checked={isOutCarPiece === 1}
          />
          <InputRadio
            text="خروج قطعه"
            onChange={() => setIsOutCarPiece(2)}
            value={isOutCarPiece}
            checked={isOutCarPiece === 2}
          />
        </div>
      </div>
    </>
  );
}
