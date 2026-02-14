import { useState, useEffect } from "react";
import styles from "./ModalStyles.module.css";

//Components
import {
  errorMessage,
  successMessage,
} from "../../../Components/Modules/Toast/ToastCustom";
import ToggleSwitch from "../../../Components/Modules/ToggleSwitch/ToggleSwitch";
import Button2 from "../../../Components/Modules/Button2/Button2";
import Input3 from "../../../Components/Modules/Input3/Input3";

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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiClient from "../../../config/axiosConfig";

function AddAndEditHalls({
  action = "add",
  infoItem,
  toggleModal,
  handleToggleUpdate,
  tab,
  modal,
}) {
  const [hallsInfo, setHallsInfo] = useState({
    hall_id: 0,
    hall_status: true,
    hall_name: "",
    hall_code: "",
    hall_description: "",
  });
  const [helperText, setHelperText] = useState({
    help_name: "",
    help_code: "",
    help_description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "hall_code" && value === "") {
      setHelperText((prev) => ({
        ...prev,
        help_code: "این فیلد نمی‌تواند خالی باشد!",
      }));
    } else if (helperText.help_code !== "") {
      setHelperText((prev) => ({
        ...prev,
        help_code: "",
      }));
    }

    if (name === "hall_name" && value === "") {
      setHelperText((prev) => ({
        ...prev,
        help_name: "این فیلد نمی‌تواند خالی باشد!",
      }));
    } else if (helperText.help_name !== "") {
      setHelperText((prev) => ({
        ...prev,
        help_name: "",
      }));
    }

    setHallsInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitAddAndEditHalls = async () => {
    if (hallsInfo.hall_name === undefined || hallsInfo.hall_name === "") {
      setHelperText((prev) => ({
        ...prev,
        help_name: "این فیلد نمی‌تواند خالی باشد!",
      }));
      return;
    } else if (
      hallsInfo.hall_code === undefined ||
      hallsInfo.hall_code === ""
    ) {
      setHelperText((prev) => ({
        ...prev,
        help_code: "این فیلد نمی‌تواند خالی باشد!",
      }));
      return;
    }

    const requestData = {
      name: hallsInfo.hall_name,
      code: hallsInfo.hall_code,
      descriptions: hallsInfo.hall_description,
      status: hallsInfo.hall_status,
    };
    setLoading(true);
    if (action === "add") {
      try {
        const response = await apiClient.post(
          `/app/get-all-salon/`,
          requestData,
        );

        if (response.status === 201) {
          successMessage("سالن جدید با موفقیت اضافه شد");
          handleToggleUpdate();
        }
      } catch (error) {
        toggleModal();
        errorMessage("خطا در عملیات افزودن سالن");
      } finally {
        setLoading(false);
      }
    } else if (action === "edit") {
      try {
        const response = await apiClient.put(
          `/app/salon-update/${hallsInfo.hall_id}`,
          requestData,
        );

        if (response.status === 200) {
          handleToggleUpdate();
          successMessage("سالن با موفقیت ویرایش شد");
        }
      } catch (error) {
        toggleModal();
        errorMessage("خطا در عملیات ویرایش سالن");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (modal === true) {
      if (action === "edit") {
        setHallsInfo({
          hall_id: infoItem.id,
          hall_status: infoItem.status,
          hall_name: infoItem.name,
          hall_code: infoItem.code,
          hall_description: infoItem.descriptions,
        });
      } else if (action === "add") {
        setHallsInfo({
          hall_id: 0,
          hall_status: true,
          hall_name: "",
          hall_code: "",
          hall_description: "",
        });
      }
    } else {
      setHallsInfo({
        hall_id: 0,
        hall_status: true,
        hall_name: "",
        hall_code: "",
        hall_description: "",
      });
      setHelperText({
        help_name: "",
        help_code: "",
        help_description: "",
      });
    }
  }, [action, infoItem, tab, modal]);

  console.log(infoItem);
  console.log(action);
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
            ? "تعریف سالن جدید"
            : action === "edit"
              ? `ویرایش سالن ${infoItem ? infoItem.code : "123"}`
              : "افزودن آیتم"}
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
            {"وضعیت سالن"}
          </Typography>
          <ToggleSwitch
            value={hallsInfo.hall_status}
            handleChange={handleChange}
            name="hall_status"
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
            id="hall_name_modal"
            name="hall_name"
            value={hallsInfo.hall_name}
            handleChange={handleChange}
            helperText={helperText.help_name}
            lable="نام سالن:"
            placeholder="نام سالن را وارد نمایید"
            type="text"
            key={1}
          />
          <Input3
            id="hall_code_modal"
            name="hall_code"
            value={hallsInfo.hall_code}
            handleChange={handleChange}
            helperText={helperText.help_code}
            lable="کد سالن:"
            placeholder="کد سالن را وارد نمایید"
            type="text"
            key={2}
          />
          <Input3
            id="hall_description_modal"
            name="hall_description"
            value={hallsInfo.hall_description}
            handleChange={handleChange}
            helperText={helperText.help_description}
            lable="توضیحات:"
            placeholder="توضیحات اضافی خود را وارد نمایید"
            type="text"
            key={3}
            styleInput={"textfield_modal"}
            isTextAarea={true}
            textAareaRows={5}
          />
        </Grid>
        <Button2
          icon={loading ? "" : action === "add" ? faCheck : faPenToSquare}
          style={"search_btn_modal"}
          onClick={() => handleSubmitAddAndEditHalls()}
          disable={loading}
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

export default AddAndEditHalls;
