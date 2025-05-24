import { useEffect, useRef, useState } from "react";
import "./pform3.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faFile,
  faMicrophoneSlash,
  faFileLines,
  faXmark,
  faImage,
  faPen,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import EditBtn from "../../../Modules/EditBtn/EditBtn";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
import TableForm from "../../../Modules/Table/TableForm";
import { useFormik } from "formik";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Modal from "../../../Modules/Modal/Modal";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { MyContext } from "../../../../context/context";
import { toFarsiNumber, toEnglishNumber } from "../../../../utils/helper";
import LoadingForm from "../../../Modules/Loading/LoadingForm";
import SelectDropDown from "../../../Modules/SelectDropDown/SelectDropDown";
import Button2 from "../../../Modules/Button2/Button2";
import { Col } from "react-bootstrap";
import { formatWithThousandSeparators } from "../../../../utils/helper";
import DataInput from "../../../Modules/DataInput/DataInput";
import apiClient from "../../../../config/axiosConfig";

const CustomTab = styled(Tab)({
  fontSize: "inherit",
  fontFamily: "inherit",
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Pform3({ nextTab, prevTab, setContent, coustomer }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [value, setValue] = useState(0);
  const [isRecordingExpert, setIsRecordingExpert] = useState(false);
  const [isRecordingCustomer, setIsRecordingCustomer] = useState(false);
  const expertMediaRecorder = useRef(null);
  const expertMediaStream = useRef(null);
  const expertChunks = useRef([]);
  const customerMediaRecorder = useRef(null);
  const customerMediaStream = useRef(null);
  const customerChunks = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const { dataForm, idForm, editMode, setDataForm } = useContext(MyContext);
  const [idDelete, setIdDelete] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const columns = editMode
    ? [
        "کداظهار",
        "توضیحات مشتری",
        "توضیحات کارشناس",
        "تخمین قیمت",
        "تخمین زمان تعمیر",
      ]
    : ["توضیحات مشتری", "توضیحات کارشناس", "تخمین قیمت", "تخمین زمان تعمیر"];

  const [errors, setErrors] = useState({
    customer_statements_text: "",
    expert_statements_text: "",
    price_estimate: "",
    estimated_repair_time: "",
  });

  const [statementData, setStatementData] = useState({
    customer_statements_text: "",
    customer_statements_voice: null,
    customer_statements_file: null,
    expert_statements_text: "",
    expert_statements_file: null,
    expert_statements_voice: null,
    price_estimate: "",
    estimated_repair_time: "",
    declaration_code: "",
  });

  const getAllDataForm = async (id) => {
    try {
      const res = await apiClient.get(`/app/get-form/${id}`);
      if (res.status === 200) {
        setDataForm(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      form_id: idForm ? idForm : coustomer,
      form:
        dataForm?.customer_form_three?.length > 0
          ? dataForm?.customer_form_three
          : [],
    },
    onSubmit: async (values) => {
      if (isEdited) {
        setLoading(true);
        try {
          let response;
          if (dataForm.customer_form_three.length > 0) {
            const cleanFormFields = (formArray) => {
              return formArray.map((entry) => {
                const updatedEntry = { ...entry };
                [
                  "customer_statements_voice",
                  "customer_statements_file",
                  "expert_statements_file",
                  "expert_statements_voice",
                ].forEach((field) => {
                  if (
                    updatedEntry[field] &&
                    typeof updatedEntry[field] === "string" &&
                    updatedEntry[field].startsWith("/media")
                  ) {
                    delete updatedEntry[field];
                  }
                });
                return updatedEntry;
              });
            };

            const cleanedValues = {
              ...values,
              form: cleanFormFields(values.form),
            };

            response = await apiClient.put(
              `/app/fill-customer-third-form/`,
              cleanedValues
            );
          } else {
            response = await apiClient.post(
              `/app/fill-customer-third-form/`,
              values
            );
          }
          if (response.status === 201 || response.status === 200) {
            console.log("Form submitted successfully:", response.data);
            getAllDataForm(coustomer);
            setLoading(false);
            nextTab();
          }
        } catch (error) {
          setLoading(false);
        } finally {
          setLoading(false);
          setIsEdited(false);
        }
      } else {
        nextTab();
      }
    },
  });

  const hasAttachments = formik.values.form.some(
    (item) =>
      item?.customer_statements_voice ||
      item?.customer_statements_file ||
      item?.expert_statements_file ||
      item?.expert_statements_voice
  );

  if (hasAttachments) {
    columns.push("پیوست ها");
  }

  const startRecordingExpert = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      expertMediaStream.current = stream;
      expertMediaRecorder.current = new MediaRecorder(stream);

      expertMediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) expertChunks.current.push(e.data);
      };

      expertMediaRecorder.current.onstop = () => {
        const blob = new Blob(expertChunks.current, { type: "audio/webm" });
        setStatementData((prevState) => ({
          ...prevState,
          expert_statements_voice: blob,
        }));
        expertChunks.current = [];
      };

      expertMediaRecorder.current.start();
      setIsRecordingExpert(true);
    } catch (err) {
      console.error("Error accessing microphone for expert:", err);
    }
  };

  const stopRecordingExpert = () => {
    if (
      expertMediaRecorder.current &&
      expertMediaRecorder.current.state === "recording"
    ) {
      expertMediaRecorder.current.stop();
    }
    if (expertMediaStream.current) {
      expertMediaStream.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecordingExpert(false);
  };

  const startRecordingCustomer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      customerMediaStream.current = stream;
      customerMediaRecorder.current = new MediaRecorder(stream);

      customerMediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) customerChunks.current.push(e.data);
      };

      customerMediaRecorder.current.onstop = () => {
        const blob = new Blob(customerChunks.current, { type: "audio/webm" });
        setStatementData((prevState) => ({
          ...prevState,
          customer_statements_voice: blob,
        }));
        customerChunks.current = [];
      };

      customerMediaRecorder.current.start();
      setIsRecordingCustomer(true);
    } catch (err) {
      console.error("Error accessing microphone for customer:", err);
    }
  };

  const stopRecordingCustomer = () => {
    if (
      customerMediaRecorder.current &&
      customerMediaRecorder.current.state === "recording"
    ) {
      customerMediaRecorder.current.stop();
    }
    if (customerMediaStream.current) {
      customerMediaStream.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecordingCustomer(false);
  };

  const handlecustomer_statements_textChange = (e) => {
    setStatementData((prevState) => ({
      ...prevState,
      customer_statements_text: e.target.value,
    }));
  };

  const handleexpert_statements_textChange = (e) => {
    setStatementData((prevState) => ({
      ...prevState,
      expert_statements_text: e.target.value,
    }));
  };

  const handlecustomer_statements_fileChange = (e) => {
    const file = e.target.files[0];
    setStatementData((prevState) => ({
      ...prevState,
      customer_statements_file: file,
    }));
  };

  const handleexpert_statements_fileChange = (e) => {
    const file = e.target.files[0];
    setStatementData((prevState) => ({
      ...prevState,
      expert_statements_file: file,
    }));
  };

  const handleprice_estimateChange = (e) => {
    const englishNumber = toEnglishNumber(e.target.value.replace(/,/g, ""));
    setStatementData((prevState) => ({
      ...prevState,
      price_estimate: englishNumber,
    }));
  };

  const handleestimated_repair_timeChange = (value) => {
    if (value && typeof value.toDate === "function") {
      const gregorianDate = value.toDate();
      const formattedDate = gregorianDate.toLocaleString("en-GB", {
        hour12: false,
      });
      formik.setFieldValue("estimated_repair_time", formattedDate);
      setStatementData((prevState) => ({
        ...prevState,
        estimated_repair_time: formattedDate,
      }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const addStatement = async (e) => {
    e.preventDefault();

    const {
      customer_statements_text,
      customer_statements_voice,
      customer_statements_file,
      expert_statements_text,
      expert_statements_file,
      expert_statements_voice,
      price_estimate,
      estimated_repair_time,
      declaration_code,
    } = statementData;

    let formIsValid = true;
    const newErrors = {};

    if (!customer_statements_text) {
      newErrors.customer_statements_text = "وارد کردن اظهارات مشتری الزامیست";
      formIsValid = false;
    }
    if (!expert_statements_text) {
      newErrors.expert_statements_text = "وارد کردن اظهارات کارشناس الزامیست";
      formIsValid = false;
    }
    if (!price_estimate) {
      newErrors.price_estimate = "تعیین تخیمن قیمت الزامیست";
      formIsValid = false;
    }
    if (!estimated_repair_time) {
      newErrors.estimated_repair_time = "تعیین تخمین زمان تعمیر الزامیست";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    const newStatement = {
      customer_statements_text: customer_statements_text || "",
      customer_statements_voice: customer_statements_voice
        ? await convertToBase64(customer_statements_voice)
        : null,
      customer_statements_file: customer_statements_file
        ? await convertToBase64(customer_statements_file)
        : null,
      expert_statements_text: expert_statements_text || "",
      expert_statements_file: expert_statements_file
        ? await convertToBase64(expert_statements_file)
        : null,
      expert_statements_voice: expert_statements_voice
        ? await convertToBase64(expert_statements_voice)
        : null,
      price_estimate: price_estimate || "",
      estimated_repair_time: dateValue ? new Date(dateValue).toISOString() : "",
      declaration_code: declaration_code,
    };

    if (editMode) {
      const existingIndex = formik.values.form.findIndex(
        (item) => item.declaration_code === declaration_code
      );
      if (existingIndex !== -1) {
        const updatedStatement = {
          ...formik.values.form[existingIndex],
          customer_statements_text: newStatement.customer_statements_text,
          expert_statements_text: newStatement.expert_statements_text,
          price_estimate: newStatement.price_estimate,
          estimated_repair_time: newStatement.estimated_repair_time,
          declaration_code: newStatement.declaration_code,
          ...(newStatement.customer_statements_voice && {
            customer_statements_voice: newStatement.customer_statements_voice,
          }),
          ...(newStatement.customer_statements_file && {
            customer_statements_file: newStatement.customer_statements_file,
          }),
          ...(newStatement.expert_statements_file && {
            expert_statements_file: newStatement.expert_statements_file,
          }),
          ...(newStatement.expert_statements_voice && {
            expert_statements_voice: newStatement.expert_statements_voice,
          }),
        };

        formik.setFieldValue("form", [
          ...formik.values.form.slice(0, existingIndex),
          updatedStatement,
          ...formik.values.form.slice(existingIndex + 1),
        ]);
      } else {
        formik.setFieldValue("form", [...formik.values.form, newStatement]);
      }
    } else {
      formik.setFieldValue("form", [...formik.values.form, newStatement]);
    }

    setStatementData({
      customer_statements_text: "",
      customer_statements_voice: null,
      customer_statements_file: null,
      expert_statements_text: "",
      expert_statements_file: null,
      expert_statements_voice: null,
      price_estimate: "",
      estimated_repair_time: "",
      declaration_code: "",
    });
    setDateValue("");
    setErrors({});
  };

  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };

  const handleShowModal = (statement) => {
    setSelectedStatement(statement);
    setShowModal(true);
  };

  const handleDeleteStatement = (indexToDelete) => {
    const updatedform = formik.values.form.filter(
      (_, index) => index !== indexToDelete
    );
    formik.setFieldValue("form", updatedform);
  };

  const handleImageChangeCoustomer = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64File = await convertToBase64(file);
    if (!selectedStatement) return;

    const updatedForm = formik.values.form.map((statement) =>
      statement.declaration_code === selectedStatement.declaration_code
        ? { ...statement, customer_statements_file: base64File }
        : statement
    );

    formik.setFieldValue("form", updatedForm);

    setSelectedStatement((prev) => ({
      ...prev,
      customer_statements_file: base64File,
    }));
  };

  const handleImageChangeExpert = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64File = await convertToBase64(file);
    if (!selectedStatement) return;

    const updatedForm = formik.values.form.map((statement) =>
      statement.declaration_code === selectedStatement.declaration_code
        ? { ...statement, expert_statements_file: base64File }
        : statement
    );

    formik.setFieldValue("form", updatedForm);
    setSelectedStatement((prev) => ({
      ...prev,
      expert_statements_file: base64File,
    }));
  };

  const handleDeleteImageCoustomer = () => {
    const updatedForm = formik.values.form.map((statement) =>
      statement.declaration_code == selectedStatement.declaration_code
        ? { ...statement, customer_statements_file: null }
        : statement
    );
    formik.setFieldValue("form", updatedForm);
    setSelectedStatement({
      ...selectedStatement,
      customer_statements_file: null,
    });
  };

  const handleDeleteAudioCoustomer = () => {
    const updatedForm = formik.values.form.map((statement) =>
      statement.declaration_code === selectedStatement.declaration_code
        ? { ...statement, customer_statements_voice: null }
        : statement
    );

    formik.setFieldValue("form", updatedForm);
    setSelectedStatement({
      ...selectedStatement,
      customer_statements_voice: null,
    });
  };

  const handleDeleteImageExpert = () => {
    const updatedForm = formik.values.form.map((statement) =>
      statement.declaration_code === selectedStatement.declaration_code
        ? { ...statement, expert_statements_file: null }
        : statement
    );

    formik.setFieldValue("form", updatedForm);
    setSelectedStatement({
      ...selectedStatement,
      expert_statements_file: null,
    });
  };

  const handleDeleteAudioExpert = () => {
    const updatedForm = formik.values.form.map((statement) =>
      statement.declaration_code === selectedStatement.declaration_code
        ? { ...statement, expert_statements_voice: null }
        : statement
    );

    formik.setFieldValue("form", updatedForm);
    setSelectedStatement({
      ...selectedStatement,
      expert_statements_voice: null,
    });
  };

  const isBase64 = (str) => {
    const base64Regex = /^data:image\/[^;]+;base64,|^data:audio\/webm;base64,/;
    return base64Regex.test(str);
  };

  const selectRow = (item) => {
    const parsedDate = item.estimated_repair_time
      ? new Date(item.estimated_repair_time)
      : "";
    setStatementData({
      customer_statements_text: item.customer_statements_text,
      expert_statements_text: item.expert_statements_text,
      price_estimate: item.price_estimate,
      estimated_repair_time: item.estimated_repair_time,
      declaration_code: item.declaration_code,
    });

    setDateValue(parsedDate);
  };

  const deleteMainStatement = async (code) => {
    try {
      const response = await apiClient.delete(
        `/app/fill-customer-third-form/${code}/`
      );
      if (response.status === 200) {
        console.log(response.data);
        setIdDelete("");
        setShowModal(false);
        formik.setFieldValue(
          "form",
          formik.values.form.filter((item) => item.declaration_code !== code)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setContent("اظهارات مشتری:");
  }, []);

  useEffect(() => {
    handleestimated_repair_timeChange(dateValue);
  }, [dateValue]);

  useEffect(() => {
    if (formik.dirty) {
      setIsEdited(true);
    }
  }, [formik.dirty]);

  return (
    <>
      <Modal
        style={"widthstyle"}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {idDelete ? (
          <>
            <div className="div-delete">
              <div className="close-delete-modal">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="delete-icon-modal"
                  onClick={() => {
                    setShowModal(false);
                  }}
                />
              </div>
              <p className="delete-text">آیا از حذف اطمینان دارید؟</p>
              <div className="delete-actions">
                <button
                  className="btn-delete btn-yes-delete"
                  onClick={() => deleteMainStatement(idDelete)}
                >
                  بله
                </button>
                <button
                  className="btn-delete btn-no-delete"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  خیر
                </button>
              </div>
            </div>
          </>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChangetab}
              aria-label="simple tabs example"
            >
              <CustomTab label="مشتری" {...a11yProps(0)} />
              <CustomTab label="کارشناس" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0} key={0}>
              <div className="wrap-image-modal">
                <div className="image-modal-content">
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="delete-img-modal"
                    onClick={handleDeleteImageCoustomer}
                  />
                  {selectedStatement?.customer_statements_file ? (
                    <img
                      src={
                        isBase64(selectedStatement.customer_statements_file)
                          ? selectedStatement.customer_statements_file
                          : `${apiUrl}${selectedStatement.customer_statements_file}`
                      }
                      alt="Customer statement"
                      className="img-statmentmodal"
                    />
                  ) : (
                    <div className="modal-empty-image">
                      <FontAwesomeIcon
                        icon={faImage}
                        className="empty-icon-image"
                      />
                    </div>
                  )}
                </div>

                <label
                  htmlFor="filechnage"
                  className="btn-chnage-img-modal mt-4"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangeCoustomer}
                    className="mt-3 d-none"
                    id="filechnage"
                  />
                  ویرایش
                  <FontAwesomeIcon icon={faPen} className="mx-2" />
                </label>

                {selectedStatement?.customer_statements_voice && (
                  <div className="d-flex mt-4 align-items-center">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={handleDeleteAudioCoustomer}
                      className="trash-audio-modal"
                    />
                    <audio controls>
                      <source
                        type="audio/webm"
                        src={
                          isBase64(selectedStatement.customer_statements_voice)
                            ? selectedStatement.customer_statements_voice
                            : `${apiUrl}${selectedStatement.customer_statements_voice}`
                        }
                      />
                      مرورگر شما از پخش فایل‌های صوتی پشتیبانی نمی‌کند.
                    </audio>
                  </div>
                )}
              </div>
            </TabPanel>

            <TabPanel value={value} index={1} key={1}>
              <div className="wrap-image-modal">
                <div className="image-modal-content">
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="delete-img-modal"
                    onClick={handleDeleteImageExpert}
                  />
                  {selectedStatement?.expert_statements_file ? (
                    <img
                      src={
                        isBase64(selectedStatement.expert_statements_file)
                          ? selectedStatement.expert_statements_file
                          : `${apiUrl}${selectedStatement.expert_statements_file}`
                      }
                      alt="Customer statement"
                      className="img-statmentmodal"
                    />
                  ) : (
                    <div className="modal-empty-image">
                      <FontAwesomeIcon
                        icon={faImage}
                        className="empty-icon-image"
                      />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="filechnage"
                  className="btn-chnage-img-modal mt-4"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangeExpert}
                    className="mt-3 d-none"
                    id="filechnage"
                  />
                  ویرایش
                  <FontAwesomeIcon icon={faPen} className="mx-2" />
                </label>

                {selectedStatement?.expert_statements_voice && (
                  <div className="d-flex mt-4 align-items-center">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={handleDeleteAudioExpert}
                      className="trash-audio-modal"
                    />
                    <audio controls>
                      <source
                        type="audio/webm"
                        src={
                          isBase64(selectedStatement.expert_statements_voice)
                            ? selectedStatement.expert_statements_voice
                            : `${apiUrl}${selectedStatement.expert_statements_voice}`
                        }
                      />
                      مرورگر شما از پخش فایل‌های صوتی پشتیبانی نمی‌کند.
                    </audio>
                  </div>
                )}
              </div>
            </TabPanel>
          </Box>
        )}
      </Modal>
      <div className="pform3-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-form3-content">
            <div className="statements-container">
              <div className="statements-right">
                <div className="statements-customer">
                  <span className="statements-title">اظهارات مشتری</span>
                  <div className="statements-content">
                    <textarea
                      className="statements-text"
                      placeholder="اظهارات مشتری"
                      value={statementData.customer_statements_text}
                      onChange={handlecustomer_statements_textChange}
                    ></textarea>
                    <div className="statements-media">
                      <div className="media-statements media-voice">
                        {isRecordingCustomer ? (
                          <FontAwesomeIcon
                            icon={faMicrophoneSlash}
                            onClick={stopRecordingCustomer}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faMicrophone}
                            onClick={startRecordingCustomer}
                          />
                        )}
                      </div>
                      <label
                        htmlFor="file_customer"
                        className="media-statements media-file"
                      >
                        <input
                          type="file"
                          id="file_customer"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handlecustomer_statements_fileChange}
                        />
                        {statementData.customer_statements_file ? (
                          <FontAwesomeIcon icon={faFileLines} />
                        ) : (
                          <FontAwesomeIcon icon={faFile} />
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                {errors.customer_statements_text && (
                  <p className="error mt-2">
                    {errors.customer_statements_text}
                  </p>
                )}
              </div>

              <div className="statements-left">
                <div className="statements-export">
                  <span className="statements-title">اظهارات کارشناس</span>
                  <div className="statements-content">
                    <textarea
                      className="statements-text"
                      placeholder="اظهارات کارشناس"
                      value={statementData.expert_statements_text}
                      onChange={handleexpert_statements_textChange}
                    ></textarea>
                    <div className="statements-media">
                      <div className="media-statements media-voice">
                        {isRecordingExpert ? (
                          <FontAwesomeIcon
                            icon={faMicrophoneSlash}
                            onClick={stopRecordingExpert}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faMicrophone}
                            onClick={startRecordingExpert}
                          />
                        )}
                      </div>
                      <label
                        htmlFor="file_statment"
                        className="media-statements media-file"
                      >
                        <input
                          type="file"
                          id="file_statment"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleexpert_statements_fileChange}
                        />
                        {statementData.expert_statements_file ? (
                          <FontAwesomeIcon icon={faFileLines} />
                        ) : (
                          <FontAwesomeIcon icon={faFile} />
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {errors.expert_statements_text && (
                  <p className="error mt-2">{errors.expert_statements_text}</p>
                )}
              </div>
            </div>
            <p className="mt-4 mb-2 label_input">کد اظهار</p>
            <div className={"declaration-code-export "}>
              <Col xs={12} sm={7} md={6} lg={4} className="wrap-dropdown">
                <SelectDropDown
                  icon={""}
                  items={""}
                  name=""
                  value={""}
                  onChange={""}
                  material={""}
                />
              </Col>
              <Button2 onClick={""}>{"ارجا به کارشناس"}</Button2>
            </div>

            <div className="estimate-wrapper mt-4">
              <Col xs={12} md={5}>
                <div className="estimate-item">
                  <div className="estimate-input">
                    <div className={`input-container`}>
                      <label
                        htmlFor={"تخمین قیمت"}
                        className="label_input mb-2"
                      >
                        تخمین قیمت
                      </label>
                      <div className="input_content_wrapper">
                        <input
                          id={"تخمین قیمت"}
                          name={"تخمین قیمت"}
                          type={"text"}
                          placeholder={"تخمین قیمت"}
                          value={toFarsiNumber(
                            formatWithThousandSeparators(
                              statementData.price_estimate
                            )
                          )}
                          onChange={handleprice_estimateChange}
                          className="input_form"
                          autoComplete="off"
                          maxLength={30}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.price_estimate && (
                    <p className="error mt-2">{errors.price_estimate}</p>
                  )}
                </div>
              </Col>
              <Col xs={12} md={7}>
                <label htmlFor="estimated-time" className="label_input mb-2">
                  تخمین زمان تعمیر
                </label>
                <div className="d-flex gap-sx-2 gap-sm-4 align-items-center flex-wrap">
                  <div className="mt-3 mt-sm-0 estimate-item ">
                    <div className="estimate-input">
                      <DataInput value={dateValue} onChange={setDateValue} />
                    </div>
                    {errors.estimated_repair_time && (
                      <p className="error mt-2">
                        {errors.estimated_repair_time}
                      </p>
                    )}
                  </div>
                  <div className="wrap-btn">
                    <Button2 onClick={""}>{"برنامه ریزی تعمیرگاه"}</Button2>
                  </div>
                </div>
              </Col>
            </div>

            <div className="pform3-container-table mt-5" dir="rtl">
              <Button2 onClick={addStatement}>{"افزودن شرح اظهار"}</Button2>
              {formik.values.form.length ? (
                <TableForm columns={columns}>
                  {formik.values.form?.map((item, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      sx={{
                        border: "1px solid #ddd",
                        fontFamily: "iranYekan",
                        cursor: "pointer",
                      }}
                      className="statment-row-table"
                    >
                      {editMode && dataForm?.customer_form_three && (
                        <TableCell>{item.declaration_code}</TableCell>
                      )}
                      <TableCell sx={{ maxWidth: "280px" }}>
                        {item.customer_statements_text}
                      </TableCell>
                      <TableCell sx={{ maxWidth: "280px" }}>
                        {item.expert_statements_text}
                      </TableCell>
                      <TableCell>
                        {Number(item.price_estimate).toLocaleString("fa")}
                      </TableCell>
                      <TableCell>
                        {item?.estimated_repair_time
                          ? new Intl.DateTimeFormat("fa-IR", {
                              dateStyle: "full",
                              timeStyle: "short",
                            }).format(new Date(item?.estimated_repair_time))
                          : "N/A"}
                      </TableCell>
                      {item?.customer_statements_voice ||
                      item?.customer_statements_file ||
                      item?.expert_statements_file ||
                      item?.expert_statements_voice ? (
                        <TableCell
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <label
                            className="media-statements mx-1"
                            onClick={() => {
                              setIdDelete("");
                              handleShowModal(item);
                            }}
                          >
                            <FontAwesomeIcon icon={faFileLines} />
                          </label>
                        </TableCell>
                      ) : null}
                      <div className="wrap-trash-table">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => {
                            if (
                              editMode &&
                              dataForm?.customer_form_three?.length > 0
                            ) {
                              setIdDelete(item.declaration_code);
                              setShowModal(true);
                            } else {
                              handleDeleteStatement(rowIndex);
                            }
                          }}
                          className="trash-row-table"
                        />
                      </div>
                      <div className="wrap-edit-table">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          onClick={() => selectRow(item)}
                          className="edit-row-table"
                        />
                      </div>
                    </TableRow>
                  ))}
                </TableForm>
              ) : null}
            </div>
            <div className="p-form-actions pt-3">
              <EditBtn onClick={prevTab} text={"قبلی"} />
              <ConfirmBtn type="submit" isSubmitting={loading} />
            </div>
          </div>
        </form>
      </div>
      {loading && <LoadingForm />}
    </>
  );
}

{
  /* {statementData.expert_statements_voice && (
                                    <audio controls className='mt-4'>
                                        <source src={URL.createObjectURL(statementData.expert_statements_voice)} type="audio/webm" />
                                        مرورگر شما از پخش فایل‌های صوتی پشتیبانی نمی‌کند.
                                    </audio>
                                )} */
}

{
  /* {statementData.customer_statements_voice && (
                                   <audio controls className='mt-4'>
                                       <source src={URL.createObjectURL(statementData.customer_statements_voice)} type="audio/webm" />
                                       مرورگر شما از پخش فایل‌های صوتی پشتیبانی نمی‌کند.
                                   </audio>
                               )} */
}
