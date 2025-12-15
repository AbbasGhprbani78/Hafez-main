import { useEffect, useState, useCallback } from "react";
import TitleWithSearch from "../../Components/Modules/TitleWithSearch/TitleWithSearch";
import {
  faKey,
  faPlus,
  faShield,
  faXmark,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Users.module.css";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import { Box, TableCell, TableRow } from "@mui/material";
import ToggleSwitch from "../../Components/Modules/ToggleSwitch/ToggleSwitch";
import Modal from "../../Components/Modules/Modal/Modal";
import Input from "../../Components/Modules/Input/Input";
import Grid from "@mui/material/Grid2";
import Button2 from "../../Components/Modules/Button2/Button2";
import apiClient from "../../config/axiosConfig";
import InputCheckBox from "../../Components/Modules/InputChekBox/InputCheckBox";
import { toFarsiNumber } from "../../utils/helper";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import {
  errorMessage,
  successMessage,
  ToastContainerCustom,
} from "../../Components/Modules/Toast/ToastCustom";
import { ChnageDate } from "../../Components/Modules/ChnageDate/ChnageDate";
import MultipleSelectCheckmarks from "../../Components/Modules/MultipleSelectCheckmarks/MultipleSelectCheckmarks";

export default function Users() {
  const columns = [
    "کد",
    "نام کاربری",
    "کد ملی کاربر",
    "نام و نام خانوادگی",
    "آخرین ورود به سامانه",
    "نقش",
    "عملیات",
    "وضعیت",
  ];

  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});
  const [type_idss, settype_idss] = useState([]);
  const [id, setId] = useState("");
  const rowsPerPage = 6;
  const [loading, setLoading] = useState(false);
  const [permissionsData, setPermissionsData] = useState([]);
  const [permissionUserId, setPermissionUserId] = useState(null);

  const specialtyOptions = [
    { value: 1, label: "تخصص 1" },
    { value: 2, label: "تخصص 2" },
    { value: 3, label: "تخصص 3" },
    { value: 4, label: "تخصص 4" },
  ];

  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    national_code: "",
    phone_number: "",
    code: "",
    type_ids: [],
    specialty_ids: [],
  });

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    national_code: "",
    phone_number: "",
    code: "",
    type_ids: "",
    specialty_ids: "",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setUsers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSearchField = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };

  const validate = (isEdit = false) => {
    let newErrors = {};

    if (!users.username.trim()) {
      newErrors.username = "نام کاربری الزامی است";
    }
    if (!users.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(users.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }
    if (!isEdit && !users.password.trim()) {
      newErrors.password = "رمز عبور الزامی است";
    }
    if (!users.first_name.trim()) {
      newErrors.first_name = "نام الزامی است";
    }
    if (!users.last_name.trim()) {
      newErrors.last_name = "نام خانوادگی الزامی است";
    }
    if (!/^\d{10}$/.test(users.national_code)) {
      newErrors.national_code = "کد ملی باید 10 رقم عدد باشد";
    }
    if (!/^\d{11}$/.test(users.phone_number)) {
      newErrors.phone_number = "شماره تماس باید 11 رقم عدد باشد";
    }
    if (!users.code.trim()) {
      newErrors.code = "کد الزامی است";
    }
    if (!users.type_ids || users.type_ids.length === 0) {
      newErrors.type_ids = "انتخاب نقش الزامی است";
    }
    if (!users.specialty_ids || users.specialty_ids.length === 0) {
      newErrors.specialty_ids = "انتخاب تخصص الزامی است";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const addUser = async (e) => {
    e.preventDefault();

    if (!validate(false)) {
      return;
    }
    setLoading(true);
    const requestBody = {
      username: users.username,
      email: users.email,
      password: users.password,
      first_name: users.first_name,
      last_name: users.last_name,
      phone_number: users.phone_number,
      national_code: users.national_code,
      level: "one",
      status: true,
      is_active: true,
      is_staff: false,
      code: users.code,
      type_ids: users.type_ids,
      specialty_ids: users.specialty_ids,
    };

    try {
      const response = await apiClient.post("/user/users/", requestBody);
      if (response.status === 201) {
        setErrors({});
        setUsers({
          username: "",
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          national_code: "",
          phone_number: "",
          code: "",
          type_ids: [],
          specialty_ids: [],
        });
        setShowModal(false);
        getUsers();
        successMessage("کاربر با موفقیت اضافه شد");
      }
    } catch (err) {
      console.error(err);
      errorMessage(err.response?.data?.message || "خطا در افزودن کاربر");
      setLoading(false);
    }
  };

  const editUser = async (e) => {
    e.preventDefault();

    if (!validate(true)) {
      return;
    }
    setLoading(true);
    const requestBody = {
      username: users.username,
      email: users.email,
      first_name: users.first_name,
      last_name: users.last_name,
      phone_number: users.phone_number,
      national_code: users.national_code,
      code: users.code,
      type_ids: users.type_ids,
      specialty_ids: users.specialty_ids,
    };

    if (users.password && users.password.trim() !== "") {
      requestBody.password = users.password;
    }

    try {
      const response = await apiClient.put(`/user/users/${id}/`, requestBody);
      if (response.status === 200) {
        setErrors({});
        setUsers({
          username: "",
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          national_code: "",
          phone_number: "",
          code: "",
          type_ids: [],
          specialty_ids: [],
        });
        setShowModal(false);
        setId("");
        getUsers();
        successMessage("کاربر با موفقیت ویرایش شد");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      errorMessage(err.response?.data?.message || "خطا در ویرایش کاربر");
      setLoading(false);
    }
  };

  const handleCheck = (item, parent = null) => {
    setCheckedItems((prev) => {
      const newState = { ...prev };

      if (item.children && item.children.length > 0) {
        const isChecked = !prev[item.id];
        newState[item.id] = isChecked;
        item.children.forEach((child) => {
          newState[child.id] = isChecked;
        });
      } else {
        newState[item.id] = !prev[item.id];

        if (parent && parent.children) {
          const allChecked = parent.children.every(
            (child) => newState[child.id]
          );
          newState[parent.id] = allChecked;
        }
      }

      return newState;
    });
  };

  const chnageAccess = async (e) => {
    e.preventDefault();

    if (!permissionUserId) {
      errorMessage("خطا: شناسه کاربر مشخص نشده است");
      return;
    }

    const selectedPermissionIds = Object.keys(checkedItems)
      .filter((key) => checkedItems[key])
      .map((key) => parseInt(key));

    setLoading(true);

    try {
      const response = await apiClient.put(`/user/users/${permissionUserId}/`, {
        permission_ids: selectedPermissionIds,
      });

      if (response.status === 200) {
        successMessage("دسترسی‌های کاربر با موفقیت به‌روزرسانی شد");
        setShowModal(false);
        setCheckedItems({});
        setPermissionUserId(null);
        getUsers();
      }
    } catch (error) {
      console.error(error);
      errorMessage(
        error.response?.data?.message || "خطا در به‌روزرسانی دسترسی‌ها"
      );
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!password.trim()) {
      newErrors.password = "رمز جدید الزامی است";
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    setErrors((prev) => ({ ...prev, password: "" }));
    setLoading(true);

    try {
      const response = await apiClient.put(`/user/users/${id}/`, { password });
      if (response.status === 200) {
        setShowModal(false);
        setPassword("");
        setErrors({});
        successMessage("رمز عبور با موفقیت تغییر کرد");
      }
    } catch (error) {
      console.error(error);
      setErrors({ server: "خطا در تغییر رمز عبور" });
    } finally {
      setLoading(false);
    }
  };

  const getRolls = async () => {
    try {
      const response = await apiClient.get("/user/user-types/");
      if (response.status === 200) {
        settype_idss(
          response?.data?.map((item) => ({
            value: item.id,
            label: item.type,
          }))
        );
      }
    } catch (error) {
      errorMessage(error.response.data.message || "خطا در دریافت داده");
    }
  };

  const getUsers = useCallback(async () => {
    try {
      const params = {
        page: page + 1,
        page_size: rowsPerPage,
      };

      if (searchInput && searchInput.trim() !== "") {
        params.search = searchInput.trim();
      }

      const response = await apiClient.get("/user/users/", { params });
      if (response.status === 200) {
        setTotalRows(response.data.count);
        setRows(response.data?.results);
      }
    } catch (error) {
      errorMessage(error.response?.data?.message || "خطا در دریافت داده");
    }
  }, [page, rowsPerPage, searchInput]);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const response = await apiClient.put(`/user/users/${userId}/`, {
        status: newStatus,
      });
      if (response.status === 200) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === userId ? { ...row, status: newStatus } : row
          )
        );
      }
    } catch (error) {
      errorMessage(error.response?.data?.message || "خطا در تغییر وضعیت کاربر");
      getUsers();
    }
  };

  const handleEditClick = (row) => {
    setId(row.id);
    setUsers({
      username: row.username || "",
      email: row.email || "",
      password: "",
      first_name: row.first_name || "",
      last_name: row.last_name || "",
      national_code: row.national_code || "",
      phone_number: row.phone_number || "",
      code: row.code || "",
      type_ids:
        row.type && Array.isArray(row.type) ? row.type.map((t) => t.id) : [],
      specialty_ids:
        row.specialty && Array.isArray(row.specialty)
          ? row.specialty.map((s) => s.id)
          : [],
    });
    setTypeModal(4);
    setShowModal(true);
  };

  const handlePermissionsClick = async (row) => {
    setTypeModal(2);
    setPermissionUserId(row.id);
    setCheckedItems({});
    setShowModal(true);
    await getUserPermissions(row.id);
  };

  const getPermissions = async () => {
    try {
      const response = await apiClient.get("/user/permissions/?tree=true");
      if (response.status === 200) {
        setPermissionsData(response.data || []);
      }
    } catch (error) {
      errorMessage(error.response?.data?.message || "خطا در دریافت دسترسی ها");
    }
  };

  const getUserPermissions = async (userId) => {
    try {
      const response = await apiClient.get(`/user/user-types/${userId}/`);
      if (response.status === 200) {
        const userPermissions = response.data?.permissions || [];
        const permissionIds = userPermissions.map((p) =>
          typeof p === "object" ? p.id : p
        );

        const initialChecked = {};
        permissionIds.forEach((permId) => {
          initialChecked[permId] = true;
        });

        if (permissionsData.length > 0) {
          permissionsData.forEach((category) => {
            if (category.children && category.children.length > 0) {
              const allChildrenSelected = category.children.every((child) =>
                permissionIds.includes(child.id)
              );
              if (allChildrenSelected) {
                initialChecked[category.id] = true;
              }
            }
          });
        }

        setCheckedItems(initialChecked);
      }
    } catch (error) {
      console.error("Error fetching user permissions:", error);
      setCheckedItems({});
    }
  };

  useEffect(() => {
    getRolls();
    getUsers();
    getPermissions();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (page !== 0) {
        setPage(0);
      } else {
        getUsers();
      }
    }, 600);

    return () => clearTimeout(debounce);
  }, [searchInput, getUsers, page]);

  useEffect(() => {
    if (page !== undefined) {
      getUsers();
    }
  }, [page, rowsPerPage, getUsers]);

  return (
    <>
      <Modal showModal={showModal} setShowModal={handleToggleModal}>
        {typeModal === 1 ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "var(--color-3)",
                fontWeight: "medium",
              }}
            >
              <span>تعریف کاربر جدید</span>
              <div
                className={styles.delete_icon_modal}
                onClick={() => setShowModal(false)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <form onSubmit={addUser}>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"نام"}
                    name="first_name"
                    placeholder={"نام"}
                    value={users.first_name}
                  />
                  {errors.first_name && (
                    <p className="error">{errors.first_name}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"نام خانوادگی"}
                    name="last_name"
                    placeholder={"نام خانوادگی"}
                    value={users.last_name}
                  />
                  {errors.last_name && (
                    <p className="error">{errors.last_name}</p>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"نام کاربری"}
                    name="username"
                    placeholder={"نام کاربری"}
                    value={users.username}
                  />
                  {errors.username && (
                    <p className="error">{errors.username}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"ایمیل"}
                    name="email"
                    placeholder={"ایمیل"}
                    type="text"
                    value={users.email}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </Grid>
              </Grid>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"رمز عبور"}
                    name="password"
                    placeholder={"رمز عبور"}
                    type="password"
                    value={users.password}
                  />
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"کد"}
                    name="code"
                    placeholder={"کد"}
                    value={users.code}
                  />
                  {errors.code && <p className="error">{errors.code}</p>}
                </Grid>
              </Grid>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"کدملی"}
                    name="national_code"
                    placeholder={"کدملی"}
                    value={users.national_code}
                  />
                  {errors.national_code && (
                    <p className="error">{errors.national_code}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"شماره تماس"}
                    name="phone_number"
                    placeholder={"شماره تماس"}
                    value={users.phone_number}
                  />
                  {errors.phone_number && (
                    <p className="error">{errors.phone_number}</p>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <MultipleSelectCheckmarks
                    options={type_idss}
                    selectedValues={users.type_ids}
                    onChange={(values) =>
                      setUsers((prev) => ({ ...prev, type_ids: values }))
                    }
                    lable="انتخاب نقش:"
                  />
                  {errors.type_ids && (
                    <p className="error">{errors.type_ids}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <MultipleSelectCheckmarks
                    options={specialtyOptions}
                    selectedValues={users.specialty_ids}
                    onChange={(values) =>
                      setUsers((prev) => ({ ...prev, specialty_ids: values }))
                    }
                    lable="انتخاب تخصص:"
                  />
                  {errors.specialty_ids && (
                    <p className="error">{errors.specialty_ids}</p>
                  )}
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", width: "60%", margin: "0 auto" }}>
                <Button2 style={"width"} type="submit" disabled={loading}>
                  {loading ? "در حال ذخیره..." : "تایید"}
                </Button2>
              </Box>
            </form>
          </>
        ) : typeModal === 2 ? (
          <form onSubmit={chnageAccess}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "var(--color-3)",
                fontWeight: "medium",
                marginBottom: "1rem",
              }}
            >
              <span>تعریف دسترسی کاربر</span>
              <div
                className={styles.delete_icon_modal}
                onClick={() => {
                  setShowModal(false);
                  setCheckedItems({});
                  setPermissionUserId(null);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            {permissionsData.length > 0 ? (
              permissionsData.map((item) => (
                <div key={item.id} style={{ marginTop: "1rem" }}>
                  <InputCheckBox
                    value={item.id}
                    checked={!!checkedItems[item.id]}
                    text={item.display_name || item.name}
                    onChange={() => handleCheck(item)}
                    ismain={true}
                  />

                  <div style={{ marginRight: "2rem" }}>
                    {item.children?.map((child) => (
                      <InputCheckBox
                        key={child.id}
                        value={child.id}
                        checked={!!checkedItems[child.id]}
                        text={child.display_name || child.name}
                        onChange={() => handleCheck(child, item)}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", padding: "2rem" }}>
                در حال بارگذاری دسترسی‌ها...
              </p>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                width: "100%",
                marginTop: "2rem",
              }}
            >
              <Button2 type="submit" disabled={loading}>
                {loading ? "در حال ذخیره..." : "ذخیره"}
              </Button2>
              <Button2
                onClick={() => {
                  setShowModal(false);
                  setCheckedItems({});
                  setPermissionUserId(null);
                }}
                style={"btn_cancel"}
                type="button"
              >
                انصراف
              </Button2>
            </div>
          </form>
        ) : typeModal === 3 ? (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "var(--color-3)",
                fontWeight: "medium",
              }}
            >
              <span>تغییر رمز</span>
              <div
                className={styles.delete_icon_modal}
                onClick={() => setShowModal(false)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <form onSubmit={changePassword}>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    label={"رمز جدید"}
                    name="password"
                    placeholder={"رمز جدید"}
                    value={password}
                  />
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", width: "60%", margin: "0 auto" }}>
                <Button2 style={"width"} type="submit" disable={loading}>
                  {loading ? "درحال تغییر" : "تایید"}
                </Button2>
              </Box>
            </form>
          </div>
        ) : typeModal === 4 ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "var(--color-3)",
                fontWeight: "medium",
              }}
            >
              <span>ویرایش کاربر</span>
              <div
                className={styles.delete_icon_modal}
                onClick={() => {
                  setShowModal(false);
                  setUsers({
                    username: "",
                    email: "",
                    password: "",
                    first_name: "",
                    last_name: "",
                    national_code: "",
                    phone_number: "",
                    code: "",
                    type_ids: [],
                    specialty_ids: [],
                  });
                  setId("");
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <form onSubmit={editUser}>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"نام"}
                    name="first_name"
                    placeholder={"نام"}
                    value={users.first_name}
                  />
                  {errors.first_name && (
                    <p className="error">{errors.first_name}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"نام خانوادگی"}
                    name="last_name"
                    placeholder={"نام خانوادگی"}
                    value={users.last_name}
                  />
                  {errors.last_name && (
                    <p className="error">{errors.last_name}</p>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"نام کاربری"}
                    name="username"
                    placeholder={"نام کاربری"}
                    value={users.username}
                  />
                  {errors.username && (
                    <p className="error">{errors.username}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"ایمیل"}
                    name="email"
                    placeholder={"ایمیل"}
                    type="text"
                    value={users.email}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </Grid>
              </Grid>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"رمز عبور (اختیاری)"}
                    name="password"
                    placeholder={"رمز عبور جدید"}
                    type="password"
                    value={users.password}
                  />
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"کد"}
                    name="code"
                    placeholder={"کد"}
                    value={users.code}
                  />
                  {errors.code && <p className="error">{errors.code}</p>}
                </Grid>
              </Grid>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"کدملی"}
                    name="national_code"
                    placeholder={"کدملی"}
                    value={users.national_code}
                  />
                  {errors.national_code && (
                    <p className="error">{errors.national_code}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <Input
                    onChange={handleChangeForm}
                    label={"شماره تماس"}
                    name="phone_number"
                    placeholder={"شماره تماس"}
                    value={users.phone_number}
                  />
                  {errors.phone_number && (
                    <p className="error">{errors.phone_number}</p>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                className={"distancerow"}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <MultipleSelectCheckmarks
                    options={type_idss}
                    selectedValues={users.type_ids}
                    onChange={(values) =>
                      setUsers((prev) => ({ ...prev, type_ids: values }))
                    }
                    lable="انتخاب نقش:"
                  />
                  {errors.type_ids && (
                    <p className="error">{errors.type_ids}</p>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
                  <MultipleSelectCheckmarks
                    options={specialtyOptions}
                    selectedValues={users.specialty_ids}
                    onChange={(values) =>
                      setUsers((prev) => ({ ...prev, specialty_ids: values }))
                    }
                    lable="انتخاب تخصص:"
                  />
                  {errors.specialty_ids && (
                    <p className="error">{errors.specialty_ids}</p>
                  )}
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", width: "60%", margin: "0 auto" }}>
                <Button2 style={"width"} type="submit" disabled={loading}>
                  {loading ? "در حال ذخیره..." : "تایید"}
                </Button2>
              </Box>
            </form>
          </>
        ) : null}
        <></>
      </Modal>
      <div className="content-conatiner">
        <SideBar />
        <div className="space-content scroll-contant">
          <Header title={"کاربران"} />
          <div className={styles.top_table}>
            <TitleWithSearch
              searchInput={searchInput}
              onChange={handleChangeSearchField}
              title={"کاربرها"}
              isbackButton={false}
              placeholder="جستوجو براساس کد,کد ملی,نام کاربر,نام ونام خانوادگی"
            />
            <div
              className={styles.add_new_item_btn}
              onClick={() => {
                setTypeModal(1);
                setShowModal(true);
              }}
            >
              <div className={styles.icon_container}>
                <FontAwesomeIcon icon={faPlus} className="" />
              </div>
              <span>تعریف کاربر جدید</span>
            </div>
          </div>
          <TableCustom
            rows={totalRows}
            columns={columns}
            onChange={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            total={totalRows}
            maxHeight={"70vh"}
          >
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                    fontFamily: "iranYekan",
                  }}
                >
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(row?.code)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(row?.username)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(row?.national_code)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(row.first_name)}{" "}
                    {toFarsiNumber(row.last_name)}
                  </TableCell>
                  <ChnageDate date={row?.date_joined} />
                  <TableCell
                    align="center"
                    sx={{ fontFamily: "iranYekan", justifyItems: "center" }}
                  >
                    {Array.isArray(row.type) && row.type.length > 0
                      ? row.type.map((t) => t.type).join(" / ")
                      : "Invalid data"}
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "iranYekan", justifyItems: "center" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <button
                        className={styles.btn_protect}
                        onClick={() => handleEditClick(row)}
                      >
                        <FontAwesomeIcon icon={faPen} size="24" />
                      </button>
                      <button
                        className={styles.btn_protect}
                        onClick={() => {
                          setTypeModal(3);
                          setShowModal(true);
                          setId(row?.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faKey} size="24" />
                      </button>
                      <button
                        className={styles.btn_protect}
                        onClick={() => handlePermissionsClick(row)}
                      >
                        <FontAwesomeIcon icon={faShield} size="24" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontFamily: "iranYekan", justifyItems: "center" }}
                  >
                    <ToggleSwitch
                      value={row.status}
                      handleChange={(e) =>
                        handleStatusChange(row.id, e.target.checked)
                      }
                      name={`status-${row.id}`}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableCustom>
        </div>
      </div>
      <ToastContainerCustom />
    </>
  );
}
