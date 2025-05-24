import { useState, useEffect } from "react";
import styles from "./ModalStyles.module.css";

//Components
import {
  errorMessage,
  successMessage,
  warningMessage,
} from "../../../Components/Modules/Toast/ToastCustom";
import ToggleSwitch from "../../../Components/Modules/ToggleSwitch/ToggleSwitch";
import Button2 from "../../../Components/Modules/Button2/Button2";
import Input3 from "../../../Components/Modules/Input3/Input3";
import MultipleSelectCheckmarks from "../../../Components/Modules/MultipleSelectCheckmarks/MultipleSelectCheckmarks";

//MUI Components
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

//Icons
import {
  faXmark,
  faCheck,
  faPenToSquare,
  faClock,
  faAddressCard,
  faPhone,
  faUser,
  faLock,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiClient from "../../../config/axiosConfig";

function AddAndEditUserModal({
  action = "add",
  infoItem,
  toggleModal,
  tab,
  modal,
  handleToggleUpdate,
}) {
  const [expertiseInfo, setExpertiseInfo] = useState([]);
  const [userInfo, setUserInfo] = useState({
    id: null,
    user_status: true,
    user_full_name: "",
    user_national_code: "",
    user_phone_number: "",
    user_work_hours: 8,
    user_username: "",
    user_password: "",
  });
  const [itemUserExpertise, setItemUserExpertise] = useState(undefined);
  const [helperText, setHelperText] = useState({
    help_full_name: "",
    help_national_code: "",
    help_phone_number: "",
    help_expertise: "",
    help_work_hours: "",
    help_username: "",
    help_password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle change and validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    //Validity test for full name
    if (name === "user_full_name" && value.length <= 2 && value.length > 0) {
      setHelperText((prev) => ({
        ...prev,
        help_full_name: "حداقل سه کاراکتر",
      }));
    }
    if (name === "user_full_name" && value === "") {
      setHelperText((prev) => ({
        ...prev,
        help_full_name: "این فیلد نمی‌تواند خالی باشد!",
      }));
    } else if (
      name === "user_full_name" &&
      (value.length >= 3 || value.length === 0) &&
      helperText.help_full_name !== ""
    ) {
      setHelperText((prev) => ({
        ...prev,
        help_full_name: "",
      }));
    }

    //Validity test for work hours
    if (name === "user_work_hours" && value <= 0) {
      setHelperText((prev) => ({
        ...prev,
        help_work_hours: "حداقل یک ساعت!",
      }));
      return;
    } else if (helperText.help_work_hours !== "") {
      setHelperText((prev) => ({
        ...prev,
        help_work_hours: "",
      }));
    }

    //Validity test for national code
    if (name === "user_national_code" && !/^\d*$/.test(value)) {
      setHelperText((prev) => ({
        ...prev,
        help_national_code: "فقط عدد وارد کنید! ",
      }));
      return;
    } else if (name === "user_national_code" && value.length > 10) {
      warningMessage("کدملی نمی‌تواند بیشتر از ده رقم باشد!");
      return;
    }
    if (name === "user_national_code" && value === "") {
      setHelperText((prev) => ({
        ...prev,
        help_national_code: "این فیلد نمی‌تواند خالی باشد!",
      }));
    } else if (helperText.help_national_code !== "") {
      setHelperText((prev) => ({
        ...prev,
        help_national_code: "",
      }));
    }

    //Validity test for phone number
    if (name === "user_phone_number" && !/^[0-9\b]*$/.test(value)) {
      setHelperText((prev) => ({
        ...prev,
        help_phone_number: "فقط عدد وارد کنید! ",
      }));
      return;
    } else if (name === "user_phone_number" && value.length > 11) {
      warningMessage("شماره تماس نمی‌تواند بیشتر از یازده رقم باشد!");
      return;
    } else if (name === "user_phone_number" && value === "") {
      setHelperText((prev) => ({
        ...prev,
        help_phone_number: "این فیلد نمی‌تواند خالی باشد!",
      }));
    } else if (helperText.help_phone_number !== "") {
      setHelperText((prev) => ({
        ...prev,
        help_phone_number: "",
      }));
    }

    //Validity test for username
    if (name === "user_username" && !/^[a-zA-Z0-9]*$/.test(value)) {
      setHelperText((prev) => ({
        ...prev,
        help_username: "ورودی غیر مجاز!",
      }));
      return;
    } else if (name === "user_username" && value.length < 5) {
      setHelperText((prev) => ({
        ...prev,
        help_username: "حداقل پنج کاراکتر",
      }));
    } else if (name === "user_username" && value === "") {
      setHelperText((prev) => ({
        ...prev,
        help_username: "این فیلد نمی‌تواند خالی باشد!",
      }));
    } else if (helperText.help_username !== "") {
      setHelperText((prev) => ({
        ...prev,
        help_username: "",
      }));
    }

    //Validity test for password
    if (name === "user_password" && !/^[A-Za-z\d!@#$%&*^]*$/.test(value)) {
      setHelperText((prev) => ({
        ...prev,
        help_password: "ورودی غیر مجاز!",
      }));
      return;
    } else if (name === "user_password" && value.length < 6) {
      setHelperText((prev) => ({
        ...prev,
        help_password: "حداقل شش کاراکتر",
      }));
    } else if (name === "user_password" && value === "") {
      setHelperText((prev) => ({
        ...prev,
        help_password: "این فیلد نمی‌تواند خالی باشد!",
      }));
    } else if (helperText.help_password !== "") {
      setHelperText((prev) => ({
        ...prev,
        help_password: "",
      }));
    }

    setUserInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitForm = async () => {
    if (userInfo.user_full_name === null || userInfo.user_full_name === "") {
      warningMessage("لطفا نام و نام خانوادگی کاربر را وارد کنید!");
      return;
    }
    if (helperText.help_full_name !== "") {
      warningMessage("لطفا نام و نام خانوادگی کاربر را به درستی وارد نمایید!");
      return;
    }

    if (
      userInfo.user_national_code === null ||
      userInfo.user_national_code === ""
    ) {
      warningMessage("لطفا کدملی کاربر را وارد کنید!");
      return;
    }
    if (
      helperText.help_national_code !== "" ||
      userInfo.user_national_code.length !== 10
    ) {
      warningMessage("لطفا کدملی کاربر را به درستی وارد نمایید!");
      return;
    }

    if (
      userInfo.user_phone_number === null ||
      userInfo.user_phone_number === ""
    ) {
      warningMessage("لطفا شماره تماس کاربر را وارد نمایید!");
      return;
    }
    if (
      helperText.help_phone_number !== "" ||
      userInfo.user_phone_number.length !== 11
    ) {
      warningMessage("لطفا شماره تماس کاربر را به درستی وارد نمایید!");
      return;
    }
    if (itemUserExpertise === null || itemUserExpertise?.length === 0) {
      warningMessage("نقش کاربر را انتخاب نمایید!");
      return;
    }

    if (userInfo.user_username === null || userInfo.user_username === "") {
      warningMessage("لطفا یک نام کاربری برای کاربر وارد کنید!");
      return;
    }
    if (helperText.help_username !== "") {
      warningMessage("لطفا نام کاربری را به درستی وارد نمایید!");
      return;
    }
    if (action !== "edit") {
      if (userInfo.user_password === null || userInfo.user_password === "") {
        warningMessage("لطفا یک رمز عبور برای کاربر وارد کنید!");
        return;
      }
      if (helperText.help_password !== "") {
        warningMessage("لطفا رمز عبور را به درستی وارد نمایید!");
        return;
      }
    }

    const requestData = {
      full_name: userInfo.user_full_name,
      national_code: userInfo.user_national_code,
      phone_number: userInfo.user_phone_number,
      status: userInfo.user_status,
      type: itemUserExpertise,
      username: userInfo.user_username,
      password: userInfo.user_password,
      work_time: userInfo.user_work_hours,
    };
    setLoading(true);
    if (action === "add") {
      try {
        const response = await apiClient.post(`/app/add-user/`, requestData);

        if (response.status === 201) {
          successMessage("کاربر جدید با موفقیت اضافه شد");
          handleToggleUpdate();
        }
      } catch (error) {
        toggleModal();
        errorMessage("خطا در عملیات افزودن کاربر");
      } finally {
        setLoading(false);
      }
    } else if (action === "edit") {
      try {
        const response = await apiClient.put(
          `/app/add-user/${userInfo.id}`,
          requestData
        );

        if (response.status === 200) {
          handleToggleUpdate();
          successMessage("کاربر موردنظر با موفقیت ویرایش شد");
        }
      } catch (error) {
        toggleModal();
        errorMessage("خطا در عملیات ویرایش کاربر");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (tab === 3) {
      if (modal === true) {
        if (action === "edit") {
          setUserInfo({
            id: infoItem.id,
            user_status: infoItem.status,
            user_full_name: infoItem.full_name,
            user_national_code: infoItem.national_code,
            user_phone_number: infoItem.phone_number,
            user_work_hours: infoItem.work_time,
            user_username: infoItem.username,
          });
          setItemUserExpertise(
            infoItem.type?.length > 0 ? infoItem.type.map((exp) => exp.id) : []
          );
        } else if (action === "add") {
          setUserInfo({
            id: null,
            user_status: true,
            user_full_name: "",
            user_national_code: "",
            user_phone_number: "",
            user_work_hours: 8,
            user_username: "",
            user_password: "",
          });
          setItemUserExpertise([]);
        }
      } else {
        setUserInfo({
          id: null,
          user_status: true,
          user_full_name: "",
          user_national_code: "",
          user_phone_number: "",
          user_work_hours: 8,
          user_username: "",
          user_password: "",
        });
        setHelperText({
          help_full_name: "",
          help_national_code: "",
          help_phone_number: "",
          help_expertise: "",
          help_work_hours: "",
          help_username: "",
          help_password: "",
        });
        setItemUserExpertise([]);
      }
    }
  }, [action, infoItem, tab, modal]);

  const fetchGetExpertice = async () => {
    try {
      const response = await apiClient.get(`/app/get-user-type/`);
      if (response.status === 200) {
        setExpertiseInfo(response.data.user_type);
      }
    } catch (error) {
      errorMessage("خطا در برقراری ارتباط با سرور");
      setExpertiseInfo([]);
    }
  };
  useEffect(() => {
    fetchGetExpertice();
  }, []);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: { xs: "1rem" },
      }}
      className={styles.modal_parent}
    >
      <Grid
        item
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography className={styles.title_modal} variant="body1">
          {action === "add"
            ? "تعریف کاربر جدید"
            : action === "edit"
            ? `ویرایش اطلاعات ${
                infoItem ? `${infoItem.full_name}` : "نام و نام خانوادگی کاربر"
              } `
            : "افزودن کاربر جدید"}
        </Typography>
        <Box className={styles.delete_icon_modal} onClick={() => toggleModal()}>
          <FontAwesomeIcon icon={faXmark} />
        </Box>
      </Grid>
      <Divider
        orientation="horizontal"
        color="#9f9f9f"
        variant="fullWidth"
        flexItem
      />
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: { xs: "0.7rem", sm: "0.9rem", md: "1.2 rem" },
          width: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <Grid
          item
          size={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" className={styles.input_label}>
            {"وضعیت کاربر"}
          </Typography>
          <ToggleSwitch
            value={userInfo.user_status}
            handleChange={handleChange}
            name="user_status"
          />
        </Grid>
        <Grid
          item
          size={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: { xs: "0.5rem", sm: "0.7rem", md: "1 rem" },
          }}
        >
          <Input3
            id="user_full_name_modal"
            name="user_full_name"
            value={userInfo.user_full_name}
            handleChange={handleChange}
            helperText={helperText.help_full_name}
            lable="نام و نام‌خانوادگی کاربر:"
            placeholder="نام و نام‌خانوادگی کاربر را وارد نمایید"
            type="text"
            icon={faUser}
            key={31}
          />
          <Grid
            container
            item
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Grid
              item
              size={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: { xs: "0.5rem", md: "1rem" },
              }}
            >
              <MultipleSelectCheckmarks
                options={expertiseInfo?.map((exp) => ({
                  value: exp.id,
                  label: exp.type,
                }))}
                selectedValues={itemUserExpertise}
                onChange={setItemUserExpertise}
                lable="انتخاب نقش کاربر:"
                helperText={helperText.help_expertise}
              />
            </Grid>
            <Grid
              item
              size={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: { xs: "0.5rem", md: "1rem" },
              }}
            >
              <Input3
                id="user_work_hours_modal"
                name="user_work_hours"
                value={userInfo.user_work_hours}
                handleChange={handleChange}
                helperText={helperText.help_work_hours}
                lable="ساعت کاری:"
                placeholder="ساعت در روز"
                type="number"
                icon={faClock}
                key={36}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Grid
              item
              size={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: { xs: "0.5rem", md: "1rem" },
              }}
            >
              <Input3
                id="user_national_code_modal"
                name="user_national_code"
                value={userInfo.user_national_code}
                handleChange={handleChange}
                helperText={helperText.help_national_code}
                lable="کدملی کاربر:"
                placeholder="عدد ده رقمی"
                type="text"
                icon={faAddressCard}
                key={32}
              />
            </Grid>
            <Grid
              item
              size={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: { xs: "0.5rem", md: "1rem" },
              }}
            >
              <Input3
                id="user_phone_number_modal"
                name="user_phone_number"
                value={userInfo.user_phone_number}
                handleChange={handleChange}
                helperText={helperText.help_phone_number}
                lable="شماره تماس کاربر:"
                placeholder="**** *** **۰۹"
                type="text"
                icon={faPhone}
                key={33}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Grid
              item
              size={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: { xs: "0.5rem", md: "1rem" },
              }}
            >
              <Input3
                id="user_username_modal"
                name="user_username"
                value={userInfo.user_username}
                handleChange={handleChange}
                helperText={helperText.help_username}
                lable="نام کاربری:"
                placeholder="حداقل ۵ کاراکتر"
                type="text"
                icon={faCircleUser}
                key={34}
              />
            </Grid>
            <Grid
              item
              size={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: { xs: "0.5rem", md: "1rem" },
              }}
            >
              <Input3
                id="user_password_modal"
                name="user_password"
                value={userInfo.user_password}
                handleChange={handleChange}
                helperText={helperText.help_password}
                lable="رمز عبور:"
                placeholder={
                  action === "edit" ? "رمز جدید وارد نمایید" : "حداقل ۶ کاراکتر"
                }
                type="text"
                icon={faLock}
                key={35}
              />
            </Grid>
          </Grid>
        </Grid>
        <Button2
          disable={loading}
          icon={loading ? "" : action === "add" ? faCheck : faPenToSquare}
          style={"search_btn_modal"}
          onClick={() => handleSubmitForm()}
        >
          {loading ? (
            <CircularProgress size={"25.2px"} color="success" />
          ) : action === "add" ? (
            "تایید اطلاعات"
          ) : (
            "ویرایش اطلاعات"
          )}
        </Button2>
      </Box>
    </Grid>
  );
}

export default AddAndEditUserModal;
