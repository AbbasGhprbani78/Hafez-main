import { useContext, useEffect, useRef, useState } from "react";
import styles from "./AcceptenceForm3.module.css";
import {
  errorMessage,
  successMessage,
} from "../../../Modules/Toast/ToastCustom";
import LoadingForm from "../../../Modules/Loading/LoadingForm";
import Modal from "../../../Modules/Modal/Modal";
import Button2 from "../../../Modules/Button2/Button2";
import DataInput from "../../../Modules/DataInput/DataInput";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { TableCell, TableRow, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPen,
  faTrash,
  faCheck,
  faUserTie,
  faFileImage,
  faFileAudio,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../../../config/axiosConfig";
import TableForm3 from "../../../Modules/TableForm3/TableForm3";
import MediaModal from "../../../Modules/MediaModal/MediaModal";
import InputPrice from "../../../Modules/InputPrice/InputPrice";
import { MyContext } from "../../../../context/context";
import SearchAndSelectDropDwon from "../../../Modules/SearchAndSelectDropDwon/SearchAndSelectDropDwon";
import SelectDropDown2 from "../../../Modules/SelectDropDown2/SelectDropDown2";
import { toFarsiNumber } from "../../../../utils/helper";
import TableCustom from "../../../Modules/TableCustom/TableCustom";
import { useNavigate } from "react-router-dom";

const columns = [
  "کد",
  "نام تعمیرکار",
  "تخصص تعمیرکار",
  "قابلیت زمانی تعمیرکار",
  "زمان ازاد",
  "وضعیت",
];

function AcceptenceForm3({
  nextTab = () => {},
  setContent = () => {},
  prevTab = () => {},
  formId = "",
  currentTab,
  fromExpertReferral = false,
}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { idForm } = useContext(MyContext);
  const endRef = useRef(null);
  const navigate = useNavigate();
  const [dataform3, setDataForm3] = useState({
    CustomerStatements: "",
    CustomerFile: [],
    CustomerVoice: [],
    ExpertStatements: "",
    ExpertStatementsText: "",
    ExpertFile: [],
    ExpertVoice: [],
    invoiceItems: [{ wages: "", price: "", repairman: "" }],
  });
  const [page, setPage] = useState(0);

  const [selectedData, setSelectedData] = useState({
    customer: formId,
    tableForm: [],
    EstimatedRepairTime: "",
    referral_to_an_expert: "normal",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [typeuser, setTypeUser] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(null);
  const [customerTexts, setCustomerTexts] = useState([]);
  const [expertTexts, setExpertTexts] = useState([]);
  const [wages, setWages] = useState([]);
  const [prices, setPrices] = useState();
  const [repairmen, setRepairmen] = useState([]);
  const [allschedules, setAllShedules] = useState([]);
  const [repairmanSearch, setRepairmanSearch] = useState("");
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [assignLoading, setAssignLoading] = useState(false);
  const [hourlyRateInput, setHourlyRateInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [totalSchedules, setTotalSchedules] = useState(0);
  const rowsPerPage = 10;

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };

  const hadleClickOnGoesBack = () => {
    if (fromExpertReferral) {
      navigate("/expert-referral");
    } else {
      prevTab();
    }
  };

  const handleAddInvoiceItem = () => {
    setDataForm3((prev) => ({
      ...prev,
      invoiceItems: [
        ...prev.invoiceItems,
        { wages: "", price: "", repairman: "" },
      ],
    }));
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleChange = (field, value, label) => {
    setDataForm3((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "ExpertStatements" && { ExpertStatementsText: label }),
    }));
  };

  const handleRepairTimeChange = (newDate) => {
    setSelectedData((prev) => ({
      ...prev,
      EstimatedRepairTime: newDate,
    }));
  };

  const handleInvoiceItemChange = (index, field, value) => {
    setDataForm3((prev) => {
      const newInvoiceItems = [...prev.invoiceItems];
      newInvoiceItems[index] = {
        ...newInvoiceItems[index],
        [field]: value,
      };
      return {
        ...prev,
        invoiceItems: newInvoiceItems,
      };
    });
  };

  const handlePayChange = (index) => (name, value) => {
    const selectedPriceItem = prices.find((item) => item.value_id === value);

    setDataForm3((prev) => {
      const newItems = [...prev.invoiceItems];
      newItems[index].wages = value;
      newItems[index].price = selectedPriceItem?.value || "";
      return {
        ...prev,
        invoiceItems: newItems,
      };
    });
  };

  const handleRepairmanChange = (index) => (name, value) => {
    handleInvoiceItemChange(index, "repairman", value);
  };

  const handleRemoveInvoiceItem = (indexToRemove) => {
    setDataForm3((prev) => ({
      ...prev,
      invoiceItems: prev.invoiceItems.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const addToTable = () => {
    if (!dataform3.CustomerStatements.trim()) {
      errorMessage("لطفاً اظهارات مشتری و کارشناس را وارد کنید.");
      return;
    }

    if (fromExpertReferral) {
      if (
        !dataform3.invoiceItems.length ||
        dataform3.invoiceItems.some((item) => {
          const price = Number(item.price);
          return (
            item.wages === "" ||
            item.price === "" ||
            item.repairman === "" ||
            isNaN(price) ||
            price < 0
          );
        })
      ) {
        errorMessage(
          "لطفاً تمام فیلدهای آیتم‌های فاکتور را به‌درستی وارد کنید (قیمت نباید منفی باشد)."
        );
        return;
      }
    }

    if (editMode) {
      setSelectedData((prev) => {
        const updatedTableForm = [...prev.tableForm];
        updatedTableForm[indexToEdit] = {
          CustomerStatements: dataform3.CustomerStatements,
          CustomerFile: dataform3.CustomerFile,
          CustomerVoice: dataform3.CustomerVoice,
          ExpertStatements: dataform3.ExpertStatements,
          ExpertFile: dataform3.ExpertFile,
          ExpertVoice: dataform3.ExpertVoice,
          invoiceItems: dataform3.invoiceItems,
          ExpertStatementsText: dataform3.ExpertStatementsText,
        };
        return {
          ...prev,
          tableForm: updatedTableForm,
        };
      });
      setEditMode(false);
      successMessage("اطلاعات با موفقیت تغییر کرد.");
    } else {
      const newTableRow = {
        CustomerStatements: dataform3.CustomerStatements,
        CustomerFile: dataform3.CustomerFile,
        CustomerVoice: dataform3.CustomerVoice,
        ExpertStatements: dataform3.ExpertStatements,
        ExpertFile: dataform3.ExpertFile,
        ExpertVoice: dataform3.ExpertVoice,
        invoiceItems: dataform3.invoiceItems,
        ExpertStatementsText: dataform3.ExpertStatementsText,
      };

      setSelectedData((prev) => ({
        ...prev,
        tableForm: [...prev.tableForm, newTableRow],
      }));
      successMessage("اطلاعات با موفقیت به جدول اضافه شد.");
    }

    setDataForm3({
      CustomerStatements: "",
      CustomerFile: [],
      CustomerVoice: [],
      ExpertStatements: "",
      ExpertFile: [],
      ExpertVoice: [],
      ExpertStatementsText: "",
      invoiceItems: [{ wages: "", price: "", repairman: "" }],
    });
  };

  const deleteRow = (index) => {
    setSelectedData((prev) => ({
      ...prev,
      tableForm: prev.tableForm.filter((_, i) => i !== index),
    }));
    successMessage("ردیف با موفقیت حذف شد.");
  };

  const editRow = (index, updatedRow) => {
    setEditMode(true);
    setDataForm3({
      CustomerStatements: updatedRow.CustomerStatements,
      CustomerFile: updatedRow.CustomerFile,
      CustomerVoice: updatedRow.CustomerVoice,
      ExpertStatements: updatedRow.ExpertStatements,
      ExpertFile: updatedRow.ExpertFile,
      ExpertVoice: updatedRow.ExpertVoice,
      invoiceItems: updatedRow.invoiceItems,
    });
    setIndexToEdit(index);
  };

  const getCustomerStatements = async () => {
    try {
      const response = await apiClient.get("/app/customer-statements/");
      if (response.status === 200) {
        setCustomerTexts(
          response.data.map((item) => ({
            value_id: item?.description,
            value: item?.description,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getExpertStatements = async () => {
    try {
      const response = await apiClient.get("/app/get-all-statement-code/");
      if (response.status === 200) {
        setExpertTexts(
          response.data.map((item) => ({
            value_id: item?.id,
            value: item?.descriptions,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postForm3Data = async () => {
    if (fromExpertReferral) {
      selectedData.referral_to_an_expert = "expert approve";
    }
    const submitMethod = fromExpertReferral === true ? "put" : "post";
    if (
      selectedData.referral_to_an_expert === "normal" ||
      selectedData.referral_to_an_expert === "expert approve"
    ) {
      if (!selectedData.tableForm.length) {
        errorMessage("لطفا فرم را تکمیل کنید");
        return;
      }
      if (!selectedData.EstimatedRepairTime) {
        errorMessage("لطفا تخمین زمان را وارد کنید");
        return;
      }
      const hasInvalidInvoiceItems = selectedData.tableForm.some((row) => {
        if (!row.invoiceItems?.length) return true;
        return row.invoiceItems.some((item) => {
          const price = Number(item.price);
          return (
            item.wages === "" ||
            item.price === "" ||
            item.repairman === "" ||
            Number.isNaN(price) ||
            price < 0
          );
        });
      });

      if (hasInvalidInvoiceItems) {
        errorMessage(
          "لطفاً تمام فیلدهای آیتم‌های فاکتور را به‌درستی وارد کنید (قیمت نباید منفی باشد)."
        );
        return;
      }
    }
    setLoading(true);

    try {
      const response = await apiClient[submitMethod](
        `/app/submit-repair-form/${idForm ? idForm : formId}`,
        selectedData
      );

      if (response.status === 200) {
        successMessage(
          selectedData?.referral_to_an_expert === "normal"
            ? "فرم با موفقیت ارسال شد"
            : selectedData?.referral_to_an_expert === "expert approve"
            ? "فرم با موفقیت تایید شد"
            : ""
        );
        selectedData?.referral_to_an_expert === "normal" && nextTab();
        selectedData?.referral_to_an_expert === "expert approve" &&
          navigate("/allform");
      }
    } catch (error) {
      errorMessage(error?.response?.message || "خطا در ارسال داده‌ها");
    } finally {
      setLoading(false);
    }
  };

  const postForm3Toexpert = async () => {
    const formPayload = { ...selectedData };
    delete formPayload.referral_to_an_expert;
    setLoading(true);

    try {
      const response = await apiClient.post(
        `app/form/${idForm ? idForm : formId}/referral-to-expert/`,
        formPayload
      );

      if (response.status === 200) {
        successMessage("فرم با موفقیت به کارشناس ارجاع داده شد");
      }
    } catch (error) {
      errorMessage(error?.response?.message || "خطا در ارسال داده‌ها");
    } finally {
      setLoading(false);
    }
  };

  const getWagesPricerepairman = async () => {
    try {
      const response = await apiClient.get(
        `/app/get-statement/${dataform3.ExpertStatements}`
      );
      if (response.status === 200) {
        setRepairmen(
          response.data.repairmen.map((item) => ({
            value_id: item.id,
            value: item.full_name,
          }))
        );
        setWages(
          response.data.statements.map((item) => ({
            value_id: item.id,
            value: item.descriptions,
          }))
        );

        setPrices(
          response.data.statements.map((item) => ({
            value_id: item.id,
            value: item.price,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const urlToBase64 = async (url) => {
    try {
      const fullUrl = url.startsWith("http") ? url : `${apiUrl}${url}`;

      const response = await fetch(fullUrl);
      const blob = await response.blob();

      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          reject("Error reading blob as base64");
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error in urlToBase64:", error);
      return null;
    }
  };

  const getForm3Data = async () => {
    try {
      const response = await apiClient.get(
        `/app/submit-repair-form/${idForm ? idForm : formId}`
      );

      if (response.status === 200) {
        const { EstimatedRepairTime, tableForm = [], ...rest } = response.data;

        const miladiDate = EstimatedRepairTime
          ? new DateObject({
              date: EstimatedRepairTime,
              format: "YYYY/MM/DD HH:mm",
              calendar: persian,
              locale: persian_fa,
            })
              .convert("gregorian")
              .toDate()
          : "";

        const newTableForm = await Promise.all(
          tableForm.map(async (item) => {
            const CustomerFile = await Promise.all(
              item.CustomerFile.map(async (file) =>
                file.startsWith("data:image") ? file : await urlToBase64(file)
              )
            );

            const ExpertFile = await Promise.all(
              item.ExpertFile.map(async (file) =>
                file.startsWith("data:image") ? file : await urlToBase64(file)
              )
            );

            const CustomerVoice = await Promise.all(
              item.CustomerVoice.map(async (file) =>
                file.startsWith("data:audio") ? file : await urlToBase64(file)
              )
            );

            const ExpertVoice = await Promise.all(
              item.ExpertVoice.map(async (file) =>
                file.startsWith("data:audio") ? file : await urlToBase64(file)
              )
            );

            const matchedExpert = expertTexts.find(
              (opt) => opt.value_id === item.ExpertStatements
            );

            return {
              ...item,
              CustomerFile,
              ExpertFile,
              CustomerVoice,
              ExpertVoice,
              ExpertStatementsText: matchedExpert ? matchedExpert.value : "",
            };
          })
        );

        const referralValue =
          rest?.referral_to_an_expert ??
          selectedData.referral_to_an_expert ??
          "normal";

        setSelectedData((prev) => ({
          ...prev,
          ...rest,
          referral_to_an_expert: referralValue,
          tableForm: newTableForm,
          EstimatedRepairTime: miladiDate,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCliclOnRepairmanSchedule = async () => {
    setShowModal(true);
    setTypeModal(3);
  };

  const getRepairmanSchedules = async (
    search = "",
    pageNumber = page,
    pageSize = rowsPerPage
  ) => {
    try {
      setSchedulesLoading(true);
      const response = await apiClient.get("app/api/repairman-schedule/", {
        params: {
          search,
          page: pageNumber + 1,
          page_size: pageSize,
        },
      });
      if (response.status === 200) {
        setAllShedules(response.data.results.all_schedules || []);
        setTotalSchedules(
          response.data.count ||
            response.data.total ||
            (response.data.all_schedules || []).length
        );
      }
    } catch (error) {
      errorMessage("خطا در دریافت برنامه تعمیرکار");
    } finally {
      setSchedulesLoading(false);
    }
  };

  const searchTimeoutRef = useRef(null);
  const isSearchChangeRef = useRef(false);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (typeModal === 3 && showModal) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      isSearchChangeRef.current = true;
      setPage(0);
      searchTimeoutRef.current = setTimeout(() => {
        getRepairmanSchedules(repairmanSearch, 0, rowsPerPage);
        isSearchChangeRef.current = false;
      }, 500);

      return () => {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
      };
    }
  }, [repairmanSearch, showModal, typeModal]);

  useEffect(() => {
    if (typeModal === 3 && showModal) {
      if (!isSearchChangeRef.current) {
        getRepairmanSchedules(repairmanSearch, page, rowsPerPage);
      }
    }
  }, [page]);

  const handleSelectSchedule = (item) => {
    setSelectedSchedule(item);
    if (item?.hourly_rate) setHourlyRateInput(String(item.hourly_rate));
    else setHourlyRateInput("");
    setDescriptionInput("");
  };

  const assignRepairman = async () => {
    if (!selectedSchedule) return errorMessage("تعمیرکاری انتخاب نشده است");
    const form_id = idForm ? idForm : formId;

    if (!form_id) return errorMessage("شناسه فرم موجود نیست");

    let estimated_end_time = null;
    try {
      if (selectedData.EstimatedRepairTime) {
        const d =
          selectedData.EstimatedRepairTime instanceof Date
            ? selectedData.EstimatedRepairTime
            : new Date(selectedData.EstimatedRepairTime);
        estimated_end_time = d.toISOString();
      }
    } catch (e) {
      estimated_end_time = null;
    }

    const payload = {
      form_id,
      repairman_id: selectedSchedule.repairman,
      estimated_end_time,
      hourly_rate: hourlyRateInput ? Number(hourlyRateInput) : null,
      description: descriptionInput,
    };

    try {
      setAssignLoading(true);
      const response = await apiClient.post(
        "/app/api/repairman-schedule/",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        successMessage("تعمیرکار با موفقیت برنامه‌ریزی شد.");
        getRepairmanSchedules(repairmanSearch, page, rowsPerPage);
        setShowModal(false);
      } else {
        errorMessage("خطا در ثبت برنامه تعمیرکار");
      }
    } catch (error) {
      errorMessage("خطا در ثبت برنامه تعمیرکار");
    } finally {
      setAssignLoading(false);
    }
  };

  useEffect(() => {
    if (dataform3.ExpertStatements) {
      getWagesPricerepairman();
    }
  }, [dataform3.ExpertStatements]);

  useEffect(() => {
    setContent("اظهارات مشتری:");
    getCustomerStatements();
    getExpertStatements();
    getRepairmanSchedules("", 0, rowsPerPage);
  }, []);

  useEffect(() => {
    if (idForm || formId) {
      getForm3Data();
    }
  }, [expertTexts]);

  return (
    <Grid
      size={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: { xs: "flex-start", md: "center" },
        gap: ".5rem",
      }}
    >
      <Modal showModal={showModal} setShowModal={handleToggleModal}>
        <div className={styles.top_modal}>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => setShowModal(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {typeModal === 1 ? (
          <MediaModal
            text={"افزودن عکس"}
            type={"image"}
            files={
              typeuser == "CustomerFile"
                ? dataform3.CustomerFile
                : dataform3.ExpertFile
            }
            setFiles={
              typeuser === "CustomerFile"
                ? (val) =>
                    setDataForm3((prev) => ({ ...prev, CustomerFile: val }))
                : (val) =>
                    setDataForm3((prev) => ({ ...prev, ExpertFile: val }))
            }
          />
        ) : typeModal === 2 ? (
          <>
            <MediaModal
              text={"افزودن صدا"}
              type={"voice"}
              files={
                typeuser == "CustomerVoice"
                  ? dataform3.CustomerVoice
                  : dataform3.ExpertVoice
              }
              setFiles={
                typeuser === "CustomerVoice"
                  ? (val) =>
                      setDataForm3((prev) => ({ ...prev, CustomerVoice: val }))
                  : (val) =>
                      setDataForm3((prev) => ({ ...prev, ExpertVoice: val }))
              }
            />
          </>
        ) : (
          <>
            <Box
              sx={{
                mb: 1,
                display: "flex",
                gap: ".5rem",
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="جستجوی تعمیرکار..."
                value={repairmanSearch}
                onChange={(e) => setRepairmanSearch(e.target.value)}
                InputProps={{ dir: "rtl" }}
                size="small"
              />
              {schedulesLoading && (
                <CircularProgress size={20} color="#00c494" />
              )}
            </Box>

            <TableCustom
              rows={allschedules}
              columns={columns}
              onChange={handleChangePage}
              page={page}
              rowsPerPage={rowsPerPage}
              total={totalSchedules}
              maxHeight={200}
            >
              {allschedules.length > 0 &&
                allschedules.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => handleSelectSchedule(item)}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedSchedule && selectedSchedule.id === item.id
                          ? "rgba(25,118,210,0.08)"
                          : "transparent",
                    }}
                  >
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {toFarsiNumber(item?.repairman_code)}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {toFarsiNumber(item?.repairman_name)}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {Array.isArray(item.repairman_specialties) &&
                      item.repairman_specialties.length > 0
                        ? item.repairman_specialties.map((t) => t).join(" / ")
                        : "Invalid data"}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {`${toFarsiNumber(item?.total_hours)} ساعت کار در روز`}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      {`${toFarsiNumber(item?.free_hours)}`}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                      <div
                        style={{
                          color: "#fff",
                          padding: "4px 10px",
                          borderRadius: "100px",
                        }}
                        className={` ${
                          item?.work_status === "free"
                            ? "free"
                            : item?.work_status === "in_repair"
                            ? "under"
                            : "hide"
                        }`}
                      >
                        {item?.work_status === "free"
                          ? "آزاد"
                          : item?.work_status === "in_repair"
                          ? "درحال تعمیر"
                          : "Hide"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableCustom>

            {selectedSchedule && (
              <Box
                sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily: "iranYekan",
                    fontSize: ".9rem",
                  }}
                >
                  {`تعمیرکار انتخاب شده: ${
                    selectedSchedule.repairman_name ||
                    selectedSchedule.repairman_full_name ||
                    selectedSchedule.repairman_name
                  }`}
                </Typography>
                <TextField
                  label="اجرت ساعتی"
                  placeholder="مثال: ۵۰۰۰۰"
                  value={hourlyRateInput}
                  onChange={(e) => setHourlyRateInput(e.target.value)}
                  size="small"
                  dir="rtl"
                  InputLabelProps={{
                    sx: {
                      right: 25,
                      left: "auto",
                      transformOrigin: "right",
                      "&.Mui-focused": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                      "&.MuiFormLabel-filled": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      pr: 1.5,
                    },
                    "& .MuiInputBase-input": {
                      textAlign: "right",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      textAlign: "right",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "primary.main",
                      },
                  }}
                />
                <TextField
                  label="توضیحات"
                  placeholder="شرح کار (مثال: تعمیر موتور)"
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  size="small"
                  rows={2}
                  dir="rtl"
                  InputLabelProps={{
                    sx: {
                      right: 25,
                      left: "auto",
                      transformOrigin: "right",
                      "&.Mui-focused": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                      "&.MuiFormLabel-filled": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": { pr: 1.5 },
                    "& .MuiInputBase-input": { textAlign: "right" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      textAlign: "right",
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: ".5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button2
                    type="button"
                    variant="outlined"
                    onClick={() => setSelectedSchedule(null)}
                  >
                    لغو
                  </Button2>
                  <Button2
                    type="button"
                    variant="contained"
                    onClick={assignRepairman}
                    disable={assignLoading}
                  >
                    {assignLoading ? <CircularProgress size={20} /> : "ارسال"}
                  </Button2>
                </Box>
              </Box>
            )}
          </>
        )}
      </Modal>

      <Typography
        display={{ xs: "block", md: "none" }}
        marginTop={{ xs: ".4rem", sm: ".5rem", md: ".6rem" }}
        fontSize={{ xs: ".9rem", sm: "1rem", md: "1.2rem" }}
        variant="body2"
        className={styles.title_page}
      >
        اظهارات مشتری:
      </Typography>
      <Grid
        className={styles.form3_container}
        size={{ xs: 12 }}
        padding={{
          xs: ".8rem .8rem",
          sm: ".9rem .9rem",
          md: "1rem",
          lg: "1.1rem",
          xl: "1.2rem",
          xxl: "1.3rem",
        }}
        width={{ xs: "100%", md: "98%", lg: "96%", xl: "94%", xxl: "92%" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <fieldset
          style={{ border: "none ", padding: 0, margin: 0, width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: { xs: "1.2rem", sm: "0.9rem", md: "1.2 rem" },
              width: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            {currentTab !== 4 && (
              <>
                <Grid
                  size={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "100%",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: "0.5rem", lg: "0" },
                  }}
                >
                  <Grid
                    size={{ xs: 12, sm: 6 }}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row", lg: "row" },
                      alignItems: { xs: "flex-end", sm: "flex-start" },
                      justifyContent: { xs: "center", lg: "flex-start" },
                      width: "100%",
                      gap: { xs: ".5rem" },
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                      size={{ xs: 12, sm: 11, md: 10, lg: 7 }}
                    >
                      <div className={styles.select_car_wrapper}>
                        <SelectDropDown2
                          icon={faAngleDown}
                          label={"اظهارات مشتری"}
                          items={customerTexts}
                          name="CustomerStatements"
                          placeHolder={"اظهارات مشتری را انتخاب  کنید."}
                          isDesirableValue={false}
                          onChange={handleChange}
                          value={dataform3.CustomerStatements}
                        />
                      </div>
                    </Grid>

                    <div style={{ display: "flex", gap: ".5rem" }}>
                      <UploaderButton
                        imageCount={dataform3.CustomerFile.length}
                        voiceCount={0}
                        type="CustomerFile"
                        setShowModal={setShowModal}
                        setTypeModal={setTypeModal}
                        setTypeUser={setTypeUser}
                        currentTab={currentTab}
                      />

                      <UploaderButton
                        imageCount={0}
                        voiceCount={dataform3.CustomerVoice.length}
                        type="CustomerVoice"
                        setShowModal={setShowModal}
                        setTypeModal={setTypeModal}
                        setTypeUser={setTypeUser}
                        currentTab={currentTab}
                      />
                    </div>
                  </Grid>
                  <Grid
                    size={{ xs: 12, sm: 6 }}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row", lg: "row" },
                      alignItems: { xs: "flex-end", sm: "flex-start" },
                      justifyContent: { xs: "center", lg: "flex-start" },
                      width: "100%",
                      gap: { xs: ".5rem" },
                    }}
                  >
                    <Grid
                      size={{ xs: 12, sm: 11, md: 10, lg: 7 }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <SearchAndSelectDropDwon
                        icon={faAngleDown}
                        label={"اظهارات کارشناس"}
                        items={expertTexts}
                        name="ExpertStatements"
                        placeHolder={"اظهار کارشناس را انتخاب کنید."}
                        isDesirableValue={false}
                        onChange={handleChange}
                        value={dataform3.ExpertStatements}
                      />
                    </Grid>

                    <div style={{ display: "flex", gap: ".5rem" }}>
                      <UploaderButton
                        imageCount={dataform3.ExpertFile.length}
                        voiceCount={0}
                        type="ExpertFile"
                        setShowModal={setShowModal}
                        setTypeModal={setTypeModal}
                        setTypeUser={setTypeUser}
                      />

                      <UploaderButton
                        imageCount={0}
                        voiceCount={dataform3.ExpertVoice.length}
                        type="ExpertVoice"
                        setShowModal={setShowModal}
                        setTypeModal={setTypeModal}
                        setTypeUser={setTypeUser}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid size={12} sx={{ marginTop: "2rem" }}>
                  <Button2
                    key={812}
                    type="button"
                    variant="contained"
                    icon={faPlus}
                    onClick={handleAddInvoiceItem}
                  >
                    افزودن اجرت جدید
                  </Button2>
                </Grid>
                <Grid
                  size={12}
                  className={`${styles.payComponent_wrapper} ${
                    dataform3.invoiceItems.length > 3 ? styles.scrollable : ""
                  }`}
                >
                  {dataform3.invoiceItems.map((item, index) => (
                    <PayRowComponent
                      key={index}
                      payItems={wages}
                      payValue={item.wages}
                      paySet={handlePayChange(index)}
                      priceValue={item.price}
                      priceSet={(value) =>
                        handleInvoiceItemChange(index, "price", value)
                      }
                      repairManItems={repairmen}
                      repairManValue={item.repairman}
                      repairManSet={handleRepairmanChange(index)}
                      disable={""}
                      onRemove={() => handleRemoveInvoiceItem(index)}
                      index={index}
                    />
                  ))}
                  <div ref={endRef} style={{ height: "100px" }} />
                </Grid>
                <Grid
                  size={12}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: { xs: "flex-start", sm: "center" },
                    width: "100%",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: "0.5rem" },
                  }}
                ></Grid>
                <Grid
                  size={12}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: { xs: "flex-start", sm: "end" },
                    width: "100%",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: "1.3rem" },
                  }}
                >
                  <Grid
                    size={{ xs: 12, sm: 5, md: 4, lg: 3, xxl: 2 }}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      className={styles.label_input_form3}
                      sx={{ marginBottom: { xs: "5px" } }}
                    >
                      {"تخمین زمان تعمیرکار"}
                    </Typography>
                    <DataInput
                      placeHolder="تخمین زمان تعمیر را انتخاب نمایید!"
                      value={selectedData.EstimatedRepairTime}
                      onChange={handleRepairTimeChange}
                    />
                  </Grid>
                  <Button2
                    key={814}
                    type="button"
                    variant="contained"
                    onClick={handleCliclOnRepairmanSchedule}
                  >
                    {"برنامه‌ریزی تعمیرکار"}
                  </Button2>
                </Grid>
                <Box sx={{ width: "100%" }}>
                  <Button2
                    type="button"
                    variant="contained"
                    icon={faCheck}
                    onClick={addToTable}
                  >
                    افزودن به جدول
                  </Button2>
                </Box>
              </>
            )}

            {selectedData.tableForm.length > 0 && (
              <Grid size={12}>
                <TableForm3
                  data={selectedData.tableForm}
                  deleteRow={deleteRow}
                  editRow={editRow}
                  currentTab={currentTab}
                />
              </Grid>
            )}
            {currentTab !== 4 && (
              <Grid
                size={12}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: "0.5rem" },
                }}
              >
                {!fromExpertReferral && (
                  <Button2
                    key={813}
                    type="button"
                    variant="contained"
                    icon={faUserTie}
                    onClick={postForm3Toexpert}
                    button_width={"button_width"}
                    disable={loading}
                  >
                    {"ارجاع به کارشناس"}
                  </Button2>
                )}
                <Button2
                  key={812}
                  type="button"
                  variant="outlined"
                  icon={faPen}
                  onClick={hadleClickOnGoesBack}
                  button_width={"button_width"}
                >
                  {fromExpertReferral ? "بازگشت" : "قبل"}
                </Button2>
                <Button2
                  key={811}
                  type="button"
                  variant="contained"
                  icon={loading ? "" : faCheck}
                  onClick={postForm3Data}
                  disable={loading}
                  button_width={"button_width"}
                >
                  {loading ? (
                    <CircularProgress size={"25.2px"} color="success" />
                  ) : (
                    "تایید"
                  )}
                </Button2>
              </Grid>
            )}
          </Box>
        </fieldset>
      </Grid>
      {loading.page && <LoadingForm />}
    </Grid>
  );
}

const PayRowComponent = ({
  disable = false,
  payItems = [],
  payValue,
  paySet,
  repairManItems = [],
  repairManValue,
  repairManSet,
  priceValue,
  priceSet,
  onRemove,
  index,
}) => {
  return (
    <Grid
      size={12}
      container
      rowSpacing={2}
      columnSpacing={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row", md: "row" },
        width: "100%",
        position: "relative",
        marginTop: "15px",
      }}
      className={`${styles.payComponent}`}
    >
      <Grid
        size={{ xs: 12, sm: 4, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          padding: { xs: "0 5px" },
        }}
      >
        <SearchAndSelectDropDwon
          icon={faAngleDown}
          label={"اجرت"}
          items={payItems}
          name="pay"
          placeHolder={"اجرت مدنظر را انتخاب نمایید!"}
          isDesirableValue={false}
          onChange={paySet}
          value={payValue}
        />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 4, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          padding: { xs: "0 5px" },
        }}
      >
        <div className={styles.input_container}>
          <InputPrice
            label="قیمت محصول"
            value={priceValue}
            onChange={priceSet}
            name="price"
            maxLength={30}
          />
        </div>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 4, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          padding: { xs: "0 5px" },
        }}
      >
        <SearchAndSelectDropDwon
          icon={faAngleDown}
          label={"تعمیرکار"}
          items={repairManItems}
          name="repairman"
          placeHolder={"تعمیرکار مدنظر را انتخاب کنید!"}
          isDesirableValue={false}
          onChange={repairManSet}
          value={repairManValue}
        />
      </Grid>
      {index > 0 && (
        <div className={styles.deleteIconWrapper}>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={onRemove}
            className={"deleteIcon"}
          />
        </div>
      )}
    </Grid>
  );
};

const UploaderButton = ({
  imageCount,
  voiceCount,
  type,
  setShowModal,
  setTypeModal,
  setTypeUser,
  currentTab,
}) => {
  const isVoice = type.toLowerCase().includes("voice");
  const isFile = type.toLowerCase().includes("file");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: ".5rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isVoice && (
          <Typography
            className={styles.uploadIcon}
            onClick={() => {
              if (currentTab !== 4) {
                setTypeModal(2);
                setShowModal(true);
                setTypeUser(type);
              }
            }}
          >
            {`(${voiceCount}) `}
            <FontAwesomeIcon icon={faFileAudio} />
          </Typography>
        )}
        {isFile && (
          <Typography
            className={styles.uploadIcon}
            onClick={() => {
              if (currentTab !== 4) {
                setTypeModal(1);
                setShowModal(true);
                setTypeUser(type);
              }
            }}
          >
            {`(${imageCount}) `}
            <FontAwesomeIcon icon={faFileImage} />
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AcceptenceForm3;
