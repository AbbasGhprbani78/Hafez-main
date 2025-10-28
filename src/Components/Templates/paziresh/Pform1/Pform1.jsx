import { useEffect, useState } from "react";
import "./Pform1.css";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Input from "../../../Modules/Input/Input";
import Texteara from "../../../Modules/Texteara/Textarea";
import {
  faPhone,
  faUser,
  faEnvelope,
  faAddressCard,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import DropDown from "../../../Modules/DropDown/DropDown";
import InputRadio from "../../../Modules/InputRadio/InputRadio";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { useContext } from "react";
import { MyContext } from "../../../../context/context";
import { toFarsiNumber, toEnglishNumber } from "../../../../utils/helper";
import LoadingForm from "../../../Modules/Loading/LoadingForm";
import * as Yup from "yup";
import TypeOfService from "../../../Modules/TypeOfService/TypeOfService";
import apiClient from "../../../../config/axiosConfig";
import Grid from "@mui/material/Grid2";
import { errorMessage } from "../../../Modules/Toast/ToastCustom";

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

export default function Pform1({
  nextTab = () => {},
  setContent = () => {},
  setFormId = () => {},
  formId = "",
  currentTab,
  form1,
  editMode,
}) {
  const [value, setValue] = useState(0);
  const phoneNumberRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const nationalIdRegex = /^[0-9]{10}$/;
  const postalCodeRegex = /^[0-9]{10}$/;
  const economicCodeRegex = /^[0-9]{12}$/;
  const [loading, setLoading] = useState(false);
  const { isOpen, idForm } = useContext(MyContext);

  const validationSchema = Yup.object({
    owner_first_name: Yup.string().required("نام مالک را وارد کنید"),
    owner_last_name: Yup.string().required("نام خانوادگی مالک را وارد کنید"),
    phone_number: Yup.string()
      .matches(phoneNumberRegex, "شماره تماس مالک نامعتبر است")
      .required("شماره تماس مالک را وارد کنید"),
    national_code_owner: Yup.string()
      .matches(nationalIdRegex, "کد ملی مالک نامعتبر است")
      .required("کد ملی مالک را وارد کنید"),
    pyramid_number: Yup.string().required("شماره هرم را وارد کنید"),
    owner_address: Yup.string().required("آدرس را وارد کنید"),
    first_name_bearer: Yup.string().required("نام آورنده را وارد کنید"),
    last_name_bearer: Yup.string().required("نام خانوادگی آورنده را وارد کنید"),
    phone_number_bearer: Yup.string()
      .matches(phoneNumberRegex, "شماره تماس آورنده نامعتبر است")
      .required("شماره تماس آورنده را وارد کنید"),
    how_make_turn: Yup.string().required("نحوه نوبت دهی را انتخاب کنید"),
    how_to_apply: Yup.string().required("نحوه مراجعه را انتخاب کنید"),
    type_of_service: Yup.array().min(1, "حداقل یک نوع خدمات را انتخاب کنید"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      form_type: "personal",
      owner_first_name:
        form1?.form_type === "personal" ? form1.owner_first_name : "",
      owner_last_name:
        form1?.form_type === "personal" ? form1.owner_last_name : "",
      phone_number: form1?.form_type === "personal" ? form1.phone_number : "",
      national_code_owner:
        form1?.form_type === "personal" ? form1.national_code_owner : "",
      pyramid_number:
        form1?.form_type === "personal" ? form1.pyramid_number : "",
      owner_address: form1?.form_type === "personal" ? form1.owner_address : "",
      first_name_bearer:
        form1?.form_type === "personal" ? form1.first_name_bearer : "",
      last_name_bearer:
        form1?.form_type === "personal" ? form1.last_name_bearer : "",
      phone_number_bearer:
        form1?.form_type === "personal" ? form1.phone_number_bearer : "",
      how_make_turn: form1?.form_type === "personal" ? form1.how_make_turn : "",
      how_to_apply: form1?.form_type === "personal" ? form1.how_to_apply : "",
      type_of_service:
        form1?.form_type === "personal" ? form1.type_of_service : [],
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        let response;
        if (editMode && form1) {
          response = await apiClient.put(
            `/app/fill-customer-form/${idForm ? idForm : formId}`,
            values
          );
        } else {
          response = await apiClient.post(`/app/fill-customer-form/`, values);
        }

        if (response.status === 200 || response.status === 201) {
          setFormId(response.data.id);
          nextTab();
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const formik2 = useFormik({
    enableReinitialize: true,
    initialValues: {
      form_type: "corporate",
      company_name: form1?.form_type === "corporate" ? form1.company_name : "",
      phone_number: form1?.form_type === "corporate" ? form1.phone_number : "",
      pyramid_number:
        form1?.form_type === "corporate" ? form1.pyramid_number : "",
      national_id_corporate:
        form1?.form_type === "corporate" ? form1.national_id_corporate : "",
      economic_code:
        form1?.form_type === "corporate" ? form1.economic_code : "",
      company_phone_number:
        form1?.form_type === "corporate" ? form1.company_phone_number : "",
      postal_code: form1?.form_type === "corporate" ? form1.postal_code : "",
      how_make_turn:
        form1?.form_type === "corporate" ? form1.how_make_turn : "",
      address: form1?.form_type === "corporate" ? form1.address : "",
      how_to_apply: form1?.form_type === "corporate" ? form1.how_to_apply : "",
      first_name_bearer:
        form1?.form_type === "corporate" ? form1.first_name_bearer : "",
      last_name_bearer:
        form1?.form_type === "corporate" ? form1.last_name_bearer : "",
      national_code_bearer:
        form1?.form_type === "corporate" ? form1.national_code_bearer : "",
      phone_number_bearer:
        form1?.form_type === "corporate" ? form1.phone_number_bearer : "",
      type_of_service:
        form1?.form_type === "corporate" ? form1.type_of_service : [],
    },
    validationSchema: Yup.object({
      company_name: Yup.string().required("نام شرکت را وارد کنید"),
      phone_number: Yup.string()
        .matches(phoneNumberRegex, "شماره تماس نامعتبر است")
        .required("شماره تماس را وارد کنید"),
      pyramid_number: Yup.string().required("شماره هرم را وارد کنید"),
      national_id_corporate: Yup.string()
        .matches(nationalIdRegex, "شناسه ملی نامعتبر است")
        .required("شناسه ملی را وارد کنید"),
      economic_code: Yup.string()
        .matches(economicCodeRegex, "کد اقتصادی نامعتبر است")
        .required("کد اقتصادی را وارد کنید"),
      company_phone_number: Yup.string()
        .matches(phoneNumberRegex, "شماره تماس شرکت نامعتبر است")
        .required("شماره تماس شرکت را وارد کنید"),
      postal_code: Yup.string()
        .matches(postalCodeRegex, "کدپستی نامعتبر است")
        .required("کدپستی را وارد کنید"),
      how_make_turn: Yup.string().required("نحوه نوبت دهی را انتخاب کنید"),
      address: Yup.string().required("آدرس را وارد کنید"),
      how_to_apply: Yup.string().required("نحوه مراجعه را انتخاب کنید"),
      first_name_bearer: Yup.string().required("نام آورنده را وارد کنید"),
      last_name_bearer: Yup.string().required(
        "نام خانوادگی آورنده را وارد کنید"
      ),
      national_code_bearer: Yup.string()
        .matches(nationalIdRegex, "کد ملی آورنده نامعتبر است")
        .required("کد ملی آورنده را وارد کنید"),
      phone_number_bearer: Yup.string()
        .matches(phoneNumberRegex, "شماره تماس آورنده نامعتبر است")
        .required("شماره تماس آورنده را وارد کنید"),
      type_of_service: Yup.array().min(1, "حداقل یک نوع خدمات را انتخاب کنید"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      try {
        let response;
        if (editMode) {
          response = await apiClient.put(
            `/app/fill-customer-form/${idForm ? idForm : formId}`,
            values
          );
        } else {
          response = await apiClient.post(`/app/fill-customer-form/`, values);
        }

        if (response.status === 200 || response.status === 201) {
          setFormId(response.data.id);
          nextTab();
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };

  const handleServiceChange = (serviceId) => {
    const { type_of_service } = formik.values;

    if (type_of_service.includes(serviceId)) {
      formik.setFieldValue(
        "type_of_service",
        type_of_service.filter((id) => id !== serviceId)
      );
    } else {
      formik.setFieldValue("type_of_service", [...type_of_service, serviceId]);
    }
  };

  const handleServiceChangeCo = (serviceId) => {
    const { type_of_service } = formik2.values;
    if (type_of_service.includes(serviceId)) {
      formik2.setFieldValue(
        "type_of_service",
        type_of_service.filter((id) => id !== serviceId)
      );
    } else {
      formik2.setFieldValue("type_of_service", [...type_of_service, serviceId]);
    }
  };

  const handleSubmitWithToast = async (e) => {
    e.preventDefault();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errMsg) => {
        errorMessage(errMsg);
      });
      return;
    }
    formik.handleSubmit();
  };

  const handleSubmitWithToast2 = async (e) => {
    e.preventDefault();
    const errors = await formik2.validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errMsg) => {
        errorMessage(errMsg);
      });
      return;
    }

    formik2.handleSubmit();
  };

  useEffect(() => {
    setContent("اطلاعات اولیه مشتری :");
  }, [setContent]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 200);

    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    const type = form1?.form_type ?? "personal";
    setValue(type === "personal" ? 0 : 1);
  }, [form1?.form_type]);

  return (
    <>
      <div className="form1-container">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChangetab}
            aria-label="simple tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#15616d",
              },
            }}
          >
            <CustomTab
              label="شخصی"
              {...a11yProps(0)}
              style={{ color: "#15616d" }}
            />
            <CustomTab
              label="شرکتی"
              {...a11yProps(1)}
              style={{ color: "#15616d" }}
            />
          </Tabs>
          <TabPanel value={value} index={0} className={"tab1-pform1"}>
            <form onSubmit={handleSubmitWithToast}>
              <fieldset
                className={`p-form1-contant ${
                  currentTab !== 4 && "scroll-form"
                }`}
                style={{
                  pointerEvents: currentTab === 4 ? "none" : "auto",
                  border: "none ",
                  padding: 0,
                  margin: 0,
                }}
              >
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="نام مالک"
                      styled={"inputwidth"}
                      icon={faUser}
                      placeholder="نام مالک"
                      name="owner_first_name"
                      value={formik.values.owner_first_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                    />
                    {formik.touched.owner_first_name &&
                      formik.errors.owner_first_name && (
                        <span className="error">
                          {formik.errors.owner_first_name}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="نام خانوادگی مالک"
                      styled={"inputwidth"}
                      icon={faUser}
                      placeholder="نام خانوادگی مالک"
                      name="owner_last_name"
                      value={formik.values.owner_last_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                    />
                    {formik.touched.owner_last_name &&
                      formik.errors.owner_last_name && (
                        <span className="error">
                          {formik.errors.owner_last_name}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="شماره تماس مالک"
                      styled={"inputwidth"}
                      icon={faPhone}
                      placeholder="شماره تماس مالک"
                      name="phone_number"
                      value={toFarsiNumber(formik.values.phone_number)}
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik.setFieldValue("phone_number", englishNumber);
                      }}
                      onBlur={formik.handleBlur}
                      type="text"
                    />
                    {formik.touched.phone_number &&
                      formik.errors.phone_number && (
                        <span className="error">
                          {formik.errors.phone_number}
                        </span>
                      )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="کد ملی مالک"
                      styled={"inputwidth"}
                      icon={faAddressCard}
                      placeholder="کد ملی مالک"
                      name="national_code_owner"
                      value={toFarsiNumber(formik.values.national_code_owner)}
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik.setFieldValue(
                          "national_code_owner",
                          englishNumber
                        );
                      }}
                      onBlur={formik.handleBlur}
                      type="text"
                    />
                    {formik.touched.national_code_owner &&
                      formik.errors.national_code_owner && (
                        <span className="error">
                          {formik.errors.national_code_owner}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="شماره هرم"
                      styled={"inputwidth"}
                      icon={faHashtag}
                      placeholder="شماره هرم"
                      name="pyramid_number"
                      value={toFarsiNumber(formik.values.pyramid_number)}
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik.setFieldValue("pyramid_number", englishNumber);
                      }}
                      onBlur={formik.handleBlur}
                      type="text"
                    />
                    {formik.touched.pyramid_number &&
                      formik.errors.pyramid_number && (
                        <span className="error">
                          {formik.errors.pyramid_number}
                        </span>
                      )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12 }}>
                    <Texteara
                      value={formik.values.owner_address}
                      onChange={formik.handleChange}
                      name="owner_address"
                      onBlur={formik.handleBlur}
                      styled={"eara1"}
                      text={"آدرس"}
                    />
                    {formik.touched.owner_address &&
                      formik.errors.owner_address && (
                        <span className="error">
                          {formik.errors.owner_address}
                        </span>
                      )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="نام آورنده"
                      styled={"inputwidth"}
                      icon={faUser}
                      value={formik.values.first_name_bearer}
                      placeholder="نام آورنده"
                      name="first_name_bearer"
                      onChange={formik.handleChange}
                      type="text"
                    />
                    {formik.errors.first_name_bearer &&
                      formik.touched.first_name_bearer && (
                        <span className="error">
                          {formik.errors.first_name_bearer}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="نام خانوادگی آورنده"
                      styled={"inputwidth"}
                      icon={faUser}
                      value={formik.values.last_name_bearer}
                      placeholder="نام خانواگی آورنده"
                      name="last_name_bearer"
                      onChange={formik.handleChange}
                      type="text"
                    />
                    {formik.errors.last_name_bearer &&
                      formik.touched.last_name_bearer && (
                        <span className="error">
                          {formik.errors.last_name_bearer}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="شماره تماس آورنده"
                      styled={"inputwidth"}
                      icon={faPhone}
                      value={toFarsiNumber(formik.values.phone_number_bearer)}
                      placeholder="شماره تماس آورنده"
                      name="phone_number_bearer"
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik.setFieldValue(
                          "phone_number_bearer",
                          englishNumber
                        );
                      }}
                      type="text"
                    />

                    {formik.errors.phone_number_bearer &&
                      formik.touched.phone_number_bearer && (
                        <span className="error">
                          {formik.errors.phone_number_bearer}
                        </span>
                      )}
                  </Grid>
                </Grid>
                <div className="wrap-coplete-info">
                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={4}
                    className={"distancerow"}
                  >
                    <Grid size={{ xs: 12 }}>
                      <p className="complete-info">اطلاعات تکمیلی :</p>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={4}
                    className={"distancerow "}
                  >
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <div className="make-turn">
                        <span className="title-item-form">نحوه نوبت دهی</span>
                        <DropDown
                          styled={"dropwidth"}
                          items={[
                            { value: "by phone", name: "تلفنی" },
                            {
                              value: "without taking a turn",
                              name: "بدون اخذ نوبت",
                            },
                            { value: "in person", name: "حضوری" },
                            { value: "internet", name: "اینترنتی" },
                          ]}
                          onChange={formik.setFieldValue}
                          name="how_make_turn"
                          defaultValue={formik.values.how_make_turn}
                        />

                        {formik.errors.how_make_turn &&
                          formik.touched.how_make_turn && (
                            <span className="error">
                              {formik.errors.how_make_turn}
                            </span>
                          )}
                      </div>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <div className="refer-content">
                        <div className="wrapper-refrer-option">
                          <span className="title-item-form">نحوه مراجعه</span>
                          <div className="refrer-option">
                            <InputRadio
                              marginRight="radiostyle"
                              text="عادی"
                              name="how_to_apply"
                              value="normal"
                              onChange={formik.handleChange}
                              checked={formik.values.how_to_apply === "normal"}
                            />
                            <InputRadio
                              marginRight="radiostyle"
                              text="امدادی"
                              name="how_to_apply"
                              value="auxiliary"
                              onChange={formik.handleChange}
                              checked={
                                formik.values.how_to_apply === "auxiliary"
                              }
                            />
                            <InputRadio
                              marginRight="radiostyle"
                              text="برگشتی"
                              name="how_to_apply"
                              value="return"
                              onChange={formik.handleChange}
                              checked={formik.values.how_to_apply === "return"}
                            />
                          </div>
                        </div>
                        {formik.errors.how_to_apply &&
                          formik.touched.how_to_apply && (
                            <span className="error">
                              {formik.errors.how_to_apply}
                            </span>
                          )}
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12 }}>
                    <TypeOfService
                      handleServiceChange={handleServiceChange}
                      selectedServices={formik.values.type_of_service}
                    />

                    {formik.errors.type_of_service &&
                      formik.touched.type_of_service && (
                        <span className="error">
                          {formik.errors.type_of_service}
                        </span>
                      )}
                  </Grid>
                </Grid>
                {currentTab !== 4 && (
                  <div className="p-form-actions">
                    <ConfirmBtn
                      type="submit"
                      isSubmitting={formik.isSubmitting}
                    />
                  </div>
                )}
              </fieldset>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1} className={"tab1-pform1"}>
            <form onSubmit={handleSubmitWithToast2}>
              <fieldset
                className={`p-fomrm1-tab2-wrapper ${
                  currentTab !== 4 && "scroll-form"
                }`}
                style={{
                  pointerEvents: currentTab === 4 ? "none" : "auto",
                  border: "none ",
                  padding: 0,
                  margin: 0,
                }}
              >
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="نام شرکت"
                      styled={"inputwidth2"}
                      icon={faUser}
                      value={formik2.values.company_name}
                      placeholder={"نام شرکت"}
                      name="company_name"
                      onChange={formik2.handleChange}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />
                    {formik2.errors.company_name &&
                      formik2.touched.company_name && (
                        <span className="error">
                          {formik2.errors.company_name}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="شماره تماس"
                      styled={"inputwidth2"}
                      icon={faPhone}
                      value={toFarsiNumber(formik2.values.phone_number)}
                      placeholder="شماره تماس"
                      name="phone_number"
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik2.setFieldValue("phone_number", englishNumber);
                      }}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />

                    {formik2.errors.phone_number &&
                      formik2.touched.phone_number && (
                        <span className="error">
                          {formik2.errors.phone_number}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="شماره هرم"
                      styled={"inputwidth2"}
                      icon={faUser}
                      placeholder="شماره هرم"
                      name="pyramid_number"
                      value={toFarsiNumber(formik2.values.pyramid_number)}
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik2.setFieldValue("pyramid_number", englishNumber);
                      }}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />
                    {formik2.errors.pyramid_number &&
                      formik2.touched.pyramid_number && (
                        <span className="error">
                          {formik2.errors.pyramid_number}
                        </span>
                      )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="شناسه ملی شرکت"
                      styled={"inputwidth2"}
                      icon={faAddressCard}
                      placeholder={"شناسه ملی شرکت"}
                      name="national_id_corporate"
                      value={toFarsiNumber(
                        formik2.values.national_id_corporate
                      )}
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik2.setFieldValue(
                          "national_id_corporate",
                          englishNumber
                        );
                      }}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />
                    {formik2.errors.national_id_corporate &&
                      formik2.touched.national_id_corporate && (
                        <span className="error">
                          {formik2.errors.national_id_corporate}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="شماره تماس"
                      styled={"inputwidth2"}
                      icon={faUser}
                      placeholder="شماره تماس شرکت"
                      name="company_phone_number"
                      value={toFarsiNumber(formik2.values.company_phone_number)}
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik2.setFieldValue(
                          "company_phone_number",
                          englishNumber
                        );
                      }}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />
                    {formik2.errors.company_phone_number &&
                      formik2.touched.company_phone_number && (
                        <span className="error">
                          {formik2.errors.company_phone_number}
                        </span>
                      )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  sx={{ display: "flex", alignItems: "end" }}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="کد اقتصادی"
                      styled={"inputwidth2"}
                      icon={faHashtag}
                      value={toFarsiNumber(formik2.values.economic_code)}
                      placeholder="کد اقتصادی"
                      name="economic_code"
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik2.setFieldValue("economic_code", englishNumber);
                      }}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />

                    {formik2.errors.economic_code &&
                      formik2.touched.economic_code && (
                        <span className="error">
                          {formik2.errors.economic_code}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="کدپستی"
                      styled={"inputwidth2"}
                      icon={faEnvelope}
                      value={toFarsiNumber(formik2.values.postal_code)}
                      placeholder="کدپستی"
                      name="postal_code"
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik2.setFieldValue("postal_code", englishNumber);
                      }}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />

                    {formik2.errors.postal_code &&
                      formik2.touched.postal_code && (
                        <span className="error">
                          {formik2.errors.postal_code}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <p className="title-type-res">نحوه نوبت دهی </p>
                    <DropDown
                      items={[
                        { value: "by phone", name: "تلفنی" },
                        {
                          value: "without taking a turn",
                          name: "بدون اخذ نوبت",
                        },
                        { value: "in person", name: "حضوری" },
                        { value: "internet", name: "اینترنتی" },
                      ]}
                      onBlur={formik2.handleBlur}
                      name="how_make_turn"
                      onChange={formik2.setFieldValue}
                      value={formik2.values.how_make_turn}
                      defaultValue={formik2.values.how_make_turn}
                    />
                    {formik2.errors.how_make_turn &&
                      formik2.touched.how_make_turn && (
                        <span className="error">
                          {formik2.errors.how_make_turn}
                        </span>
                      )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  sx={{ alignItems: "end" }}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Texteara
                      value={formik2.values.address}
                      onChange={formik2.handleChange}
                      onBlur={formik2.handleBlur}
                      styled={"eara1"}
                      name="address"
                      text={"آدرس"}
                    />
                    {formik2.errors.address && formik2.touched.address && (
                      <span className="error">{formik2.errors.address}</span>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <span className="title-item-form">نحوه مراجعه</span>
                    <div className="refrer-option">
                      <InputRadio
                        marginRight="radiostyle"
                        text="عادی"
                        name="how_to_apply"
                        value="normal"
                        onChange={formik2.handleChange}
                        checked={formik2.values.how_to_apply === "normal"}
                      />
                      <InputRadio
                        marginRight="radiostyle"
                        text="امدادی"
                        name="how_to_apply"
                        value="auxiliary"
                        onChange={formik2.handleChange}
                        checked={formik2.values.how_to_apply === "auxiliary"}
                      />
                      <InputRadio
                        marginRight="radiostyle"
                        text="برگشتی"
                        name="how_to_apply"
                        value="return"
                        onChange={formik2.handleChange}
                        checked={formik2.values.how_to_apply === "return"}
                      />
                    </div>
                    {formik2.errors.how_to_apply &&
                      formik2.touched.how_to_apply && (
                        <span className="error">
                          {formik2.errors.how_to_apply}
                        </span>
                      )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="نام آورنده"
                      styled={"inputwidth2"}
                      icon={faUser}
                      value={formik2.values.first_name_bearer}
                      placeholder={"نام آورنده"}
                      name="first_name_bearer"
                      onChange={formik2.handleChange}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />
                    {formik2.errors.first_name_bearer &&
                      formik2.touched.first_name_bearer && (
                        <span className="error">
                          {formik2.errors.first_name_bearer}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="نام خانوادگی آورنده"
                      styled={"inputwidth2"}
                      icon={faUser}
                      placeholder={"نام خانوادگی آورنده"}
                      name="last_name_bearer"
                      value={formik2.values.last_name_bearer}
                      onChange={formik2.handleChange}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />
                    {formik2.errors.last_name_bearer &&
                      formik2.touched.last_name_bearer && (
                        <span className="error">
                          {formik2.errors.last_name_bearer}
                        </span>
                      )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="کد ملی آورنده"
                      styled={"inputwidth2"}
                      icon={faAddressCard}
                      placeholder={"کد ملی آورنده"}
                      name="national_code_bearer"
                      value={toFarsiNumber(formik2.values.national_code_bearer)}
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik2.setFieldValue(
                          "national_code_bearer",
                          englishNumber
                        );
                      }}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />
                    {formik2.errors.national_code_bearer &&
                      formik2.touched.national_code_bearer && (
                        <span className="error">
                          {formik2.errors.national_code_bearer}
                        </span>
                      )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Input
                      label="شماره تماس آورنده"
                      styled={"inputwidth2"}
                      icon={faPhone}
                      placeholder="شماره تماس آورنده"
                      name="phone_number_bearer"
                      value={toFarsiNumber(formik2.values.phone_number_bearer)}
                      onChange={(e) => {
                        const englishNumber = toEnglishNumber(e.target.value);
                        formik2.setFieldValue(
                          "phone_number_bearer",
                          englishNumber
                        );
                      }}
                      onBlur={formik2.handleBlur}
                      type="text"
                    />

                    {formik2.errors.phone_number_bearer &&
                      formik2.touched.phone_number_bearer && (
                        <span className="error">
                          {formik2.errors.phone_number_bearer}
                        </span>
                      )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  className={"distancerow"}
                >
                  <Grid size={{ xs: 12 }}>
                    <TypeOfService
                      handleServiceChange={handleServiceChangeCo}
                      selectedServices={formik2.values?.type_of_service}
                    />

                    {formik2.errors.type_of_service &&
                      formik2.touched.type_of_service && (
                        <span className="error">
                          {formik2.errors.type_of_service}
                        </span>
                      )}
                  </Grid>
                </Grid>

                {currentTab !== 4 && (
                  <div className="p-form-actions">
                    <ConfirmBtn
                      type="submit"
                      isSubmitting={formik2.isSubmitting}
                    />
                  </div>
                )}
              </fieldset>
            </form>
          </TabPanel>
        </Box>
      </div>
      {loading && <LoadingForm />}
    </>
  );
}

// useEffect(() => {
//   if (formik.dirty) {
//     setIsEdited(true);
//   }
// }, [formik.dirty]);

// useEffect(() => {
//   if (formik2.dirty) {
//     setIsEdited2(true);
//   }
// }, [formik2.dirty]);
