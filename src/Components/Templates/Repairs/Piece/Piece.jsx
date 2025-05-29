import { useState } from "react";
import styles from "./Piece.module.css";
import SelectDropDown2 from "../../../Modules/SelectDropDown2/SelectDropDown2";
import Button2 from "../../../Modules/Button2/Button2";
import {
  faEnvelope,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TableForm from "../../../Modules/Table/TableForm";
import { Box, TableCell, TableRow } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../../Modules/Modal/Modal";
import { Col, Row } from "react-bootstrap";
import { formatWithThousandSeparators } from "../../../../utils/helper";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
import { toFarsiNumber } from "../../../../utils/helper";
import Input from "../../../Modules/Input/Input";
import styles2 from "../../../../Pages/Repairs/Repairs.module.css";
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
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="modal_content">
          <div className="modal_top">
            <span className="titel_top">افزودن قطعه جدید</span>
          </div>
          <div className="modal_bottom">
            <Input
              name={""}
              label={"نام قطعه"}
              placeholder={"نام قطعه"}
              value={""}
              onChange={""}
            />
            <div className="mt-3">
              <Input
                name={""}
                label={"مارک قطعه"}
                placeholder={"مارک قطعه"}
                value={""}
                onChange={""}
              />
            </div>
            <div className="mt-3">
              <label className={`label_input mb-2 `}>تعمیرکار</label>
              <SelectDropDown2
                text={"تعمیرکار"}
                styleList={"positionlisttop"}
              />
            </div>
            <Row className="mt-3 mb-3 d-flex gx-3">
              <Col xs={12} md={6}>
                <label className={`label_input mb-2 `}>قیمت</label>
                <div className="input_content_wrapper">
                  <input
                    id={""}
                    name={""}
                    type={"text"}
                    placeholder={"قیمت"}
                    value={toFarsiNumber(formatWithThousandSeparators(""))}
                    onChange={""}
                    className="input_form"
                    autoComplete="off"
                    maxLength={30}
                  />
                </div>
              </Col>
              <Col xs={12} md={6} className={styles.wrap_input}>
                <label className={`label_input mb-2 `}>تعداد</label>
                <div className="input_content_wrapper">
                  <input
                    id={""}
                    name={""}
                    type={"text"}
                    placeholder={"تعداد"}
                    value={toFarsiNumber(formatWithThousandSeparators(""))}
                    onChange={""}
                    className="input_form"
                    autoComplete="off"
                    maxLength={30}
                  />
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <ConfirmBtn />
            </div>
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
            <SelectDropDown2
              text={"خدمات دهنده"}
              style={"width"}
              styleList={"positionlist"}
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
