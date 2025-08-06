import { useEffect, useState } from "react";
import styles from "./OutWork.module.css";
import moment from "jalali-moment";
import Button2 from "../../../Modules/Button2/Button2";
import {
  faAngleDown,
  faCheck,
  faEnvelope,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TableForm from "../../../Modules/Table/TableForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TableCell, TableRow } from "@mui/material";
import Modal from "../../../Modules/Modal/Modal";
import Input from "../../../Modules/Input/Input";
import DataInput from "../../../Modules/DataInput/DataInput";
import styles2 from "../../../../Pages/Repairs/Repairs.module.css";
import Grid from "@mui/material/Grid2";
import InputPrice from "../../../Modules/InputPrice/InputPrice";
import Texteara from "../../../Modules/Texteara/Textarea";
import {
  errorMessage,
  successMessage,
} from "../../../Modules/Toast/ToastCustom";
import {
  formatWithThousandSeparators,
  toEnglishNumber,
  toFarsiNumber,
} from "../../../../utils/helper";

import apiClient from "../../../../config/axiosConfig";
import DeleContent from "../../../Modules/DeleteContent/DeleContent";
import InputRadio from "../../../Modules/InputRadio/InputRadio";
import SearchAndSelectDropDwon from "../../../Modules/SearchAndSelectDropDwon/SearchAndSelectDropDwon";
export default function OutWork({ id, pieces }) {
  const columns = [
    "عمل",
    "قیمت",
    "کیلومتر ورود",
    "کیلومتر خروج",
    "زمان ورود",
    "زمان خروج",
    "نوع خروج",
    "توضیحات",
    "عملیات",
  ];
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(null);

  const [outOfworkModaldata, setOutOfworkModalData] = useState({
    action: "",
    price: "",
    departurekm: "",
    departuretime: "",
    Arrivalkm: "",
    arrivaltime: "",
    description: "",
    type: "",
    piece: "",
    id: "",
  });
  const [outOfworkModaldataTable, setOutOfworkModaldataTable] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [indexId, setIndexId] = useState({ id: "", index: "" });
  const [typesExit, setTypeExit] = useState([]);

  const resetData = () => {
    setOutOfworkModalData({
      action: "",
      price: "",
      departurekm: "",
      departuretime: "",
      Arrivalkm: "",
      arrivaltime: "",
      description: "",
      type: "",
      piece: "",
      id: "",
    });
  };
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
      type: mainEditRow[0]?.type,
      piece: mainEditRow[0]?.piece,
      id: mainEditRow[0]?.id,
    });

    setIndexToEdit(index);
  };

  const getDataTable = async () => {
    try {
      const response = await apiClient.get(`app/api/work-abroad/${id}`);
      if (response.status === 200) {
        if (!Array.isArray(response.data)) return;
        const allOutOfWork = response.data?.map((item) => ({
          action: item.action,
          price: item.price,
          departurekm: item.exit_kilometer,
          departuretime: item.exit_time,
          Arrivalkm: item.entry_kilometer,
          arrivaltime: item.entry_time,
          description: item.descriptions,
          type: item.type,
          piece: item.piece,
          id: item.id,
        }));
        setOutOfworkModaldataTable(allOutOfWork);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToTable = () => {
    const newErrors = {};
    const onlyNumbers = /^[0-9]+$/;

    if (!outOfworkModaldata.action?.trim()) {
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

    if (outOfworkModaldata.type === 2 && !outOfworkModaldata.piece) {
      newErrors.piece = "انتخاب قطعه الزامی است";
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
          type: outOfworkModaldata.type,
          piece: outOfworkModaldata.piece,
          id: outOfworkModaldata.id,
        };
        return updateTable;
      });
      putDataTable();
      setEditMode(false);
    } else {
      const newTableRow = {
        action: outOfworkModaldata.action,
        price: outOfworkModaldata.price,
        departurekm: outOfworkModaldata.departurekm,
        departuretime: outOfworkModaldata.departuretime,
        Arrivalkm: outOfworkModaldata.Arrivalkm,
        arrivaltime: outOfworkModaldata.arrivaltime,
        description: outOfworkModaldata.description,
        id: outOfworkModaldata.id,
      };

      setOutOfworkModaldataTable((prev) => [...prev, newTableRow]);
      successMessage("اطلاعات با موفقیت به جدول اضافه شد.");
      const payload = [
        {
          form: id,
          action: outOfworkModaldata.action,
          price: outOfworkModaldata.price,
          exit_kilometer: outOfworkModaldata.departurekm,
          exit_time: outOfworkModaldata.departuretime,
          entry_kilometer: outOfworkModaldata.Arrivalkm,
          entry_time: outOfworkModaldata.arrivaltime,
          descriptions: outOfworkModaldata.description,
          piece: outOfworkModaldata.piece,
          type: outOfworkModaldata.type,
        },
      ];
      postDataTable(payload);
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
      type: "",
      piece: "",
    });
    setErrors({});
  };

  const postDataTable = async (data) => {
    try {
      const response = await apiClient.post("app/api/work-abroad/", data);

      if (response.status === 201 || response.status === 200) {
        successMessage("با موفقیت ارسال شد");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const putDataTable = async () => {
    const payload = [
      {
        action: outOfworkModaldata.action,
        exit_kilometer: outOfworkModaldata.departurekm,
        exit_time: outOfworkModaldata.departuretime,
        entry_kilometer: outOfworkModaldata.Arrivalkm,
        entry_time: outOfworkModaldata.arrivaltime,
        descriptions: outOfworkModaldata.description,
        price: outOfworkModaldata.piece,
        piece: outOfworkModaldata.piece,
        type: outOfworkModaldata.type,
        form: id,
        id: indexId.id,
      },
    ];
    try {
      const response = await apiClient.put(
        `app/api/work-abroad/${indexId.id}`,
        payload
      );

      if (response.status === 201 || response.status === 200) {
        successMessage("با موفقیت ویرایش شد");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRow = async () => {
    if (indexId.id) {
      setLoading(true);
      try {
        const response = await apiClient.delete(
          `app/api/work-abroad/${indexId.id}`
        );
        if (response.status === 200 || response.status === 204) {
          successMessage("با موفقیت حذف شد");
          setOutOfworkModaldataTable((prev) =>
            prev.filter((_, i) => i !== indexId.index)
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setOutOfworkModaldataTable((prev) =>
        prev.filter((_, i) => i !== indexId.index)
      );
      successMessage(" با موفقیت حذف شد");
    }

    setShowModal(false);
    setShowDeleteModal(false);
  };

  const getTypeExit = async () => {
    try {
      const response = await apiClient.get("app/api/work-abroad-types/");
      if (response.status === 200) {
        setTypeExit(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataTable();
    getTypeExit();
  }, []);

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
              <span className="titel_top">افزودن اجرت جدید</span>
            </div>
            <div className="modal_bottom">
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={4}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    name={"action"}
                    label={"عمل"}
                    placeholder={"عمل"}
                    value={outOfworkModaldata.action}
                    onChange={handleChange}
                  />
                  {errors.action && <p className="error">{errors.action}</p>}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
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
                    label="کیلومتر ورود"
                    placeholder="کیلومتر ورود"
                    icon={""}
                    name="Arrivalkm"
                    value={toFarsiNumber(outOfworkModaldata.Arrivalkm)}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      const englishValue = toEnglishNumber(value);
                      const digitRegex = /^\d*$/;

                      if (digitRegex.test(englishValue)) {
                        setOutOfworkModalData((prevState) => ({
                          ...prevState,
                          [name]: englishValue,
                        }));
                        setErrors((prev) => ({ ...prev, [name]: "" }));
                      }
                    }}
                  />
                  {errors.Arrivalkm && (
                    <p className="error">{errors.Arrivalkm}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    label="کیلومتر خروج"
                    placeholder="کیلومتر خروج"
                    icon={""}
                    name="departurekm"
                    value={toFarsiNumber(outOfworkModaldata.departurekm)}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      const englishValue = toEnglishNumber(value);
                      const digitRegex = /^\d*$/;

                      if (digitRegex.test(englishValue)) {
                        setOutOfworkModalData((prevState) => ({
                          ...prevState,
                          [name]: englishValue,
                        }));
                        setErrors((prev) => ({ ...prev, [name]: "" }));
                      }
                    }}
                  />
                  {errors.departurekm && (
                    <p className="error">{errors.departurekm}</p>
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
              {outOfworkModaldata.type === 2 && (
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <SearchAndSelectDropDwon
                    icon={faAngleDown}
                    label={"نام قطعه"}
                    items={pieces.map((item) => ({
                      value_id: item.id,
                      value: item.name,
                    }))}
                    name="piece"
                    placeHolder={"قطعه را انتخاب کنید"}
                    onChange={(name, value, label) =>
                      setOutOfworkModalData((prev) => ({
                        ...prev,
                        piece: value,
                      }))
                    }
                    value={outOfworkModaldata.piece}
                  />

                  {errors.piece && <p className="error">{errors.piece}</p>}
                </Grid>
              )}
              <div className={styles.wrap_radio}>
                {typesExit.length > 0 &&
                  typesExit.map((item) => (
                    <InputRadio
                      key={item.id}
                      text={item.type}
                      onChange={() =>
                        setOutOfworkModalData((prev) => ({
                          ...prev,
                          type: item.id,
                        }))
                      }
                      checked={item.id === outOfworkModaldata.type}
                      name={item.type}
                      value={item.id}
                    />
                  ))}
              </div>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button2 onClick={addToTable}>تایید</Button2>
              </Box>
            </div>
          </div>
        )}
      </Modal>
      <div className={`${styles.box}`}>
        <span className={`${styles.box_title} subtitle-project`}>
          افزودن کار خارج :
        </span>
        <div className={`${styles.wrap_actions} wrap_button_repairs`}>
          <Button2
            onClick={() => {
              setErrors({});
              resetData();
              setShowModal(true);
            }}
          >
            {"افزودن کار خارج"}
          </Button2>
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
                  {toFarsiNumber(item.Arrivalkm)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(item.departurekm)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(
                    moment(item.arrivaltime).format("jYYYY/jMM/jDD HH:mm")
                  )}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(
                    moment(item.departuretime).format("jYYYY/jMM/jDD HH:mm")
                  )}
                </TableCell>

                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {item.type === 1 ? "خروج ماشین" : "خروج قطعه"}
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

                        setIndexId({
                          index: i,
                          id: item.id,
                        });
                      }}
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
