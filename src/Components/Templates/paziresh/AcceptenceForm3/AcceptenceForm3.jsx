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

//Mui Components
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
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

function AcceptenceForm3({
  nextTab = () => {},
  setContent = () => {},
  prevTab = () => {},
  formId = "",
}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { dataForm, setDataForm } = useContext(MyContext);
  const endRef = useRef(null);

  const [dataform3, setDataForm3] = useState({
    CustomerStatements: "",
    CustomerFile: [],
    CustomerVoice: [],
    ExpertStatements: "",
    ExpertFile: [],
    ExpertVoice: [],
    invoiceItems: [{ wages: "", price: "", repairman: "" }],
  });

  const [selectedData, setSelectedData] = useState({
    customer: formId,
    tableForm: [],
    EstimatedRepairTime: "",
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

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };

  const hadleClickOnGoesBack = () => {
    prevTab();
  };

  const handleClickOnSendToExperts = () => {};

  const handleCliclOnRepairmanSchedule = () => {};

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

  const handleChange = (field, value) => {
    setDataForm3((prev) => ({
      ...prev,
      [field]: value,
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
    if (
      !dataform3.CustomerStatements.trim() ||
      dataform3.ExpertStatements === ""
    ) {
      errorMessage("لطفاً اظهارات مشتری و کارشناس را وارد کنید.");
      return;
    }

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
      errorMessage(error?.response?.message || "خطا در دریافت داده‌ها");
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
      errorMessage(error?.response?.message || "خطا در دریافت داده‌ها");
    }
  };

  const postForm3Data = async () => {
    if (!selectedData.tableForm.length || !selectedData.EstimatedRepairTime) {
      errorMessage("لطفا فرم را تکمیل کنید");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post(
        `/app/submit-repair-form/${formId}`,
        selectedData
      );

      if (response.status === 200) {
        nextTab();
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
      errorMessage(error?.response?.message || "خطا در دریافت داده‌ها");
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
      const response = await apiClient.get(`/app/submit-repair-form/${formId}`);

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

            return {
              ...item,
              CustomerFile,
              ExpertFile,
              CustomerVoice,
              ExpertVoice,
            };
          })
        );

        setSelectedData({
          ...rest,
          tableForm: newTableForm,
          EstimatedRepairTime: miladiDate,
        });
      }
    } catch (error) {
      errorMessage(error?.response?.message || "خطا در دریافت داده‌ها");
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
    getForm3Data();
  }, []);

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
          <></>
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
        <Box
          component="form"
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
                />

                <UploaderButton
                  imageCount={0}
                  voiceCount={dataform3.CustomerVoice.length}
                  type="CustomerVoice"
                  setShowModal={setShowModal}
                  setTypeModal={setTypeModal}
                  setTypeUser={setTypeUser}
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
          >
            <Button2
              type="button"
              variant="contained"
              icon={faCheck}
              onClick={addToTable}
            >
              تایید
            </Button2>
          </Grid>
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
          {selectedData.tableForm.length > 0 && (
            <Grid size={12}>
              <TableForm3
                data={selectedData.tableForm}
                deleteRow={deleteRow}
                editRow={editRow}
              />
            </Grid>
          )}
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
            <Button2
              key={813}
              type="button"
              variant="contained"
              icon={faUserTie}
              style={"width"}
              onClick={handleClickOnSendToExperts}
            >
              {"ارجاع به کارشناس"}
            </Button2>
            <Button2
              key={812}
              type="button"
              variant="outlined"
              icon={faPen}
              onClick={hadleClickOnGoesBack}
              style={"width"}
            >
              {"قبل"}
            </Button2>
            <Button2
              key={811}
              type="button"
              variant="contained"
              icon={loading ? "" : faCheck}
              onClick={postForm3Data}
              disable={loading}
              style={"width"}
            >
              {loading ? (
                <CircularProgress size={"25.2px"} color="success" />
              ) : (
                "تایید"
              )}
            </Button2>
          </Grid>
        </Box>
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
              setTypeModal(2);
              setShowModal(true);
              setTypeUser(type);
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
              setTypeModal(1);
              setShowModal(true);
              setTypeUser(type);
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

// const getForm3Data = async () => {
//   try {
//     const response = await apiClient.get(`/app/submit-repair-form/${39}`);

//     if (response.status === 200) {
//       console.log(response.data);
//       const { EstimatedRepairTime, ...rest } = response.data;

//       const miladiDate = EstimatedRepairTime
//         ? new DateObject({
//             date: EstimatedRepairTime,
//             format: "YYYY/MM/DD HH:mm",
//             calendar: persian,
//             locale: persian_fa,
//           })
//             .convert("gregorian")
//             .toDate()
//         : "";

//       setSelectedData({
//         ...rest,
//         EstimatedRepairTime: miladiDate,
//       });
//     }
//   } catch (error) {
//     errorMessage(error?.response?.message || "خطا در دریافت داده‌ها");
//   }
// };
