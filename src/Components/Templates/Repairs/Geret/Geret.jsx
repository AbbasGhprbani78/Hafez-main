import { useState } from "react";
import styles from "./Geret.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import {
  faEnvelope,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TableForm from "../../../Modules/Table/TableForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableCell, TableRow } from "@mui/material";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
import Modal from "../../../Modules/Modal/Modal";
import Input from "../../../Modules/Input/Input";
import { toFarsiNumber } from "../../../../utils/helper";
import { formatWithThousandSeparators } from "../../../../utils/helper";
import { Col, Row } from "react-bootstrap";
import Textarea from "../../../Modules/Texteara/Textarea";
export default function Geret() {
  const columns = ["شرح اظهار", "عیب فنی", "تعمیرکار", "اجرت", "قیمت"];
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="modal_content">
          <div className="modal_top">
            <span className="titel_top">افزودن اجرت جدید</span>
          </div>
          <div className="modal_bottom">
            <Textarea
              name={""}
              text={"اظهار کارشناس"}
              placeholder={"اظهار کارشناس"}
              value={""}
              onChange={""}
            />
            <div className="mt-3">
              <Input
                name={""}
                label={"عیب فنی"}
                placeholder={"عیب فنی"}
                value={""}
                onChange={""}
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
      <div className={styles.box}>
        <span className={`${styles.box_title} subtitle-project`}>اجرت :</span>
        <div className={`${styles.wrap_actions} mt-4`}>
          <Button2 onClick={() => setShowModal(true)} >{"افزودن اجرت"}</Button2>
          <Button2 onClick={""} icon={faEnvelope} >{"ارسال پیامک"}</Button2>
        </div>
        <div className="mt-3">
          <TableForm columns={columns}>
            <TableRow className="statment-row-table">
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
              <div className="wrap-trash-table">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => { }}
                  className="trash-row-table"
                />
              </div>
              <div className="wrap-edit-table">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => { }}
                  className="edit-row-table"
                />
              </div>
            </TableRow>
          </TableForm>
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
