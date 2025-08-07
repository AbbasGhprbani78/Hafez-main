import { useState } from "react";
import "./Login.css";
import { Formik } from "formik";
import Button1 from "../../Components/Modules/Button1/Button1";
import Input from "../../Components/Modules/Input/Input";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import TypeActivity from "./TypeActivity/TypeActivity";
import { Link, useNavigate } from "react-router-dom";
import { toFarsiNumber, toEnglishNumber } from "../../utils/helper";
import Grid from "@mui/material/Grid2";

export default function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [isShowActivityForm, setIsShowActivityForm] = useState(
    localStorage.getItem("level")
  );

  console.log(isShowActivityForm);
  return (
    <>
      {isShowActivityForm === "one" || !isShowActivityForm ? (
        <TypeActivity />
      ) : (
        <div className="loginpage">
          <Grid container className="back-wrapper">
            <Grid
              item
              size={{ xs: 12, md: 7, xl: 8 }}
              className="empty-space-login"
            />
            <Grid
              item
              size={{ xs: 12, md: 5, xl: 4 }}
              className="background-signUp"
            />
          </Grid>
          <div className="form-container">
            <div className="form-hold">
              <p className="Signin-title p-signin">ورود</p>
              <Formik
                validate={(values) => {
                  const errors = {};
                  const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  const phoneRegex =
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

                  if (!values.login_field) {
                    errors.login_field =
                      "وارد کردن ایمیل یا شماره تلفن اجباری میباشد";
                  } else if (
                    !emailRegex.test(values.login_field) &&
                    !phoneRegex.test(values.login_field)
                  ) {
                    errors.login_field = "ایمیل یا شماره تلفن معتبر نیست";
                  }

                  if (!values.password) {
                    errors.password = "وارد کردن رمز عبور اجباری میباشد";
                  }
                  return errors;
                }}
                initialValues={{
                  login_field: "",
                  password: "",
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const response = await axios.post(
                      `${apiUrl}/user/login/`,
                      values
                    );
                    if (response.status === 200) {
                      setSubmitting(false);
                      sessionStorage.setItem("access", response.data.access);
                      sessionStorage.setItem("refresh", response.data.refresh);
                      localStorage.setItem("level", response?.data?.level);
                      if (response?.data?.level !== "one") {
                        navigate("/");
                      } else {
                        setIsShowActivityForm("one");
                      }
                    }
                  } catch (error) {
                    toast.error(error.response.data.detail, {
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
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <form
                    className="form-wrapper p-signin"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-content-login">
                      <p className="signin-text">
                        اطلاعات حساب کاربری خود را وارد کنید
                      </p>
                      <div>
                        <Input
                          name="login_field"
                          label="ایمیل / شماره تماس"
                          icon={faUser}
                          placeholder="ایمیل / شماره تماس"
                          type="text"
                          value={toFarsiNumber(values.login_field)}
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: "login_field",
                                value: toEnglishNumber(e.target.value),
                              },
                            })
                          }
                        />
                        {errors.login_field && touched.login_field && (
                          <p className="error mt-2">{errors.login_field}</p>
                        )}
                      </div>
                      <div style={{ marginTop: "1rem" }}>
                        <Input
                          name="password"
                          label="رمز عبور"
                          icon={faKey}
                          placeholder="رمز عبور"
                          type="text"
                          value={toFarsiNumber(values.password)}
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: "password",
                                value: toEnglishNumber(e.target.value),
                              },
                            })
                          }
                        />
                        {errors.password && touched.password && (
                          <p className="error mt-2">{errors.password}</p>
                        )}
                      </div>
                    </div>
                    <div className="signin-btn-wrapper">
                      <Button1 type="submit" isSubmitting={isSubmitting} />
                    </div>
                    <p className="text-tosignup">
                      حساب کاربری ندارید؟{" "}
                      <Link to={"/signup"} className="link-to-signup">
                        ثبت نام{" "}
                      </Link>
                      کنید
                    </p>
                  </form>
                )}
              </Formik>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
