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
import { errorMessage } from "../../../Modules/Toast/ToastCustom";
import "react-toastify/dist/ReactToastify.css";
import SearchAndSelectDropDwon from "../../../Modules/SearchAndSelectDropDwon/SearchAndSelectDropDwon";
export default function Geret() {
  const columns = ["کد اظهار", "عیب فنی", "تعمیرکار", "اجرت", "قیمت", "عملیات"];
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };
  const [expertTexts, setExpertTexts] = useState([]);

  const [geretModalData, setGeretModalData] = useState({
    ExpertStatementsCode: "",
    technicalIssueCode: "",
    technicalIssueText: "",
    repairmanCode: "",
    repairmanText: "",
    wageCode: "",
    WageText: "",
    price: "",
  });

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

  const deleteRow = (index) => {};

  const showEditModal = (index) => {};

  const addToTable = () => {};

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
    getExpertStatements();
  }, []);

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
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                <SearchAndSelectDropDwon
                  icon={faAngleDown}
                  label={"عیب فنی"}
                  items={[]}
                  name="technicalIssueCode"
                  placeHolder={"عیب فنی را انتخاب کنید"}
                  onChange={handleChange}
                  value={geretModalData.technicalIssueCode}
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
                  label={"تعمیرکار"}
                  items={[]}
                  name="repairmanCode"
                  placeHolder={"تعمیرکار را انتخاب کنید"}
                  onChange={handleChange}
                  value={geretModalData.repairmanCode}
                  key={721}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                <SearchAndSelectDropDwon
                  icon={faAngleDown}
                  label={"اجرت"}
                  items={[]}
                  name="wageCode"
                  placeHolder={" اجرت را انتخاب کنید"}
                  onChange={handleChange}
                  value={geretModalData.wageCode}
                  key={721}
                />
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
          <Button2 onClick={() => setShowModal(true)}>{"افزودن اجرت"}</Button2>
          <Button2 onClick={""} icon={faEnvelope}>
            {"ارسال پیامک"}
          </Button2>
        </div>
        <div>
          <TableForm columns={columns}>
            <TableRow className="statment-row-table">
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
          <Grid sx={{ xs: 12, sm: 5, md: 3 }} xs={12} sm={5} md={3}>
            <OccultationItem
              text={"تعمیرکار مکانیک"}
              placeHolder={"نام مکانیک"}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 5, md: 3 }} xs={12} sm={5} md={3}>
            <OccultationItem
              text={"تعمیرکار صافکار"}
              placeHolder={"نام صافکار"}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 5, md: 3 }} xs={12} sm={5} md={3}>
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
