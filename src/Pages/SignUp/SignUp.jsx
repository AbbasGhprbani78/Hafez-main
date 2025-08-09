import "./SignUp.css";
import {
  faPhone,
  faUser,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Modules/Input/Input";
import Button1 from "../../Components/Modules/Button1/Button1";
import { Formik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { toEnglishNumber, toFarsiNumber } from "../../utils/helper";
import Grid from "@mui/material/Grid2";
export default function SignUp() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  return (
    <>
      <div className="signup-page">
        {/* backgroundpage */}
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

        {/* form */}
        <div className="form-container">
          <div className="form-hold">
            <p className="Signin-title p-signin">ثبت نام</p>
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
                  errors.last_name = "نام خانوادگی حداقل باید 4 کاراکتر باشد";
                }

                if (values.email === "") {
                  errors.email = "وارد کردن ایمیل اجباری میباشد";
                } else if (
                  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    values.email
                  )
                ) {
                  errors.email = "ایمیل وارد شده معتبر نیست";
                }

                if (values.phone_number === "") {
                  errors.phone_number = "وارد کردن شماره اجباری میباشد";
                } else if (
                  !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
                    values.phone_number
                  )
                ) {
                  errors.phone_number = "شماره وارد شده معتبر نیست";
                }
                if (values.password === "") {
                  errors.password = "وارد کردن پسورد اجباری میباشد";
                }
                return errors;
              }}
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                password: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const response = await axios.post(
                    `${apiUrl}/user/signup/`,
                    values
                  );
                  if (response.status === 201) {
                    setSubmitting(false);
                    navigate("/login");
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
                errors,
                touched,
                isSubmitting,
              }) => (
                <form className="form-wrapper p-signin" onSubmit={handleSubmit}>
                  <div className="form-content">
                    <p className="signin-text">
                      اطلاعات حساب کاربری خود را وارد کنید
                    </p>
                    <div className="form-signin">
                      <div className="signin-basic-info-wrapper margin-buttom">
                        <div className="input-item-wrapper">
                          <Input
                            name="first_name"
                            label="نام"
                            icon={faUser}
                            placeholder="نام"
                            type="text"
                            value={values.first_name}
                            onChange={handleChange}
                          />
                          {errors.first_name && touched.first_name && (
                            <p className="error mt-2">{errors.first_name}</p>
                          )}
                        </div>
                        <div className="input-item-wrapper">
                          <Input
                            name="last_name"
                            label="نام خانوادگی"
                            icon={faUser}
                            placeholder="نام خانوادگی"
                            type="text"
                            value={values.last_name}
                            onChange={handleChange}
                          />
                          {errors.last_name && touched.last_name && (
                            <p className="error mt-2">{errors.last_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="signin-element-form-wrapper margin-buttom">
                        <Input
                          name="email"
                          label="ایمیل"
                          icon={faEnvelope}
                          placeholder="ایمیل"
                          type="text"
                          value={toFarsiNumber(values.email)}
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: "email",
                                value: toEnglishNumber(e.target.value),
                              },
                            })
                          }
                        />
                        {errors.email && touched.email && (
                          <p className="error mt-2">{errors.email}</p>
                        )}
                      </div>
                      <div className="signin-phone-wrapper margin-buttom">
                        <Input
                          name="phone_number"
                          label="شماره تماس"
                          icon={faPhone}
                          placeholder="شماره تماس"
                          type="text"
                          value={toFarsiNumber(values.phone_number)}
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: "phone_number",
                                value: toEnglishNumber(e.target.value),
                              },
                            })
                          }
                        />
                        {errors.phone_number && touched.phone_number && (
                          <p className="error mt-2">{errors.phone_number}</p>
                        )}
                      </div>
                      <div className="signin-phone-wrapper margin-buttom">
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
                  </div>

                  <div className="signin-btn-wrapper">
                    <p className="text-tosignup">
                      قبلا ثبت نام کردید ؟{" "}
                      <Link to={"/login"} className="link-to-signup">
                        وارد{" "}
                      </Link>
                      شوید
                    </p>
                    <Button1 type="submit" isSubmitting={isSubmitting} />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
