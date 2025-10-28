import { useState } from "react";
import TitleWithSearch from "../../../Components/Modules/TitleWithSearch/TitleWithSearch";
import {
  faAngleDown,
  faKey,
  faPlus,
  faShield,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Users.module.css";
import TableCustom from "../../../Components/Modules/TableCustom/TableCustom";
import { Box, TableCell, TableRow } from "@mui/material";
import ToggleSwitch from "../../../Components/Modules/ToggleSwitch/ToggleSwitch";
import Modal from "../../../Components/Modules/Modal/Modal";
import Input from "../../../Components/Modules/Input/Input";
import SearchAndSelectDropDwon from "../../../Components/Modules/SearchAndSelectDropDwon/SearchAndSelectDropDwon";
import Grid from "@mui/material/Grid2";
import Button2 from "../../../Components/Modules/Button2/Button2";
import apiClient from "../../../config/axiosConfig";
import InputCheckBox from "../../../Components/Modules/InputChekBox/InputCheckBox";
import { toFarsiNumber } from "../../../utils/helper";

const fakeRows = [
  {
    code: "U001",
    username: "ali.rezaei",
    nationalCode: "0012345678",
    fullName: "علی رضایی",
    lastLogin: "2025-09-28 09:12:34",
    role: "مدیر",
    actions: { edit: true, delete: false },
    status: "فعال",
  },
  {
    code: "U002",
    username: "sara.ahmadi",
    nationalCode: "0023456789",
    fullName: "سارا احمدی",
    lastLogin: "2025-09-27 18:45:10",
    role: "کاربر",
    actions: { edit: true, delete: true },
    status: "فعال",
  },
  {
    code: "U003",
    username: "mohammad.h",
    nationalCode: "0034567890",
    fullName: "محمد حسینی",
    lastLogin: "2025-09-26 07:05:00",
    role: "پشتیبانی",
    actions: { edit: true, delete: true },
    status: "معلق",
  },
  {
    code: "U004",
    username: "fateme.k",
    nationalCode: "0045678901",
    fullName: "فاطمه کاظمی",
    lastLogin: "2025-09-20 21:30:12",
    role: "کاربر",
    actions: { edit: false, delete: false },
    status: "فعال",
  },
  {
    code: "U005",
    username: "reza.najafi",
    nationalCode: "0056789012",
    fullName: "رضا نجفی",
    lastLogin: "2025-08-15 11:00:00",
    role: "سرپرست",
    actions: { edit: true, delete: false },
    status: "فعال",
  },
  {
    code: "U006",
    username: "mina.t",
    nationalCode: "0067890123",
    fullName: "مینا ترکاشوند",
    lastLogin: "2025-09-01 14:14:14",
    role: "کاربر",
    actions: { edit: true, delete: true },
    status: "معطل",
  },
  {
    code: "U007",
    username: "hossein.a",
    nationalCode: "0078901234",
    fullName: "حسین اسدی",
    lastLogin: "2025-09-28 00:05:50",
    role: "مدیر",
    actions: { edit: true, delete: false },
    status: "فعال",
  },
  {
    code: "U008",
    username: "niloofar.s",
    nationalCode: "0089012345",
    fullName: "نیلوفر سلیمانی",
    lastLogin: "2025-07-30 08:22:10",
    role: "پشتیبانی",
    actions: { edit: false, delete: true },
    status: "حذف شده",
  },
  {
    code: "U009",
    username: "amir.karimi",
    nationalCode: "0090123456",
    fullName: "امیر کریمی",
    lastLogin: "2025-09-25 12:00:00",
    role: "کاربر",
    actions: { edit: true, delete: true },
    status: "فعال",
  },
  {
    code: "U010",
    username: "leila.m",
    nationalCode: "0101234567",
    fullName: "لیلا مرادی",
    lastLogin: "2025-06-11 16:40:00",
    role: "کاربر",
    actions: { edit: false, delete: false },
    status: "معلق",
  },
  {
    code: "U011",
    username: "amirhosein.r",
    nationalCode: "0112345670",
    fullName: "امیرحسین رضوی",
    lastLogin: "2025-09-27 22:11:05",
    role: "سرپرست",
    actions: { edit: true, delete: false },
    status: "فعال",
  },
  {
    code: "U012",
    username: "samira.b",
    nationalCode: "0123456701",
    fullName: "سمیرا بیگی",
    lastLogin: "2025-09-22 10:10:10",
    role: "کاربر",
    actions: { edit: true, delete: true },
    status: "فعال",
  },
];

const permissions = [
  {
    label: "گزارشات",
    value: "reports",
    children: [
      { label: "گزارش فروش", value: "salesReport" },
      { label: "گزارش کاربران", value: "usersReport" },
      { label: "گزارش مالی", value: "financeReport" },
    ],
  },
  {
    label: "مدیریت کاربران",
    value: "userManagement",
    children: [
      { label: "افزودن کاربر", value: "addUser" },
      { label: "ویرایش کاربر", value: "editUser" },
    ],
  },
];

export default function Users() {
  const columns = [
    "کد",
    "نام کاربری",
    "کد ملی کاربر",
    "نام کاربر",
    "آخرین ورود به سامانه",
    "نقش",
    "عملیات",
    "وضعیت",
  ];

  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [filterRows, setFilterRows] = useState(fakeRows);
  const [rows, setRows] = useState(fakeRows);
  const rowsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});
  const [users, setUsers] = useState({
    first_name: "",
    last_name: "",
    national_code: "",
    phone_number: "",
    role: "",
  });

  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    national_code: "",
    phone_number: "",
    role: "",
    old_password: "",
  });

  const handleSelectChange = (field, value, label) => {
    setUsers((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "role" && { role: label }),
    }));
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setUsers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePasswords = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSearchField = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);
    const filtered = rows.filter(
      (row) =>
        row.code.toLowerCase().includes(searchTerm) ||
        row.fullName.toLowerCase().includes(searchTerm) ||
        row.username.toLowerCase().includes(searchTerm) ||
        row.nationalCode.toLowerCase().includes(searchTerm) ||
        row.role.toLowerCase().includes(searchTerm)
    );
    setFilterRows(filtered);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };

  const validate = () => {
    let newErrors = {};

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
    if (!users.role.trim()) {
      newErrors.role = "انتخاب نقش الزامی است";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const addUser = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newRow = {
      code: `U${String(rows.length + 1).padStart(3, "0")}`,
      username: `${users.first_name}.${users.last_name}`,
      nationalCode: users.national_code,
      fullName: `${users.first_name} ${users.last_name}`,
      lastLogin: new Date().toISOString().slice(0, 19).replace("T", " "),
      role: users.role,
      actions: { edit: true, delete: true },
      status: "فعال",
    };

    setRows((prev) => [newRow, ...prev]);
    setFilterRows((prev) => [newRow, ...prev]);

    setUsers({
      first_name: "",
      last_name: "",
      national_code: "",
      phone_number: "",
      role: "",
    });
    setShowModal(false);

    try {
      const response = await apiClient.post("/", users);
      if (response.status === 201) {
        setErrors({});
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheck = (item, parent = null) => {
    setCheckedItems((prev) => {
      const newState = { ...prev };

      if (item.children) {
        const isChecked = !prev[item.value];
        newState[item.value] = isChecked;
        item.children.forEach((child) => {
          newState[child.value] = isChecked;
        });
      } else {
        newState[item.value] = !prev[item.value];

        if (parent) {
          const allChecked = parent.children.every(
            (child) => newState[child.value]
          );
          newState[parent.value] = allChecked;
        }
      }

      return newState;
    });
  };

  const chnageAccess = (e) => {
    e.preventDefault();
  };

  const changePassword = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!passwords.old_password.trim()) {
      newErrors.old_password = "رمز قبلی الزامی است";
    }
    if (!passwords.new_password.trim()) {
      newErrors.new_password = "رمز جدید الزامی است";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await apiClient.post("/change-password", passwords);
      if (response.status === 201) {
        setShowModal(false);
        setPasswords({
          old_password: "",
          new_password: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error(error);
      setErrors({ server: "خطا در تغییر رمز عبور" });
    }
  };

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
                <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
                  <SearchAndSelectDropDwon
                    icon={faAngleDown}
                    label={"نقش کاربر"}
                    items={[
                      { value_id: "مدیر", value: "مدیر" },
                      { value_id: "ادمین", value: "ادمین" },
                      { value_id: "تعمیرکار", value: "تعمیرکار" },
                    ]}
                    name="role"
                    onChange={handleSelectChange}
                    value={users.role}
                    placeHolder={"نقش"}
                  />

                  {errors.role && <p className="error">{errors.role}</p>}
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", width: "60%", margin: "0 auto" }}>
                <Button2 style={"width"} type="submit">
                  تایید
                </Button2>
              </Box>
            </form>
          </>
        ) : typeModal === 2 ? (
          <form onSubmit={chnageAccess}>
            <span
              style={{
                fontWeight: "600",
                color: "var(--color-1)",
                display: "inline-block",
                marginBottom: "1rem",
              }}
            >
              دسترسی کاربر:
            </span>
            {permissions.map((item) => (
              <div key={item.value} style={{ marginTop: "1rem" }}>
                <InputCheckBox
                  value={item.value}
                  checked={!!checkedItems[item.value]}
                  text={item.label}
                  onChange={() => handleCheck(item)}
                  ismain={true}
                />

                <div>
                  {item.children?.map((child) => (
                    <InputCheckBox
                      key={child.value}
                      value={child.value}
                      checked={!!checkedItems[child.value]}
                      text={child.label}
                      onChange={() => handleCheck(child, item)}
                    />
                  ))}
                </div>
              </div>
            ))}
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
              <Button2 type="submit">ذخیره</Button2>
              <Button2
                onClick={() => {
                  setShowModal(false);
                  setCheckedItems({});
                }}
                style={"btn_cancel"}
                type="button"
              >
                انصراف
              </Button2>
            </div>
          </form>
        ) : typeModal === 3 ? (
          <>
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
                      onChange={handleChangePasswords}
                      label={"رمز قبلی"}
                      name="old_password"
                      placeholder={"رمز قبلی"}
                      value={passwords.old_password}
                    />
                    {errors.old_password && (
                      <p className="error">{errors.old_password}</p>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
                    <Input
                      onChange={handleChangePasswords}
                      label={"رمز جدید"}
                      name="new_password"
                      placeholder={"رمز جدید"}
                      value={passwords.new_password}
                    />
                    {errors.new_password && (
                      <p className="error">{errors.new_password}</p>
                    )}
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", width: "60%", margin: "0 auto" }}>
                  <Button2 style={"width"} type="submit">
                    تایید
                  </Button2>
                </Box>
              </form>
            </div>
          </>
        ) : null}
        <></>
      </Modal>
      <div className={styles.top_table}>
        <TitleWithSearch
          searchInput={searchInput}
          onChange={handleChangeSearchField}
          title={"کاربرها"}
          isbackButton={false}
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
        rows={filterRows}
        columns={columns}
        onChange={handleChangePage}
        page={page}
        rowsPerPage={rowsPerPage}
        total={filterRows.length}
        maxHeight={"70vh"}
      >
        {filterRows.length > 0 ? (
          filterRows
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                  fontFamily: "iranYekan",
                }}
              >
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(row.code)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(row.username)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(row.nationalCode)}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {toFarsiNumber(row.fullName)}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontFamily: "iranYekan", justifyItems: "center" }}
                >
                  {toFarsiNumber(row.lastLogin)}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontFamily: "iranYekan", justifyItems: "center" }}
                >
                  {toFarsiNumber(row.role)}
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
                      onClick={() => {
                        setTypeModal(3);
                        setShowModal(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faKey} size="24" />
                    </button>
                    <button
                      className={styles.btn_protect}
                      onClick={() => {
                        setTypeModal(2);
                        setShowModal(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faShield} size="24" />
                    </button>
                  </div>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontFamily: "iranYekan", justifyItems: "center" }}
                >
                  <ToggleSwitch />
                </TableCell>
              </TableRow>
            ))
        ) : (
          <></>
        )}
      </TableCustom>
    </>
  );
}

{
  /* <p className="error">{errors.markCode}</p> */
}
