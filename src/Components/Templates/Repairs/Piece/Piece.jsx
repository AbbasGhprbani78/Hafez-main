import { useEffect, useState } from "react";
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
import {
  errorMessage,
  successMessage,
} from "../../../Modules/Toast/ToastCustom";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../../../config/axiosConfig";
import DeleContent from "../../../Modules/DeleteContent/DeleContent";
export default function Piece({ id, pieces }) {
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
  const [loading, setLoading] = useState(false);
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
    id: "",
  });
  const [piceDataTable, setPiceDataTable] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [indexId, setIndexId] = useState({ id: "", index: "" });
  const [suppliers, setSuppliers] = useState([]);

  const [repairmans, setRepairmans] = useState([]);
  const [supplierCode, setSupplierCode] = useState("");

  const handleChangePieces = (name, value, label) => {
    if (name === "pieceCode") {
      const selectedPiece = pieces.find((item) => item.id === value);

      if (selectedPiece) {
        setPiceModalData((prev) => ({
          ...prev,
          pieceCode: selectedPiece.id,
          pieceText: selectedPiece.name,
          markCode: selectedPiece.brand || "",
          markText: selectedPiece.brand || "",
          price: selectedPiece.price || "",
          iswarranty: selectedPiece.warranty ?? false,
          id: selectedPiece.id,
        }));
      }
    } else {
      setPiceModalData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChangeRepairman = (name, value, label) => {
    if (name === "repairmanCode") {
      const selected = repairmans.find((r) => r.id === value);
      if (selected) {
        setPiceModalData((prev) => ({
          ...prev,
          repairmanCode: selected.id,
          repairmanText: selected.full_name,
        }));
      }
    }
  };

  const handleChangeSupplier = (name, value, label) => {
    setSupplierCode(value);
  };

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };

  const getsuppliers = async () => {
    try {
      const response = await apiClient.get("/app/suppliers/");
      if (response.status === 200) {
        setSuppliers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRepairMans = async () => {
    try {
      const response = await apiClient.get("/app/repairmen/");
      if (response.status === 200) {
        setRepairmans(response.data);
      }
    } catch (error) {
      console.log(error);
    }
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
      id: mainEditRow[0]?.id,
    });

    setIndexToEdit(index);
  };

  const getDataTable = async () => {
    try {
      const response = await apiClient.get(`app/piece-for-form/by-form/${id}`);
      if (response.status === 200) {
        if (!Array.isArray(response.data)) return;
        const allPieces = response.data?.map((item) => ({
          pieceCode: item.piece.id,
          pieceText: item.piece.name,
          markCode: item.piece.brand,
          markText: item.piece.brand,
          price: item.piece.price,
          repairmanCode: item.repairman.id,
          repairmanText: item.repairman.full_name,
          numberPiece: item.piece.count,
          iswarranty: item.piece.warranty,
          id: item.id,
        }));
        setPiceDataTable(allPieces);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRow = async () => {
    if (indexId.id) {
      setLoading(true);
      try {
        const response = await apiClient.delete(
          `app/piece-for-form/${indexId.id}/delete/`
        );
        if (response.status === 204) {
          successMessage("با موفقیت حذف شد");
          setPiceDataTable((prev) =>
            prev.filter((_, i) => i !== indexId.index)
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setPiceDataTable((prev) => prev.filter((_, i) => i !== indexId.index));
      successMessage(" با موفقیت حذف شد");
    }

    setShowModal(false);
    setShowDeleteModal(false);
  };

  const putDataTable = async () => {
    const payload = [
      {
        piece: +piceModalData.pieceCode,
        repairman: +piceModalData.repairmanCode,
        count: +piceModalData.numberPiece,
        form: id,
        id: indexId.id,
      },
    ];
    try {
      const response = await apiClient.put(
        "app/piece-for-form-update/",
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

  const addToTable = () => {
    const newErrors = {};

    const isEmpty = (val) =>
      val === "" ||
      val === null ||
      val === undefined ||
      (typeof val === "string" && !val.trim());

    if (isEmpty(piceModalData.pieceCode)) {
      newErrors.pieceCode = "کد قطعه الزامی است.";
    }

    if (isEmpty(piceModalData.markCode)) {
      newErrors.markCode = "مارک الزامی است.";
    }

    if (isEmpty(piceModalData.price)) {
      newErrors.price = "قیمت الزامی است.";
    } else if (isNaN(piceModalData.price) || Number(piceModalData.price) <= 0) {
      newErrors.price = "قیمت باید یک عدد مثبت باشد.";
    }

    if (isEmpty(piceModalData.repairmanCode)) {
      newErrors.repairmanCode = "کد تعمیرکار الزامی است.";
    }

    if (isEmpty(piceModalData.numberPiece)) {
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
          id: piceModalData.id,
        };
        return updateTable;
      });

      setEditMode(false);
      putDataTable();
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
        id: piceModalData.id,
      };

      setPiceDataTable((prev) => [...prev, newTableRow]);
      const payload = [
        {
          piece: +piceModalData.pieceCode,
          repairman: +piceModalData.repairmanCode,
          count: +piceModalData.numberPiece,
          form: id,
        },
      ];
      postDataTable(payload);
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

  const postDataTable = async (data) => {
    setLoading(true);

    try {
      const response = await apiClient.post("app/piece-for-form/", data);

      if (response.status === 201 || response.status === 200) {
        successMessage("با موفقیت ارسال شد");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataTable();
    getsuppliers();
    getRepairMans();
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
          <>
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
                    items={pieces.map((item) => ({
                      value_id: item.id,
                      value: item.name,
                    }))}
                    name="pieceCode"
                    placeHolder={" قطعه را انتخاب کنید"}
                    onChange={handleChangePieces}
                    value={piceModalData.pieceCode}
                  />

                  {errors.pieceCode && (
                    <p className="error">{errors.pieceCode}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    label={"مارک قطعه"}
                    name="markCode"
                    placeHolder={"قطعه را انتخاب کنید انتخاب کنید"}
                    value={piceModalData.markCode}
                  />
                  {errors.markCode && (
                    <p className="error">{errors.markCode}</p>
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
                  <InputPrice
                    label="قیمت "
                    value={piceModalData.price}
                    name="price"
                    maxLength={30}
                  />
                  {errors.price && <p className="error">{errors.price}</p>}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <SearchAndSelectDropDwon
                    icon={faAngleDown}
                    label={"تعمیرکار"}
                    items={repairmans.map((item) => ({
                      value_id: item.id,
                      value: item.full_name,
                    }))}
                    name="repairmanCode"
                    placeHolder={" تعمیرکار را انتخاب کنید"}
                    onChange={handleChangeRepairman}
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
                      value={"true"}
                      checked={piceModalData.iswarranty == true}
                      name={"iswarranty"}
                    />
                    <InputRadio
                      text="ندارد"
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
          </>
        )}
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
              items={suppliers.map((item) => ({
                value_id: item.id,
                value: item.name,
              }))}
              name="ExpertStatementsCode"
              placeHolder={"خدمات دهنده"}
              onChange={handleChangeSupplier}
              value={supplierCode}
            />
          </div>
          {/* <Button2 onClick={""}>مشاهده جزئیات گارانتی</Button2> */}
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
          {piceDataTable?.length > 0 &&
            piceDataTable?.map((item, i) => (
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
                        console.log(item);
                        setIndexId({
                          index: i,
                          id: item.id ? item.id : "",
                        });
                      }}
                      className={styles2.edit_row_table}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableForm>

        {/* <div className="p-form-actions">
          <div className="p-form-actions">
            <Button2 onClick={postDataTable} disable={loading}>
              تایید
              <FontAwesomeIcon icon={faCheck} />
            </Button2>
          </div>
        </div> */}
      </div>
    </>
  );
}
