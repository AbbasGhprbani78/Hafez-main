import { useState } from "react";
import styles from "./OutWork.module.css";
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
import { Col, Row } from "react-bootstrap";
import { toFarsiNumber } from "../../../../utils/helper";
import { formatWithThousandSeparators } from "../../../../utils/helper";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
import Textarea from "../../../Modules/Texteara/Textarea";
import Input from "../../../Modules/Input/Input";
import DataInput from "../../../Modules/DataInput/DataInput";
import styles2 from "../../../../Pages/Repairs/Repairs.module.css";
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
  const [outOfworkModaldata, setOutOfworkModalData] = useState({});

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
            <Input
              name={""}
              label={"عمل"}
              placeholder={"عمل"}
              value={""}
              onChange={""}
            />
            <div className="mt-3">
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
            </div>
            <Row className="mt-3 mb-3 d-flex gx-3">
              <Col xs={12} md={6}>
                <label className={`label_input mb-2 `}>کیلومتر ورود</label>
                <div className="input_content_wrapper">
                  <input
                    id={""}
                    name={""}
                    type={"text"}
                    placeholder={"کیلومتر ورود"}
                    value={toFarsiNumber(formatWithThousandSeparators(""))}
                    onChange={""}
                    className="input_form"
                    autoComplete="off"
                    maxLength={30}
                  />
                </div>
              </Col>
              <Col xs={12} md={6} className={styles.wrap_input}>
                <label className={`label_input mb-2 `}>کیلومتر خروج</label>
                <div className="input_content_wrapper">
                  <input
                    id={""}
                    name={""}
                    type={"text"}
                    placeholder={"کیلومتر خروج"}
                    value={toFarsiNumber(formatWithThousandSeparators(""))}
                    onChange={""}
                    className="input_form"
                    autoComplete="off"
                    maxLength={30}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-3 mb-3 d-flex gx-3">
              <Col xs={12} md={6}>
                <label className={`label_input mb-2 `}>زمان ورود</label>
                <DataInput onChange={""} value={""} />
              </Col>
              <Col xs={12} md={6} className={styles.wrap_input}>
                <label className={`label_input mb-2 `}>زمان خروج</label>
                <DataInput onChange={""} value={""} />
              </Col>
            </Row>
            <div className="mb-3">
              <Textarea text={"تاییدیه کارشناس"} value={""} onChange={""} />
            </div>
            <div className="d-flex justify-content-end">
              <ConfirmBtn />
            </div>
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
        <div className="mt-3">
          <TableForm columns={columns}>
            <TableRow className="statment-row-table">
              <TableCell sx={{ fontFamily: "iranYekan" }}></TableCell>
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
        <div className={styles.wrap_radio}>
          <InputRadio
            text="خروج ماشین"
            marginRight={""}
            onChange={""}
            value={""}
            checked={""}
            name={""}
          />
          <InputRadio
            text="خروج قطعه"
            marginRight={""}
            onChange={""}
            value={""}
            checked={""}
            name={""}
          />
        </div>
      </div>
    </>
  );
}
