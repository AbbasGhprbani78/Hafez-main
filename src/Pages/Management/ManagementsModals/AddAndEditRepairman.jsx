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

import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiClient from "../../../config/axiosConfig";

function AddAndEditRepairman({
  action = "add",
  infoItem,
  toggleModal,
  tab,
  modal,
  handleToggleUpdate,
}) {
  const [hallsInfo, setHallsInfo] = useState([]);
  const [expertiseInfo, setExpertiseInfo] = useState([]);
  const [repairmanInfo, setRepairmanInfo] = useState({
    id: null,
    repair_status: true,
    repair_name: "",
    repair_national_code: "",
    repair_phone_number: "",
    repair_work_hours: 8,
    repair_username: "",
    repair_password: "",
    help_participation_percentage: 0,
  });
  const [itemRepairHalls, setItemRepairHalls] = useState(undefined);
  const [itemRepairExpertise, setItemRepairExpertise] = useState(undefined);
  const [helperText, setHelperText] = useState({
    help_name: "",
    help_national_code: "",
    help_phone_number: "",
    help_expertise: "",
    help_work_hours: "",
    help_halls: "",
    help_username: "",
    help_participation_percentage: "",
    help_password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle change and validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    //Validity test for name
    if (name === "repair_name" && value.length <= 2 && value.length > 0) {
      setHelperText((prev) => ({
        ...prev,
        help_name: "حداقل سه کاراکتر",
      }));
    }
    if (name === "repair_name" && value === "") {
      setHelperText((prev) => ({
        ...prev,
        help_name: "این فیلد نمی‌تواند خالی باشد!",
      }));
    } else if (
      name === "repair_name" &&
      (value.length >= 3 || value.length === 0) &&
      helperText.help_name !== ""
    ) {
      setHelperText((prev) => ({
        ...prev,
        help_name: "",
      }));
    }

    //Validity test for national code
    if (name === "repair_national_code" && !/^\d*$/.test(value)) {
      setHelperText((prev) => ({
        ...prev,
        help_national_code: "فقط عدد وارد کنید! ",
      }));
      return;
    } else if (name === "repair_national_code" && value.length > 10) {
      warningMessage("کدملی نمی‌تواند بیشتر از ده رقم باشد!");
      return;
    }
    if (name === "repair_national_code" && value === "") {
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
    if (name === "repair_phone_number" && !/^[0-9\b]*$/.test(value)) {
      setHelperText((prev) => ({
        ...prev,
        help_phone_number: "فقط عدد وارد کنید! ",
      }));
      return;
    } else if (name === "repair_phone_number" && value.length > 11) {
      warningMessage("شماره تماس نمی‌تواند بیشتر از یازده رقم باشد!");
      return;
    } else if (name === "repair_phone_number" && value === "") {
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

    if (name === "repair_work_hours" && value <= 0) {
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

    //Validity test for username
    if (name === "repair_username" && !/^[a-zA-Z0-9]*$/.test(value)) {
      setHelperText((prev) => ({
        ...prev,
        help_username: "ورودی غیر مجاز!",
      }));
      return;
    } else if (name === "repair_username" && value.length < 5) {
      setHelperText((prev) => ({
        ...prev,
        help_username: "حداقل پنج کاراکتر",
      }));
    } else if (name === "repair_username" && value === "") {
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
    if (name === "repair_password" && !/^[A-Za-z\d!@#$%&*^]*$/.test(value)) {
      setHelperText((prev) => ({
        ...prev,
        help_password: "ورودی غیر مجاز!",
      }));
      return;
    } else if (name === "repair_password" && value.length < 6) {
      setHelperText((prev) => ({
        ...prev,
        help_password: "حداقل شش کاراکتر",
      }));
    } else if (name === "repair_password" && value === "") {
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

    setRepairmanInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "help_help_participation_percentage" && value === "") {
      setHelperText((prev) => ({
        ...prev,
        help_participation_percentage: "این فیلد نمی‌تواند خالی باشد!",
      }));
    }
  };

  const handleSubmitForm = async () => {
    if (
      repairmanInfo.repair_name === null ||
      repairmanInfo.repair_name === ""
    ) {
      warningMessage("لطفا نام تعمیرکار را وارد کنید!");
      return;
    }
    if (helperText.help_name !== "") {
      warningMessage("لطفا نام تعمیرکار را به درستی وارد نمایید!");
      return;
    }

    if (
      repairmanInfo.repair_national_code === null ||
      repairmanInfo.repair_national_code === ""
    ) {
      warningMessage("لطفا کدملی تعمیرکار را وارد کنید!");
      return;
    }
    if (
      helperText.help_national_code !== "" ||
      repairmanInfo.repair_national_code.length !== 10
    ) {
      warningMessage("لطفا کدملی تعمیرکار را به درستی وارد نمایید!");
      return;
    }

    if (
      repairmanInfo.repair_phone_number === null ||
      repairmanInfo.repair_phone_number === ""
    ) {
      warningMessage("لطفا شماره تماس تعمیر کار را وارد نمایید!");
      return;
    }
    if (
      helperText.help_phone_number !== "" ||
      repairmanInfo.repair_phone_number.length !== 11
    ) {
      warningMessage("لطفا شماره تماس تعمیر کار را به درستی وارد نمایید!");
      return;
    }
    if (itemRepairExpertise === null || itemRepairExpertise.length === 0) {
      warningMessage("تخصص تعمیرکار را انتخاب نمایید!");
      return;
    }
    if (itemRepairHalls === null || itemRepairHalls.length === 0) {
      warningMessage(" سالن تعمیرکار را انتخاب نمایید!");
      return;
    }

    if (
      repairmanInfo.repair_username === null ||
      repairmanInfo.repair_username === ""
    ) {
      warningMessage("لطفا یک نام کاربری برای تعمیرکار وارد کنید!");
      return;
    }
    if (helperText.help_username !== "") {
      warningMessage("لطفا نام کاربری را به درستی وارد نمایید!");
      return;
    }
    if (action !== "edit") {
      if (
        repairmanInfo.repair_password === null ||
        repairmanInfo.repair_password === ""
      ) {
        warningMessage("لطفا یک رمز عبور برای تعمیرکار وارد کنید!");
        return;
      }
      if (helperText.help_password !== "") {
        warningMessage("لطفا رمز عبور را به درستی وارد نمایید!");
        return;
      }

      if (
        repairmanInfo.help_participation_percentage === null ||
        repairmanInfo.help_participation_percentage === ""
      ) {
        warningMessage("لطفا درصد مشارکت را وارد نمایید!");
        return;
      }
      if (
        repairmanInfo.help_participation_percentage < 0 ||
        repairmanInfo.help_participation_percentage > 100
      ) {
        warningMessage("درصد مشارکت باید بین 0 تا 100 باشد!");
        return;
      }
    }

    const requestData = {
      full_name: repairmanInfo.repair_name,
      national_code: repairmanInfo.repair_national_code,
      phone_number: repairmanInfo.repair_phone_number,
      salon: itemRepairHalls,
      status: repairmanInfo.repair_status,
      specialty: itemRepairExpertise,
      username: repairmanInfo.repair_username,
      password: repairmanInfo.repair_password,
      work_time: repairmanInfo.repair_work_hours,
      type: [2],
    };
    setLoading(true);
    if (action === "add") {
      try {
        const response = await apiClient.post(
          `/app/add-repairman/`,
          requestData
        );

        if (response.status === 201) {
          successMessage("تعمیرکار جدید با موفقیت اضافه شد");
          handleToggleUpdate();
        }
      } catch (error) {
        toggleModal();
        errorMessage("خطا در عملیات افزودن تعمیرکار");
      } finally {
        setLoading(false);
      }
    } else if (action === "edit") {
      try {
        const response = await apiClient.put(
          `/app/add-repairman/${repairmanInfo.id}`,
          requestData
        );

        if (response.status === 200) {
          handleToggleUpdate();
          successMessage("تعمیرکار با موفقیت ویرایش شد");
        }
      } catch (error) {
        toggleModal();
        errorMessage("خطا در عملیات ویرایش تعمیرکار");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (tab === 1) {
      if (modal === true) {
        if (action === "edit" && infoItem) {
          setRepairmanInfo({
            id: infoItem.id,
            repair_status: infoItem.status,
            repair_name: infoItem.full_name || "",
            repair_national_code: infoItem.national_code || "",
            repair_phone_number: infoItem.phone_number || "",
            repair_work_hours: infoItem.work_time
              ? Number(infoItem.work_time)
              : 8,
            repair_username: infoItem.username || "",
          });
          // salon is already an array of IDs: [36, 41, 42]
          setItemRepairHalls(
            Array.isArray(infoItem.salon) && infoItem.salon.length > 0
              ? infoItem.salon
              : []
          );
          // type is already an array of IDs: [1, 2, 3]
          setItemRepairExpertise(
            Array.isArray(infoItem.type) && infoItem.type.length > 0
              ? infoItem.type
              : []
          );
        } else if (action === "add") {
          setRepairmanInfo({
            repair_status: true,
            repair_name: "",
            repair_national_code: "",
            repair_phone_number: "",
            repair_work_hours: 8,
            repair_username: "",
            repair_password: "",
          });
          setItemRepairHalls([]);
          setItemRepairExpertise([]);
        }
      } else {
        setRepairmanInfo({
          id: null,
          repair_status: true,
          repair_name: "",
          repair_national_code: "",
          repair_phone_number: "",
          repair_work_hours: 8,
          repair_username: "",
          repair_password: "",
        });
        setHelperText({
          help_name: "",
          help_national_code: "",
          help_phone_number: "",
          help_expertise: "",
          help_work_hours: "",
          help_halls: "",
          help_username: "",
          help_password: "",
        });
        setItemRepairHalls([]);
        setItemRepairExpertise([]);
      }
    }
  }, [action, infoItem, tab, modal]);

  const fetchGetHalls = async () => {
    try {
      const response = await apiClient.get(`/app/get-user-type/`);
      if (response.status === 200) {
        setHallsInfo(response.data.salons);
      }
    } catch (error) {
      errorMessage("خطا در برقراری ارتباط با سرور");
      setHallsInfo([]);
    }
  };

  const fetchAllExpertise = async () => {
    try {
      const response = await apiClient.get(`app/api/repairman-specialties/`);
      if (response.status === 200) {
        setExpertiseInfo(response.data.specialties);
      }
    } catch (error) {
      errorMessage("خطا در برقراری ارتباط با سرور");
      setHallsInfo([]);
      setExpertiseInfo([]);
    }
  };
  useEffect(() => {
    fetchAllExpertise();
    fetchGetHalls();
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
            ? "تعریف تعمیرکار جدید"
            : action === "edit"
            ? `ویرایش اطلاعات ${
                infoItem ? `${infoItem.full_name}` : "نام تعمیرکار"
              } `
            : "افزودن تعمیرکار جدید"}
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
            {"وضعیت تعمیرکار"}
          </Typography>
          <ToggleSwitch
            value={repairmanInfo.repair_status}
            handleChange={handleChange}
            name="repair_status"
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
            id="repair_name_modal"
            name="repair_name"
            value={repairmanInfo.repair_name}
            handleChange={handleChange}
            helperText={helperText.help_name}
            lable="نام تعمیرکار:"
            placeholder="نام تعمیرکار را وارد نمایید"
            type="text"
            icon={faUser}
            key={10}
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
              size={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: { xs: "0.5rem", md: "1rem" },
              }}
            >
              <Input3
                id="repair_national_code_modal"
                name="repair_national_code"
                value={repairmanInfo.repair_national_code}
                handleChange={handleChange}
                helperText={helperText.help_national_code}
                lable="کدملی تعمیرکار:"
                placeholder="عدد ده رقمی"
                type="text"
                icon={faAddressCard}
                key={11}
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
                id="repair_phone_number_modal"
                name="repair_phone_number"
                value={repairmanInfo.repair_phone_number}
                handleChange={handleChange}
                helperText={helperText.help_phone_number}
                lable="شماره تماس:"
                placeholder="**** *** **۰۹"
                type="text"
                icon={faPhone}
                key={12}
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
                  label: exp.name,
                }))}
                selectedValues={itemRepairExpertise}
                onChange={setItemRepairExpertise}
                lable="تخصص تعمیرکار:"
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
                id="repair_work_hours_modal"
                name="repair_work_hours"
                value={repairmanInfo.repair_work_hours}
                handleChange={handleChange}
                helperText={helperText.help_work_hours}
                lable="ساعت کاری:"
                placeholder="ساعت در روز"
                type="number"
                icon={faClock}
                key={14}
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
              size={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Input3
                id="help_participation_percentage"
                name="help_participation_percentage"
                value={repairmanInfo.help_participation_percentage}
                handleChange={handleChange}
                helperText={helperText.help_participation_percentage}
                lable="درصد مشارکت"
                placeholder="درصد مشارکت"
                type="number"
                icon={faPercent}
                key={15}
              />
            </Grid>
          </Grid>

          <MultipleSelectCheckmarks
            options={hallsInfo?.map((hall) => ({
              value: hall.id,
              label: hall.name,
            }))}
            selectedValues={itemRepairHalls}
            onChange={setItemRepairHalls}
            lable="انتخاب سالن:"
            helperText={helperText.help_halls}
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
              size={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: { xs: "0.5rem", md: "1rem" },
              }}
            >
              <Input3
                id="repair_username_modal"
                name="repair_username"
                value={repairmanInfo.repair_username}
                handleChange={handleChange}
                helperText={helperText.help_username}
                lable="نام کاربری:"
                placeholder="حداقل ۵ کاراکتر"
                type="text"
                icon={faCircleUser}
                key={16}
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
                id="repair_password_modal"
                name="repair_password"
                value={repairmanInfo.repair_password}
                handleChange={handleChange}
                helperText={helperText.help_password}
                lable="رمز عبور:"
                placeholder={
                  action === "edit" ? "رمز جدید وارد نمایید" : "حداقل ۶ کاراکتر"
                }
                type="text"
                icon={faLock}
                key={16}
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

export default AddAndEditRepairman;
