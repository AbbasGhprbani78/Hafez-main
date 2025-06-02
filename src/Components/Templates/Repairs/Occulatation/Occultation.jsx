import { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
import Modal from "../../../Modules/Modal/Modal";
import Texteara from "../../../Modules/Texteara/Textarea";
import { Box } from "@mui/material";
import styles2 from "../../../../Pages/Repairs/Repairs.module.css";
import SelectDropDown from "../../../Modules/SelectDropDown/SelectDropDown";

export default function Occultation() {
  const columns = ["کد اظهار", "توضیحات کارشناس", "توضیحات مشتری", "عملیات"];
  const [showModal, setShowModal] = useState(false);

  const [accultationModalDate, setAccultationModalDate] = useState({
    CustomerStatements: "",
    ExpertStatements: "",
    ExpertStatementsCode: "",
  });

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };
  return (
    <>
      <Modal showModal={showModal} setShowModal={handleToggleModal}>
        <div className="modal_content">
          <div className="modal_top">
            <span className="titel_top">عیب یابی جدید</span>
          </div>
          <div className="modal_bottom">
            <Texteara
              text={"اظهارات مشتری"}
              value={""}
              onChange={""}
              name={"CustomerStatements"}
            />
            <Box sx={{ marginY: "20px" }}>
              <Texteara
                text={"اظهارات کارشناس"}
                value={"ExpertStatements"}
                onChange={""}
                name={""}
              />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <SelectD
                icon={faAngleDown}
                label={"کد اظهار"}
                items={[]}
                name="ExpertStatementsCode"
                placeHolder={"کد اظهار را انتخاب کنید"}
                onChange={""}
                value={""}
              />
            </Box>
            <div className="d-flex justify-content-end">
              <ConfirmBtn />
            </div>
          </div>
        </div>
      </Modal>
      <div className={`${styles.box}`}>
        <span className={`${styles.box_title} subtitle-project`}>
          عیب یابی :
        </span>
        <div className={` ${styles.occultation_content}`}>
          <div className="wrap_button_repairs">
            <Button2 onClick={() => setShowModal(true)}>
              {"افزودن اظهار"}
            </Button2>
          </div>
          <div>
            <TableForm columns={columns}>
              <TableRow className="statment-row-table">
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

          <div className="p-form-actions">
            <div className="p-form-actions">
              <ConfirmBtn type="submit" isSubmitting={""} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
