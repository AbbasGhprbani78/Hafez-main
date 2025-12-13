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
import { FullReactDropDown } from "../../../Components/Modules/Input3/Input3";

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

function AddAndEditEquipment({
  action = "add",
  infoItem,
  toggleModal,
  modal,
  tab,
  handleToggleUpdate,
}) {
  const [hallsInfo, setHallsInfo] = useState([]);
  const [equipmentInfo, setEquipmentInfo] = useState({
    equip_status: true,
    equip_name: "",
    equip_code: "",
    equip_hall: null,
    equip_description: "",
  });
  const [helperText, setHelperText] = useState({
    help_name: "",
    help_code: "",
    help_halls: "",
    help_description: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle change and validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "equip_code" && value === "") {
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

    if (name === "equip_name" && value === "") {
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

    setEquipmentInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitForm = async () => {
    if (
      equipmentInfo.equip_name === undefined ||
      equipmentInfo.equip_name === ""
    ) {
      setHelperText((prev) => ({
        ...prev,
        help_name: "این فیلد نمی‌تواند خالی باشد!",
      }));
      return;
    } else if (
      equipmentInfo.equip_code === undefined ||
      equipmentInfo.equip_code === ""
    ) {
      setHelperText((prev) => ({
        ...prev,
        help_code: "این فیلد نمی‌تواند خالی باشد!",
      }));
      return;
    } else if (
      equipmentInfo.equip_hall === null ||
      equipmentInfo.equip_hall === "" ||
      equipmentInfo.equip_hall === undefined
    ) {
      setHelperText((prev) => ({
        ...prev,
        help_halls: "لطفا یک سالن  برای ابزار مورد نظر را، انتخاب کنید!",
      }));
      return;
    }

    const requestData = {
      name: equipmentInfo.equip_name,
      code: equipmentInfo.equip_code,
      descriptions: equipmentInfo.equip_description,
      status: equipmentInfo.equip_status,
      salon: equipmentInfo.equip_hall,
    };
    setLoading(true);
    if (action === "edit") {
      try {
        const response = await apiClient.put(
          `/app/equipment/${infoItem.id}`,
          requestData
        );

        if (response.status === 200) {
          handleToggleUpdate();
          successMessage("تجهیزات با موفقیت ویرایش شد");
        }
      } catch (error) {
        toggleModal();
        errorMessage("خطا در عملیات ویرایش تجهیزات");
      } finally {
        setLoading(false);
      }
    } else if (action === "add") {
      try {
        const response = await apiClient.post(`/app/equipment/`, requestData);
        if (response.status === 201) {
          setLoading(false);
          handleToggleUpdate();
          successMessage("تجهیزات با موفقیت اضافه گردید");
        }
      } catch (error) {
        toggleModal();
        errorMessage("خطا در عملیات افزودن تجهیزات");
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (tab === 2) {
      if (modal === true) {
        fetchGetHalls();
        if (action === "edit") {
          setEquipmentInfo({
            equip_status: infoItem.status,
            equip_name: infoItem.name,
            equip_code: infoItem.code,
            equip_hall: infoItem.salon?.id,
            equip_description: infoItem.descriptions,
          });
        } else if (action === "add") {
          setEquipmentInfo({
            equip_status: true,
            equip_name: "",
            equip_code: "",
            equip_hall: null,
            equip_description: "",
          });
        }
      } else {
        setEquipmentInfo({
          equip_status: true,
          equip_name: "",
          equip_code: "",
          equip_hall: null,
          equip_description: "",
        });
        setHelperText({
          help_name: "",
          help_code: "",
          help_halls: "",
          help_description: "",
        });
        setHallsInfo([]);
      }
    }
  }, [action, infoItem, tab, modal]);

  const handleChangeHalls = (hallsCode) => {
    if (helperText !== "") {
      setHelperText((prev) => ({
        ...prev,
        help_halls: "",
      }));
    }
    setEquipmentInfo((prevstate) => ({ ...prevstate, equip_hall: hallsCode }));
  };

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
            ? "تعریف تجهیزات جدید"
            : action === "edit"
            ? `ویرایش تجهیزات ${infoItem ? infoItem.code : "Equipment Code"}`
            : "افزودن تجهیزات"}
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
            {"وضعیت تجهیزات"}
          </Typography>
          <ToggleSwitch
            value={equipmentInfo.equip_status}
            handleChange={handleChange}
            name="equip_status"
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
            id="equip_name_modal"
            name="equip_name"
            value={equipmentInfo.equip_name}
            handleChange={handleChange}
            helperText={helperText.help_name}
            lable="نام تجهیزات:"
            placeholder="نام تجهیزات را وارد نمایید"
            type="text"
            key={4}
          />
          <Input3
            id="equip_code_modal"
            name="equip_code"
            value={equipmentInfo.equip_code}
            handleChange={handleChange}
            helperText={helperText.help_code}
            lable="کد تجهیزات:"
            placeholder="کد تجهیزات را وارد نمایید"
            type="text"
            key={5}
          />
          <FullReactDropDown
            options={hallsInfo.map((hall) => ({
              value: hall.id,
              label: hall.name,
            }))}
            handleChange={handleChangeHalls}
            helperText={helperText.help_halls}
            lable="انتخاب سالن:"
            selected={action === "edit" ? equipmentInfo.equip_hall : null}
            key={6}
          />

          <Input3
            id="equip_description_modal"
            name="equip_description"
            value={equipmentInfo.equip_description}
            handleChange={handleChange}
            helperText={helperText.help_description}
            lable="توضیحات:"
            placeholder="توضیحات اضافی خود را وارد نمایید"
            type="text"
            key={7}
            styleInput={"textfield_modal"}
            isTextAarea={true}
            textAareaRows={5}
          />
        </Grid>
        <Button2
          icon={loading ? "" : action === "add" ? faCheck : faPenToSquare}
          style={"search_btn_modal"}
          onClick={handleSubmitForm}
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

export default AddAndEditEquipment;
