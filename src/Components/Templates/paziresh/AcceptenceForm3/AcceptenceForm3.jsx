import { useEffect, useRef, useState } from "react";
import styles from "./AcceptenceForm3.module.css";
import moment from "jalali-moment";
//Other Components
import {
  errorMessage,
  successMessage,
  warningMessage,
  infoMessage,
} from "../../../Modules/Toast/ToastCustom";
import LoadingForm from "../../../Modules/Loading/LoadingForm";
import Modal from "../../../Modules/Modal/Modal";
import Button2 from "../../../Modules/Button2/Button2";
import DataInput from "../../../Modules/DataInput/DataInput";
import SelectDropDown from "../../../Modules/SelectDropDown/SelectDropDown";

//Mui Components
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

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

import {
  formatWithThousandSeparators,
  toEnglishNumber,
  toFarsiNumber,
} from "../../../../utils/helper";
import TableForm3 from "../../../Modules/TableForm3/TableForm3";
import MediaModal from "../../../Modules/MediaModal/MediaModal";

function AcceptenceForm3({ nextTab, prevTab, setContent, customer }) {
  const endRef = useRef(null);

  const [dataform3, setDataForm3] = useState({
    CustomerStatements: "",
    CustomerFile: [],
    CustomerVoice: [],
    ExpertStatements: "",
    ExpertFile: [],
    ExpertVoice: [],
    invoiceItems: [{ wages: "", price: "", repairman: "" }],
    EstimatedRepairTime: "",
  });

  const [selectedData, setSelectedData] = useState({
    tableForm: [],
    EstimatedRepairTime: "",
  });

  const [loading, setLoading] = useState({ page: false, finalForm: false });
  const [showModal, setShowModal] = useState(true);
  const [typeModal, setTypeModal] = useState(1);

  const handleToggleModal = () => {
    setShowModal((modal) => !modal);
  };
  const handleSubmitForm = async () => {};
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
    setDataForm3((prev) => ({
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
    handleInvoiceItemChange(index, "wages", value);
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
      dataform3.invoiceItems.some(
        (item) =>
          item.wages === "" || item.price === "" || item.repairman === ""
      )
    ) {
      errorMessage(
        "لطفاً تمام فیلدهای آیتم‌های فاکتور را به‌طور کامل پر کنید."
      );
      return;
    }

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

    setDataForm3({
      CustomerStatements: "",
      CustomerFile: [],
      CustomerVoice: [],
      ExpertStatements: "",
      ExpertFile: [],
      ExpertVoice: [],
      invoiceItems: [{ wages: "", price: "", repairman: "" }],
    });

    successMessage("اطلاعات با موفقیت اضافه شد.");
  };

  useEffect(() => {
    setContent("اظهارات مشتری:");
  }, []);

  console.log(dataform3);

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
            files={dataform3.CustomerFile}
            setFiles={(val) =>
              setDataForm3((prev) => ({ ...prev, CustomerFile: val }))
            }
          />
        ) : typeModal === 2 ? (
          <>
            <MediaModal
              text={"افزودن صدا"}
              type={"voice"}
              files={dataform3.CustomerVoice}
              setFiles={(val) =>
                setDataForm3((prev) => ({ ...prev, CustomerVoice: val }))
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
                flexDirection: { xs: "column", lg: "row" },
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
                <SelectDropDown
                  icon={faAngleDown}
                  label={"اظهارات مشتری"}
                  items={[
                    { value_id: "اظهارات مشتری 1", value: "اظهارات مشتری 1" },
                    { value_id: "اظهارات مشتری 2", value: "اظهارات مشتری 2" },
                  ]}
                  name="CustomerStatements"
                  placeHolder={"اظهارات مشتری را انتخاب  کنید."}
                  isDesirableValue={true}
                  key={724}
                  onChange={handleChange}
                  value={dataform3.CustomerStatements}
                />
              </Grid>

              <UploaderButton
                imageCount={dataform3.CustomerFile.length}
                voiceCount={0}
                type="CustomerFile"
                setShowModal={setShowModal}
                setTypeModal={setTypeModal}
              />

              <UploaderButton
                imageCount={0}
                voiceCount={dataform3.CustomerVoice.length}
                type="CustomerVoice"
                setShowModal={setShowModal}
                setTypeModal={setTypeModal}
              />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 6 }}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
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
                <SelectDropDown
                  icon={faAngleDown}
                  label={"اظهارات کارشناس"}
                  items={[
                    { value_id: 1, value: "اظهارات کارشناس 1" },
                    { value_id: 2, value: "اظهارات کارشناس 2" },
                  ]}
                  name="ExpertStatements"
                  placeHolder={"اظهار کارشناس را انتخاب کنید."}
                  isDesirableValue={false}
                  onChange={handleChange}
                  value={dataform3.ExpertStatements}
                />
                {/* {errors.expert_statements_text && (
                  <Typography
                    className={styles.error_subtitle_form3}
                    sx={{ marginTop: { xs: "4px" } }}
                  >
                    {errors.expert_statements_text}
                  </Typography>
                )} */}
              </Grid>
              <UploaderButton
                imageCount={dataform3.ExpertFile.length}
                voiceCount={0}
                type="ExpertFile"
                setShowModal={setShowModal}
                setTypeModal={setTypeModal}
              />

              <UploaderButton
                imageCount={0}
                voiceCount={dataform3.ExpertVoice.length}
                type="ExpertVoice"
                setShowModal={setShowModal}
                setTypeModal={setTypeModal}
              />
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
          <Grid size={12} className={styles.payComponent_wrapper}>
            {dataform3.invoiceItems.map((item, index) => (
              <PayRowComponent
                key={index}
                payItems={[
                  { value_id: 1, value: "اجرت 1" },
                  { value_id: 2, value: "اجرت 2" },
                ]}
                payValue={item.wages}
                paySet={handlePayChange(index)}
                priceValue={item.price}
                priceSet={(value) =>
                  handleInvoiceItemChange(index, "price", value)
                }
                repairManItems={[
                  { value_id: 1, value: "تعمیرکار 1" },
                  { value_id: 2, value: "تعمیرکار 2" },
                ]}
                repairManValue={item.repairman}
                repairManSet={handleRepairmanChange(index)}
                disable={""}
                onRemove={() => handleRemoveInvoiceItem(index)}
                index={index}
              />
            ))}
            {/* <div ref={endRef} /> */}
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
                value={dataform3.EstimatedRepairTime}
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
          {selectedData.tableForm.length > 0 && (
            <Grid size={12}>
              <TableForm3 data={selectedData.tableForm} />
            </Grid>
          )}
          <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: "0.5rem", sm: "0" },
            }}
          >
            <Grid
              order={{ xs: 1, sm: 2 }}
              size={{ xs: 12, sm: 6, md: 2, xxl: 3 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
                alignItems: "center",
                gap: { xs: "1rem", sm: ".5rem" },
              }}
            >
              <Button2
                key={812}
                type="button"
                variant="outlined"
                icon={faPen}
                onClick={hadleClickOnGoesBack}
                style={"outline_btn"}
              >
                {"قبل"}
              </Button2>
              <Button2
                key={811}
                type="button"
                variant="contained"
                icon={loading.finalForm ? "" : faCheck}
                onClick={handleSubmitForm}
                disable={loading.finalForm}
                style={"add_btn"}
              >
                {loading.finalForm ? (
                  <CircularProgress size={"25.2px"} color="success" />
                ) : (
                  "تایید"
                )}
              </Button2>
            </Grid>
            <Grid
              order={{ xs: 2, sm: 1 }}
              size={{ xs: 12, sm: 6, md: 5, lg: 7, xl: 8, xxl: 9 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
                alignItems: "center",
                paddingLeft: { xs: "0", sm: ".5rem" },
              }}
            >
              <Button2
                key={813}
                type="button"
                variant="contained"
                icon={faUserTie}
                style={"add_btn"}
                onClick={handleClickOnSendToExperts}
              >
                {"ارجاع به کارشناس"}
              </Button2>
            </Grid>
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
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        position: "relative",
        marginTop: "15px",
      }}
      className={styles.payComponent}
    >
      <Grid
        size={{ xs: 12, sm: 8, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          padding: { xs: "0 5px" },
        }}
      >
        <SelectDropDown
          icon={faAngleDown}
          label={"اجرت"}
          items={payItems}
          name="pay"
          disable={disable}
          placeHolder={"اجرت مدنظر را انتخاب نمایید!"}
          onChange={paySet}
          value={payValue}
          key={721}
        />
        {/* {payError && (
          <Typography
            className={styles.error_subtitle_form3}
            sx={{ marginTop: { xs: "4px" } }}
          >
            {payError}
          </Typography>
        )} */}
      </Grid>
      <Grid
        size={{ xs: 12, sm: 8, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          padding: { xs: "0 5px" },
        }}
      >
        <div className={`input-container`} style={{ width: "198px" }}>
          <label htmlFor={"تخمین قیمت"} className="label_input ">
            تخمین قیمت
          </label>
          <div className="input_content_wrapper" style={{ marginTop: ".5rem" }}>
            <input
              name={"price"}
              type={"text"}
              placeholder={" قیمت"}
              value={toFarsiNumber(formatWithThousandSeparators(priceValue))}
              onChange={(e) => {
                const englishNumber = toEnglishNumber(
                  e.target.value.replace(/,/g, "")
                );

                priceSet(englishNumber);
              }}
              className="input_form"
              autoComplete="off"
              maxLength={30}
            />
          </div>
        </div>
        {/* {priceError && (
          <Typography
            className={styles.error_subtitle_form3}
            sx={{ marginTop: { xs: "4px" } }}
          >
            {priceError}
          </Typography>
        )} */}
      </Grid>
      <Grid
        size={{ xs: 12, sm: 8, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          padding: { xs: "0 5px" },
        }}
      >
        <SelectDropDown
          icon={faAngleDown}
          label={"تعمیرکار"}
          items={repairManItems}
          name="repairman"
          disable={disable}
          placeHolder={"تعمیرکار مدنظر را انتخاب کنید!"}
          onChange={repairManSet}
          value={repairManValue}
          key={723}
        />
        {/* {repairManError && (
          <Typography
            className={styles.error_subtitle_form3}
            sx={{ marginTop: { xs: "4px" } }}
          >
            {repairManError}
          </Typography>
        )} */}
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

// onUpload={(file, type) => handleUpload(type, file)}
