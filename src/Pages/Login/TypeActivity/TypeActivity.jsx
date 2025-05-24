import { useState } from "react";
import "./TypeActivity.css";
import Input from "../../../Components/Modules/Input/Input";
import Button1 from "../../../Components/Modules/Button1/Button1";
import InputUpload from "../../../Components/Modules/InputUpload/InputUpload";
import {
  faPhone,
  faUser,
  faAddressCard,
  faPlus,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputRadio from "../../../Components/Modules/InputRadio/InputRadio";
import Input2 from "../../../Components/Modules/input2/Input2";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toEnglishNumber, toFarsiNumber } from "../../../utils/helper";
import apiClient from "../../../config/axiosConfig";
import Grid from "@mui/material/Grid2";

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

export default function TypeActivity() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [isPermition, setIsPermition] = useState("");
  const [loading, setLoading] = useState(false);

  const customErrorMessages = {
    signed_right: "وضعیت حق امضا را مشخص کنید.",
    applicants_position_in_company: "وارد کردن سمت درخواست اجباری میباشد",
    company_national_id: "وارد کردن شناسه ملی شرکت اجباری میباشد",
    phone_number: "وارد کردن شماره تماس شرکت اجباری میباشد",
    address: "وارد کردن آدرس شرکت اجباری میباشد",
    postal_code: "وارد کردن کدپستی شرکت اجباری میباشد",
    company_statute_image: " تصویر اساسنامه شرکت را قرار دهید",
    last_ad_changes_image: " تصویر آخرین آگهی تغییرات را قرار دهید",
    company_image: " تصویر لوگو شرکت را قرار دهید",
    owner_first_signature: " نام صاحب امضا را وارد کنید",
    national_code: "وارد کردن کد ملی صاحب امضا اجباری میباشد",
    full_name: "وارد کردن نام و نام خانوادگی اجباری میباشد",
    position_incompany: "وارد کردن سمت در شرکت اجباری میباشد",
    phone_number_signature: "وارد کردن شماره موبایل اجباری میباشد",
  };

  const regexPatterns = {
    national_code: /^\d{10}$/,
    phone_number:
      /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/,
    company_national_id: /^\d{11}$/,
    postal_code: /^\d{10}$/,
  };

  const [dataFormCompany, setDataFormCompany] = useState({
    applicants_position_in_company: "",
    signed_right: "",
    company_national_id: "",
    phone_number: "",
    address: "",
    postal_code: "",
    company_statute_image: "",
    last_ad_changes_image: "",
    company_image: "",
  });

  const [addSignature, setAddSignature] = useState([
    {
      full_name: "",
      position_incompany: "",
      national_code: "",
      phone_number: "",
    },
  ]);

  const [firstSignature, setFirstSignature] = useState([
    {
      owner_first_signature: "",
      national_code: "",
    },
  ]);

  const [errors, setErrors] = useState({
    dataFormCompany: {},
    firstSignature: [{}],
    addSignature: [{}],
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChange = (name, file) => {
    setDataFormCompany((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const handlerAddinputssignatureFalse = () => {
    setAddSignature([
      ...addSignature,
      {
        full_name: "",
        position_incompany: "",
        national_code: "",
        phone_number: "",
      },
    ]);
  };

  const handlerAddinputssignatureTrue = () => {
    setFirstSignature([
      ...firstSignature,
      {
        owner_first_signature: "",
        national_code: "",
      },
    ]);
  };

  const validateDataFormCompany = (data) => {
    let isValid = true;
    let newErrors = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === "signed_right" && value === "") {
        newErrors[key] =
          customErrorMessages[key] ||
          `لطفا فیلد ${key.replace("_", " ")} را پر کنید.`;
        isValid = false;
      } else if (key !== "signed_right" && !value) {
        newErrors[key] =
          customErrorMessages[key] ||
          `لطفا فیلد ${key.replace("_", " ")} را پر کنید.`;
        isValid = false;
      } else if (regexPatterns[key] && !regexPatterns[key].test(value)) {
        newErrors[key] = `لطفا ${key.replace("_", " ")} معتبر وارد کنید.`;
        isValid = false;
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, dataFormCompany: newErrors }));
    return isValid;
  };

  const validateFirstSignature = (signatures) => {
    let isValid = true;
    let newErrors = [];
    signatures.forEach((signature, index) => {
      let signatureErrors = {};
      if (!signature.owner_first_signature) {
        signatureErrors.owner_first_signature =
          customErrorMessages.owner_first_signature;
        isValid = false;
      }
      if (!signature.national_code) {
        signatureErrors.national_code = customErrorMessages.national_code;
        isValid = false;
      } else if (!regexPatterns.national_code.test(signature.national_code)) {
        signatureErrors.national_code = "کد ملی معتبر وارد کنید.";
        isValid = false;
      }
      newErrors[index] = signatureErrors;
    });
    setErrors((prevErrors) => ({ ...prevErrors, firstSignature: newErrors }));
    return isValid;
  };

  const validateAddSignature = (signatures) => {
    let isValid = true;
    let newErrors = [];
    signatures.forEach((signature, index) => {
      let signatureErrors = {};
      if (!signature.full_name) {
        signatureErrors.full_name = customErrorMessages.full_name;
        isValid = false;
      }
      if (!signature.position_incompany) {
        signatureErrors.position_incompany =
          customErrorMessages.position_incompany;
        isValid = false;
      }
      if (!signature.national_code) {
        signatureErrors.national_code = customErrorMessages.national_code;
        isValid = false;
      } else if (!regexPatterns.national_code.test(signature.national_code)) {
        signatureErrors.national_code = "کد ملی معتبر وارد کنید.";
        isValid = false;
      }
      if (!signature.phone_number) {
        signatureErrors.phone_number =
          customErrorMessages.phone_number_signature;
        isValid = false;
      } else if (!regexPatterns.phone_number.test(signature.phone_number)) {
        signatureErrors.phone_number = "شماره موبایل معتبر وارد کنید.";
        isValid = false;
      }
      newErrors[index] = signatureErrors;
    });
    setErrors((prevErrors) => ({ ...prevErrors, addSignature: newErrors }));
    return isValid;
  };

  const sendDataHandler = async (e) => {
    e.preventDefault();
    let isValid = validateDataFormCompany(dataFormCompany);
    if (dataFormCompany.signed_right === true) {
      isValid = validateFirstSignature(firstSignature) && isValid;
    } else if (dataFormCompany.signed_right === false) {
      isValid = validateAddSignature(addSignature) && isValid;
    }

    if (isValid) {
      let updatedDataFormCompany;
      if (isPermition) {
        updatedDataFormCompany = { ...dataFormCompany, firstSignature };
        delete updatedDataFormCompany.addSignature;
      } else {
        updatedDataFormCompany = { ...dataFormCompany, addSignature };
        delete updatedDataFormCompany.firstSignature;
      }

      setDataFormCompany(updatedDataFormCompany);
      setLoading(true);

      try {
        const response = await apiClient.post(
          `/user/continuation-signup/`,
          updatedDataFormCompany
        );

        if (response.status === 201) {
          setLoading(false);
          localStorage.setItem("level", "two");
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-left",
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="signup-page">
      <Grid container className="back-wrapper">
        <Grid
          size={{ xs: 12, md: 7, xl: 8 }}
          className="empty-space-login"
        ></Grid>
        <Grid
          size={{ xs: 12, md: 5, xl: 4 }}
          className="background-signUp activity-back"
        ></Grid>
      </Grid>
      <div className="form-container">
        <div className="form-hold">
          <p className="Signin-title p-signin">نوع فعالیت</p>
          <div className="form-wrapper p-signin">
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <CustomTab label="شخصی" {...a11yProps(0)} />
                <CustomTab label="شرکتی" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Formik
                  validate={(values) => {
                    const errors = {};
                    if (values.first_name === "") {
                      errors.first_name = "وارد کردن نام اجباری میباشد";
                    } else if (values.first_name.length < 4) {
                      errors.first_name = "نام حداقل باید 4 کاراکتر باشد";
                    }
                    if (values.last_name === "") {
                      errors.last_name = "وارد کردن نام خانوادگی اجباری میباشد";
                    } else if (values.last_name.length < 4) {
                      errors.last_name =
                        "نام خانوادگی حداقل باید 4 کاراکتر باشد";
                    }

                    if (values.national_code === "") {
                      errors.national_code = "وارد کردن کدملی اجباری میباشد";
                    } else if (!/^\d{10}$/.test(values.national_code)) {
                      errors.national_code = "کدملی وارد شده معتبر نیست";
                    }

                    if (values.applicant_phone_number === "") {
                      errors.applicant_phone_number =
                        "وارد کردن شماره اجباری میباشد";
                    } else if (
                      !/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(
                        values.applicant_phone_number
                      )
                    ) {
                      errors.applicant_phone_number =
                        "شماره وارد شده معتبر نیست";
                    }
                    if (values.address === "") {
                      errors.address = "وارد کردن آدرس اجباری میباشد";
                    }
                    if (values.postal_code === "") {
                      errors.postal_code = "وارد کردن پستی اجباری میباشد";
                    } else if (!/^\d{10}$/.test(values.postal_code)) {
                      errors.postal_code = "کدپستی وارد شده معتبر نیست";
                    }
                    if (values.work_place_number === "") {
                      errors.work_place_number =
                        "وارد کردن شماره اجباری میباشد";
                    } else if (
                      !/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(
                        values.work_place_number
                      )
                    ) {
                      errors.work_place_number = "شماره وارد شده معتبر نیست";
                    }
                    if (values.business_license_image === "") {
                      errors.business_license_image =
                        "تصویر جواز کسب را قرار دهید";
                    }
                    if (values.national_card_image === "") {
                      errors.national_card_image =
                        "تصویر کارت ملی را قرار دهید";
                    }
                    return errors;
                  }}
                  initialValues={{
                    personal: "Personal",
                    first_name: "",
                    last_name: "",
                    national_code: "",
                    applicant_phone_number: "",
                    address: "",
                    postal_code: "",
                    work_place_number: "",
                    business_license_image: "",
                    national_card_image: "",
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const response = await apiClient.post(
                        `/user/continuation-signup/`,
                        values
                      );
                      if (response.status === 201) {
                        setSubmitting(false);
                        localStorage.setItem("level", "two");
                        navigate("/");
                      }
                    } catch (error) {
                      toast.error(error.response.data.message, {
                        position: "top-left",
                      });
                      setSubmitting(false);
                    }
                  }}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors,
                    touched,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-content activityheight">
                        <div className="form-signin">
                          <div className="signin-basic-info-wrapper margin-buttom">
                            <div className="input-item-wrapper">
                              <Input
                                label={"نام"}
                                icon={faUser}
                                placeholder="نام"
                                type="text"
                                name={"first_name"}
                                onChange={handleChange}
                                value={values.first_name}
                              />
                              {errors.first_name && touched.first_name && (
                                <p className="error mt-2">
                                  {errors.first_name}
                                </p>
                              )}
                            </div>
                            <div className="input-item-wrapper">
                              <Input
                                label="نام خانوادگی"
                                icon={faUser}
                                placeholder="نام خانوادگی صاحب فعالیت"
                                type="text"
                                name={"last_name"}
                                value={values.last_name}
                                onChange={handleChange}
                              />
                              {errors.last_name && touched.last_name && (
                                <p className="error mt-2">{errors.last_name}</p>
                              )}
                            </div>
                          </div>
                          <div className="signin-basic-info-wrapper margin-buttom">
                            <div className="input-item-wrapper">
                              <Input
                                label="کد ملی"
                                icon={faAddressCard}
                                placeholder=" کد ملی صاحب فعالیت"
                                type="text"
                                name={"national_code"}
                                onChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: "national_code",
                                      value: toEnglishNumber(e.target.value),
                                    },
                                  })
                                }
                                value={toFarsiNumber(values.national_code)}
                              />
                              {errors.national_code &&
                                touched.national_code && (
                                  <p className="error mt-2">
                                    {errors.national_code}
                                  </p>
                                )}
                            </div>
                            <div className="input-item-wrapper">
                              <Input
                                label="شماره تماس متقاضی"
                                icon={faPhone}
                                placeholder="شماره تماس متقاضی"
                                type="text"
                                name={"applicant_phone_number"}
                                onChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: "applicant_phone_number",
                                      value: toEnglishNumber(e.target.value),
                                    },
                                  })
                                }
                                value={toFarsiNumber(
                                  values.applicant_phone_number
                                )}
                              />
                              {errors.applicant_phone_number &&
                                touched.applicant_phone_number && (
                                  <p className="error mt-2">
                                    {errors.applicant_phone_number}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="signin-element-form-wrapper margin-buttom">
                            <Input
                              label="آدرس"
                              icon={faLocationDot}
                              placeholder="آدرس محل فعالیت"
                              type="text"
                              name={"address"}
                              onChange={handleChange}
                              value={values.address}
                            />
                            {errors.address && touched.address && (
                              <p className="error mt-2">{errors.address}</p>
                            )}
                          </div>
                          <div className="signin-basic-info-wrapper margin-buttom">
                            <div className="input-item-wrapper">
                              <Input
                                label="کدپستی"
                                icon={faHashtag}
                                placeholder="کدپستی محل فعالیت"
                                type="text"
                                name={"postal_code"}
                                onChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: "postal_code",
                                      value: toEnglishNumber(e.target.value),
                                    },
                                  })
                                }
                                value={toFarsiNumber(values.postal_code)}
                              />
                              {errors.postal_code && touched.postal_code && (
                                <p className="error mt-2">
                                  {errors.postal_code}
                                </p>
                              )}
                            </div>
                            <div className="input-item-wrapper">
                              <Input
                                name="work_place_number"
                                label="شماره تماس محل فعالیت"
                                icon={faPhone}
                                placeholder="شماره تماس محل فعالیت"
                                type="text"
                                onChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: "work_place_number",
                                      value: toEnglishNumber(e.target.value),
                                    },
                                  })
                                }
                                value={toFarsiNumber(values.work_place_number)}
                              />
                              {errors.work_place_number &&
                                touched.work_place_number && (
                                  <p className="error mt-2">
                                    {errors.work_place_number}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="signin-basic-info-wrapper margin-buttom">
                            <div className="input-item-wrapper">
                              <InputUpload
                                label={"تصویر جواز کسب"}
                                name="business_license_image"
                                onChange={(file) =>
                                  setFieldValue("business_license_image", file)
                                }
                              />
                              {errors.business_license_image &&
                                touched.business_license_image && (
                                  <p className="error mt-2">
                                    {errors.business_license_image}
                                  </p>
                                )}
                            </div>
                            <div className="input-item-wrapper">
                              <InputUpload
                                label={"تصویر کارت"}
                                name="national_card_image"
                                onChange={(file) =>
                                  setFieldValue("national_card_image", file)
                                }
                              />
                              {errors.national_card_image &&
                                touched.national_card_image && (
                                  <p className="error mt-2">
                                    {errors.national_card_image}
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="signin-btn-wrapper">
                        <Button1 type="submit" isSubmitting={isSubmitting} />
                      </div>
                    </form>
                  )}
                </Formik>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <form onSubmit={sendDataHandler}>
                  <div className="form-content-all-form">
                    <div className="form-signin">
                      <div className="form-content-top">
                        <div className="signin-element-form-wrapper margin-buttom">
                          <Input
                            name="applicants_position_in_company"
                            label="سمت درخواست کننده"
                            icon={faUser}
                            placeholder="سمت درخواست کننده در شرکت"
                            type="text"
                            onChange={(e) => {
                              setDataFormCompany({
                                ...dataFormCompany,
                                applicants_position_in_company: e.target.value,
                              });
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                dataFormCompany: {
                                  ...prevErrors.dataFormCompany,
                                  applicants_position_in_company: "",
                                },
                              }));
                            }}
                            value={
                              dataFormCompany.applicants_position_in_company
                            }
                          />
                          {errors.dataFormCompany
                            .applicants_position_in_company && (
                            <p className="error mt-2">
                              {
                                errors.dataFormCompany
                                  .applicants_position_in_company
                              }
                            </p>
                          )}
                        </div>

                        <div className="radio-wrapper label-input">
                          <p className="mb-3">حق امضا</p>
                          <div className="d-flex">
                            <InputRadio
                              text="دارم"
                              name="signed_right"
                              value={true}
                              checked={dataFormCompany.signed_right === true}
                              onChange={() => {
                                setDataFormCompany({
                                  ...dataFormCompany,
                                  signed_right: true,
                                });
                                setIsPermition(true);
                                setAddSignature([
                                  {
                                    full_name: "",
                                    position_incompany: "",
                                    national_code: "",
                                    phone_number: "",
                                  },
                                ]);
                              }}
                            />
                            <InputRadio
                              text="ندارم"
                              marginRight={"marginRight"}
                              name="signed_right"
                              value={false}
                              checked={dataFormCompany.signed_right === false}
                              onChange={() => {
                                setDataFormCompany({
                                  ...dataFormCompany,
                                  signed_right: false,
                                });
                                setIsPermition(false);
                                setFirstSignature([
                                  {
                                    owner_first_signature: "",
                                    national_code: "",
                                  },
                                ]);
                              }}
                            />
                          </div>
                          {errors.dataFormCompany.signed_right && (
                            <p className="error mt-2">
                              {errors.dataFormCompany.signed_right}
                            </p>
                          )}
                        </div>
                        {isPermition ? (
                          <>
                            {firstSignature.map((input, index) => (
                              <div
                                className="signature-true-wrapper"
                                key={index}
                              >
                                <p className="mb-2 mt-4 info-owner-text">
                                  اطلاعات صاحب امضا جدید
                                </p>
                                <div className="signin-element-form-wrapper margin-buttom">
                                  <Input2
                                    icon={faUser}
                                    placeholder={`صاحب امضا ${index + 2}`}
                                    name="owner_first_signature"
                                    onChange={(e) => {
                                      const newFirstSignature = [
                                        ...firstSignature,
                                      ];
                                      newFirstSignature[
                                        index
                                      ].owner_first_signature = e.target.value;
                                      setFirstSignature(newFirstSignature);
                                      const newErrors = [
                                        ...errors.firstSignature,
                                      ];
                                      if (newErrors[index])
                                        newErrors[index].owner_first_signature =
                                          "";
                                      setErrors((prevErrors) => ({
                                        ...prevErrors,
                                        firstSignature: newErrors,
                                      }));
                                    }}
                                    value={input.owner_first_signature}
                                  />
                                  {errors.firstSignature[index]
                                    ?.owner_first_signature && (
                                    <p className="error mt-2">
                                      {
                                        errors.firstSignature[index]
                                          .owner_first_signature
                                      }
                                    </p>
                                  )}
                                </div>
                                <div className="signin-element-form-wrapper margin-buttom">
                                  <Input2
                                    icon={faAddressCard}
                                    placeholder="کد ملی"
                                    name="national_code"
                                    onChange={(e) => {
                                      const newFirstSignature = [
                                        ...firstSignature,
                                      ];
                                      newFirstSignature[index].national_code =
                                        toEnglishNumber(e.target.value);
                                      setFirstSignature(newFirstSignature);

                                      const newErrors = [
                                        ...errors.firstSignature,
                                      ];
                                      if (newErrors[index])
                                        newErrors[index].national_code = "";
                                      setErrors((prevErrors) => ({
                                        ...prevErrors,
                                        firstSignature: newErrors,
                                      }));
                                    }}
                                    value={toFarsiNumber(input.national_code)}
                                  />
                                  {errors.firstSignature[index]
                                    ?.national_code && (
                                    <p className="error mt-2">
                                      {
                                        errors.firstSignature[index]
                                          .national_code
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                            <p
                              className="add-signature-title"
                              onClick={handlerAddinputssignatureTrue}
                            >
                              <>
                                <p className="d-flex align-items-center">
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    className="mx-2"
                                  />
                                  افزودن صاحب امضا جدید
                                </p>
                              </>
                            </p>
                          </>
                        ) : (
                          isPermition === false && (
                            <>
                              {addSignature.map((input, index) => (
                                <div
                                  className="signature-false-wrapper"
                                  key={index}
                                >
                                  <div className="signin-element-form-wrapper margin-buttom">
                                    <Input2
                                      icon={faUser}
                                      placeholder="نام ونام خانوادگی"
                                      name="full_name"
                                      value={input.full_name}
                                      onChange={(e) => {
                                        const newAddSignature = [
                                          ...addSignature,
                                        ];
                                        newAddSignature[index].full_name =
                                          e.target.value;
                                        setAddSignature(newAddSignature);
                                        const newErrors = [
                                          ...errors.addSignature,
                                        ];
                                        if (newErrors[index])
                                          newErrors[index].full_name = "";
                                        setErrors((prevErrors) => ({
                                          ...prevErrors,
                                          addSignature: newErrors,
                                        }));
                                      }}
                                    />
                                    {errors.addSignature[index]?.full_name && (
                                      <p className="error mt-2">
                                        {errors.addSignature[index].full_name}
                                      </p>
                                    )}
                                  </div>
                                  <div className="signin-element-form-wrapper margin-buttom">
                                    <Input2
                                      icon={faUser}
                                      placeholder="سمت در شرکت"
                                      name="position_incompany"
                                      value={input.position_incompany}
                                      onChange={(e) => {
                                        const newAddSignature = [
                                          ...addSignature,
                                        ];
                                        newAddSignature[
                                          index
                                        ].position_incompany = e.target.value;
                                        setAddSignature(newAddSignature);
                                        const newErrors = [
                                          ...errors.addSignature,
                                        ];
                                        if (newErrors[index])
                                          newErrors[index].position_incompany =
                                            "";
                                        setErrors((prevErrors) => ({
                                          ...prevErrors,
                                          addSignature: newErrors,
                                        }));
                                      }}
                                    />
                                    {errors.addSignature[index]
                                      ?.position_incompany && (
                                      <p className="error mt-2">
                                        {
                                          errors.addSignature[index]
                                            .position_incompany
                                        }
                                      </p>
                                    )}
                                  </div>
                                  <div className="signin-element-form-wrapper margin-buttom">
                                    <Input2
                                      icon={faAddressCard}
                                      placeholder="کد ملی"
                                      name="national_code"
                                      value={toFarsiNumber(input.national_code)}
                                      onChange={(e) => {
                                        const newAddSignature = [
                                          ...addSignature,
                                        ];
                                        newAddSignature[index].national_code =
                                          toEnglishNumber(e.target.value);
                                        setAddSignature(newAddSignature);
                                        const newErrors = [
                                          ...errors.addSignature,
                                        ];
                                        if (newErrors[index])
                                          newErrors[index].national_code = "";
                                        setErrors((prevErrors) => ({
                                          ...prevErrors,
                                          addSignature: newErrors,
                                        }));
                                      }}
                                    />
                                    {errors.addSignature[index]
                                      ?.national_code && (
                                      <p className="error mt-2">
                                        {
                                          errors.addSignature[index]
                                            .national_code
                                        }
                                      </p>
                                    )}
                                  </div>
                                  <div className="signin-element-form-wrapper margin-buttom">
                                    <Input2
                                      icon={faPhone}
                                      placeholder="شماره موبایل"
                                      name="phone_number"
                                      value={toFarsiNumber(input.phone_number)}
                                      onChange={(e) => {
                                        const newAddSignature = [
                                          ...addSignature,
                                        ];
                                        newAddSignature[index].phone_number =
                                          toEnglishNumber(e.target.value);
                                        setAddSignature(newAddSignature);
                                        const newErrors = [
                                          ...errors.addSignature,
                                        ];
                                        if (newErrors[index])
                                          newErrors[index].phone_number = "";
                                        setErrors((prevErrors) => ({
                                          ...prevErrors,
                                          addSignature: newErrors,
                                        }));
                                      }}
                                    />
                                    {errors.addSignature[index]
                                      ?.phone_number && (
                                      <p className="error mt-2">
                                        {
                                          errors.addSignature[index]
                                            .phone_number
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                              <p
                                className="add-signature-title"
                                onClick={handlerAddinputssignatureFalse}
                              >
                                <>
                                  <p className="d-flex align-items-center">
                                    <FontAwesomeIcon
                                      icon={faPlus}
                                      className="mx-2"
                                    />
                                    افزودن صاحب امضا جدید
                                  </p>
                                </>
                              </p>
                            </>
                          )
                        )}
                      </div>
                      <div className="form-content-bottom">
                        <div className="signin-basic-info-wrapper margin-buttom">
                          <div className="input-item-wrapper">
                            <Input
                              label={"شناسه ملی شرکت"}
                              icon={faAddressCard}
                              placeholder="شناسه ملی شرکت"
                              type="text"
                              name="company_national_id"
                              onChange={(e) => {
                                setDataFormCompany({
                                  ...dataFormCompany,
                                  company_national_id: toEnglishNumber(
                                    e.target.value
                                  ),
                                });
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  dataFormCompany: {
                                    ...prevErrors.dataFormCompany,
                                    company_national_id: "",
                                  },
                                }));
                              }}
                              value={toFarsiNumber(
                                dataFormCompany.company_national_id
                              )}
                            />
                            {errors.dataFormCompany.company_national_id && (
                              <p className="error mt-2">
                                {errors.dataFormCompany.company_national_id}
                              </p>
                            )}
                          </div>
                          <div className="input-item-wrapper">
                            <Input
                              label="شماره تماس شرکت"
                              name="phone_number"
                              icon={faPhone}
                              placeholder="شماره تماس شرکت"
                              type="text"
                              onChange={(e) => {
                                setDataFormCompany({
                                  ...dataFormCompany,
                                  phone_number: toEnglishNumber(e.target.value),
                                });
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  dataFormCompany: {
                                    ...prevErrors.dataFormCompany,
                                    phone_number: "",
                                  },
                                }));
                              }}
                              value={toFarsiNumber(
                                dataFormCompany.phone_number
                              )}
                            />
                            {errors.dataFormCompany.phone_number && (
                              <p className="error mt-2">
                                {errors.dataFormCompany.phone_number}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="signin-basic-info-wrapper margin-buttom">
                          <div className="input-item-wrapper">
                            <Input
                              label={"ادرس"}
                              name="address"
                              icon={faLocationDot}
                              placeholder="ادرس شرکت"
                              type="text"
                              onChange={(e) => {
                                setDataFormCompany({
                                  ...dataFormCompany,
                                  address: e.target.value,
                                });
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  dataFormCompany: {
                                    ...prevErrors.dataFormCompany,
                                    address: "",
                                  },
                                }));
                              }}
                              value={dataFormCompany.address}
                            />
                            {errors.dataFormCompany.address && (
                              <p className="error mt-2">
                                {errors.dataFormCompany.address}
                              </p>
                            )}
                          </div>
                          <div className="input-item-wrapper">
                            <Input
                              name="postal_code"
                              label="کدپستی"
                              icon={faHashtag}
                              placeholder="کدپستی شرکت"
                              type="text"
                              onChange={(e) => {
                                setDataFormCompany({
                                  ...dataFormCompany,
                                  postal_code: toEnglishNumber(e.target.value),
                                });
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  dataFormCompany: {
                                    ...prevErrors.dataFormCompany,
                                    postal_code: "",
                                  },
                                }));
                              }}
                              value={toFarsiNumber(dataFormCompany.postal_code)}
                            />
                            {errors.dataFormCompany.postal_code && (
                              <p className="error mt-2">
                                {errors.dataFormCompany.postal_code}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="signin-basic-info-wrapper margin-buttom mt-5">
                          <div className="input-item-wrapper2">
                            <InputUpload
                              label={"تصویر اساسنامه شرکت"}
                              name="company_statute_image"
                              onChange={(file) =>
                                handleFileChange("company_statute_image", file)
                              }
                            />
                            {errors.dataFormCompany.company_statute_image && (
                              <p className="error mt-2">
                                {errors.dataFormCompany.company_statute_image}
                              </p>
                            )}
                          </div>
                          <div className="input-item-wrapper2">
                            <InputUpload
                              label={"تصویر آخرین آگهی تغییرات"}
                              name="last_ad_changes_image"
                              onChange={(file) =>
                                handleFileChange("last_ad_changes_image", file)
                              }
                            />
                            {errors.dataFormCompany.last_ad_changes_image && (
                              <p className="error mt-2">
                                {errors.dataFormCompany.last_ad_changes_image}
                              </p>
                            )}
                          </div>
                          <div className="input-item-wrapper2">
                            <InputUpload
                              label={"تصویر لوگو شرکت"}
                              name="company_image"
                              onChange={(file) =>
                                handleFileChange("company_image", file)
                              }
                            />
                            {errors.dataFormCompany.company_image && (
                              <p className="error mt-2">
                                {errors.dataFormCompany.company_image}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="signin-btn-wrapper">
                    <Button1
                      type="submit"
                      isSubmitting={loading}
                      onClick={sendDataHandler}
                    />
                  </div>
                </form>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
