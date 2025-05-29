import { useState } from "react";
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
import Input from "../../../Modules/Input/Input";
import { toFarsiNumber } from "../../../../utils/helper";
import { formatWithThousandSeparators } from "../../../../utils/helper";
import Textarea from "../../../Modules/Texteara/Textarea";
import OccultationItem from "../../../Modules/OccultationItem/OccultationItem";
import styles2 from "../../../../Pages/Repairs/Repairs.module.css";
import Grid from "@mui/material/Grid2";
import SelectDropDown from "../../../Modules/SelectDropDown/SelectDropDown";
export default function Geret() {
  const columns = ["عیب فنی", "تعمیرکار", "اجرت", "قیمت", "عملیات"];
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };
  return (
    <>
      <Modal showModal={showModal} setShowModal={handleToggleModal}>
        <div className="modal_content">
          <div className="modal_top">
            <span className="titel_top">افزودن اجرت جدید</span>
          </div>
          <div className="modal_bottom">
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <SelectDropDown
                    icon={faAngleDown}
                    label={"کد اظهار"}
                    items={[]}
                    name="declarationcode"
                    placeHolder={"کد اظهار را انتخاب کنید"}
                    onChange={""}
                    value={""}
                    key={721}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <SelectDropDown
                    icon={faAngleDown}
                    label={"عیب فنی"}
                    items={[]}
                    name="declarationcode"
                    placeHolder={"عیب فنی را انتخاب کنید"}
                    onChange={""}
                    value={""}
                    key={721}
                  />
                </Grid>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  width: "100%",
                  justifyContent: "space-between",
                  margin: "20px 0",
                }}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <SelectDropDown
                    icon={faAngleDown}
                    label={"تعمیرکار"}
                    items={[]}
                    name="declarationcode"
                    placeHolder={"تعمیرکار را انتخاب کنید"}
                    onChange={""}
                    value={""}
                    key={721}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <SelectDropDown
                    icon={faAngleDown}
                    label={"اجرت"}
                    items={[]}
                    name="declarationcode"
                    placeHolder={" اجرت را انتخاب کنید"}
                    onChange={""}
                    value={""}
                    key={721}
                  />
                </Grid>
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <Grid size={{ xs: 12 }}></Grid>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <ConfirmBtn />
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
            <OccultationItem text1={"مکانیک"} text2={"تعمیرکار مکانیک"} />
          </Grid>
          <Grid sx={{ xs: 12, sm: 5, md: 3 }} xs={12} sm={5} md={3}>
            <OccultationItem text1={"صافکاری"} text2={"تعمیرکار صافکار"} />
          </Grid>
          <Grid sx={{ xs: 12, sm: 5, md: 3 }} xs={12} sm={5} md={3}>
            <OccultationItem text1={"نقاشی"} text2={"تعمیرکار نقاش"} />
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
