import { useState, useEffect } from "react";
import styles from "./ManagementStyles.module.css";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import { ToastContainerCustom } from "../../Components/Modules/Toast/ToastCustom";
import { errorMessage } from "../../Components/Modules/Toast/ToastCustom";
import ReactDropdown from "../../Components/Modules/ReactDropdown/ReactDropdown";
import Modal from "../../Components/Modules/Modal/Modal";
import AddAndEditEquipment from "./ManagementsModals/AddAndEditEquipment";
import AddAndEditHalls from "./ManagementsModals/AddAndEditHalls";
import AddAndEditRepairman from "./ManagementsModals/AddAndEditRepairman";
import AddAndEditUserModal from "./ManagementsModals/AddAndEditUserModal";
import DeleteError from "./ManagementsModals/DeleteError";
import Input from "../../Components/Modules/Input/Input";
import Button2 from "../../Components/Modules/Button2/Button2";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import LoadingForm from "../../Components/Modules/Loading/LoadingForm";

import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Button, TableCell, TableRow } from "@mui/material";

import {
  faPlus,
  faMagnifyingGlass,
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../config/axiosConfig";
import Button3 from "../../Components/Modules/Button3/Button3";
import { toFarsiNumber } from "../../utils/helper";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function ManagementPage() {
  const [tabInformation, setTabInformation] = useState([]);
  const [filterRows, setFilterRows] = useState([]);
  const [selectedRowInfo, setSelectedRowInfo] = useState(item1);
  const [tab, setTab] = useState(1);
  const [modal, setModal] = useState(false);
  const [operation, setOperation] = useState("add");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const handleChange = (newValue) => {
    setTab(newValue);
  };
  const handleToggleModal = () => {
    setModal((modal) => !modal);
  };
  const handleRebuildAndToggleModal = () => {
    setModal(false);
    fetchTabData(tab);
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeSearchField = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);
    let filterProducts;
    if (tab === 0) {
      filterProducts = tabInformation.filter(
        (item) =>
          item.code?.includes(searchTerm) ||
          item.name?.toLowerCase().includes(searchTerm) ||
          item.descriptions?.includes(searchTerm)
      );
    } else if (tab === 1) {
      //code, full name, expertice, halls name
      filterProducts = tabInformation.filter(
        (item) =>
          item.id?.toString().includes(searchTerm) ||
          item.full_name?.toLowerCase().includes(searchTerm) ||
          item.type
            ?.map((exp) => exp.type)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm) ||
          item.salon
            ?.map((hall) => hall.name)
            .join(",")
            .includes(searchTerm)
      );
    } else if (tab === 2) {
      //code, name, halls name, description
      filterProducts = tabInformation.filter(
        (item) =>
          item.code?.includes(searchTerm) ||
          item.name?.includes(searchTerm) ||
          item.salon?.name.toLowerCase().includes(searchTerm) ||
          item.descriptions?.includes(searchTerm)
      );
    } else if (tab === 3) {
      //full name, expertice, national code, phone number
      filterProducts = tabInformation.filter(
        (item) =>
          item.type
            ?.map((exp) => exp.type)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm) ||
          item.full_name?.includes(searchTerm) ||
          item.national_code?.includes(searchTerm) ||
          item.phone_number?.includes(searchTerm)
      );
    }
    setFilterRows(filterProducts);
  };

  const fetchTabData = async (tab) => {
    try {
      let response = null;
      if (tab === 0) {
        response = await apiClient.get(`/app/get-all-salon/`);
        if (response.status === 200) {
          setTabInformation(response.data);
          setFilterRows(response.data);
        }
      } else if (tab === 1) {
        response = await apiClient.get(`/app/add-repairman/`);
        if (response.status === 200) {
          setTabInformation(response.data.users);
          setFilterRows(response.data.users);
        }
      } else if (tab === 2) {
        response = await apiClient.get(`/app/equipment/`);
        if (response.status === 200) {
          setTabInformation(response.data);
          setFilterRows(response.data);
        }
      } else if (tab === 3) {
        response = await apiClient.get(`/app/add-user/`);
        if (response.status === 200) {
          setTabInformation(response.data.users);
          setFilterRows(response.data.users);
        }
      }
    } catch (error) {
      errorMessage("خطا در برقراری ارتباط با سرور");
      setTabInformation([]);
      setFilterRows([]);
    }
  };
  const handleOpenModal = (chosenItem = null, operation = "add") => {
    setSelectedRowInfo(chosenItem);
    setOperation(operation);
    handleToggleModal();
  };
  useEffect(() => {
    fetchTabData(tab);
    handleChangePage(0);
    setFilterRows(undefined);
  }, [tab]);

  return (
    <Grid className="content-conatiner">
      <Modal showModal={modal} setShowModal={handleToggleModal}>
        {tab === 0 ? (
          operation === "add" ? (
            <AddAndEditHalls
              modal={modal}
              tab={tab}
              toggleModal={handleToggleModal}
              handleToggleUpdate={handleRebuildAndToggleModal}
              action="add"
              infoItem={selectedRowInfo}
            />
          ) : operation === "edit" ? (
            <AddAndEditHalls
              modal={modal}
              tab={tab}
              toggleModal={handleToggleModal}
              handleToggleUpdate={handleRebuildAndToggleModal}
              action="edit"
              infoItem={selectedRowInfo}
            />
          ) : operation === "delete" ? (
            <DeleteError
              handleToggleUpdate={handleRebuildAndToggleModal}
              toggleModal={handleToggleModal}
              type="hall"
              infoItem={selectedRowInfo}
            />
          ) : (
            <></>
          )
        ) : tab === 1 ? (
          operation === "add" ? (
            <AddAndEditRepairman
              modal={modal}
              tab={tab}
              toggleModal={handleToggleModal}
              handleToggleUpdate={handleRebuildAndToggleModal}
              action="add"
              infoItem={selectedRowInfo}
            />
          ) : operation === "edit" ? (
            <AddAndEditRepairman
              modal={modal}
              tab={tab}
              toggleModal={handleToggleModal}
              handleToggleUpdate={handleRebuildAndToggleModal}
              action="edit"
              infoItem={selectedRowInfo}
            />
          ) : operation === "delete" ? (
            <DeleteError
              handleToggleUpdate={handleRebuildAndToggleModal}
              toggleModal={handleToggleModal}
              type="repairman"
              infoItem={selectedRowInfo}
            />
          ) : (
            <></>
          )
        ) : tab === 2 ? (
          operation === "add" ? (
            <AddAndEditEquipment
              modal={modal}
              tab={tab}
              toggleModal={handleToggleModal}
              handleToggleUpdate={handleRebuildAndToggleModal}
              action="add"
              infoItem={selectedRowInfo}
            />
          ) : operation === "edit" ? (
            <AddAndEditEquipment
              modal={modal}
              tab={tab}
              toggleModal={handleToggleModal}
              handleToggleUpdate={handleRebuildAndToggleModal}
              action="edit"
              infoItem={selectedRowInfo}
            />
          ) : operation === "delete" ? (
            <DeleteError
              handleToggleUpdate={handleRebuildAndToggleModal}
              toggleModal={handleToggleModal}
              type="equipment"
              infoItem={selectedRowInfo}
            />
          ) : (
            <></>
          )
        ) : tab === 3 ? (
          operation === "add" ? (
            <AddAndEditUserModal
              modal={modal}
              tab={tab}
              toggleModal={handleToggleModal}
              handleToggleUpdate={handleRebuildAndToggleModal}
              action="add"
              infoItem={selectedRowInfo}
            />
          ) : operation === "edit" ? (
            <AddAndEditUserModal
              modal={modal}
              tab={tab}
              toggleModal={handleToggleModal}
              handleToggleUpdate={handleRebuildAndToggleModal}
              action="edit"
              infoItem={selectedRowInfo}
            />
          ) : operation === "delete" ? (
            <DeleteError
              handleToggleUpdate={handleRebuildAndToggleModal}
              toggleModal={handleToggleModal}
              type="user"
              infoItem={selectedRowInfo}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Modal>
      <SideBar />
      <ToastContainerCustom />
      <Grid
        item
        size={{ xs: 12 }}
        container
        sx={{
          width: "100%",
        }}
        minWidth={100}
        gap={{
          xs: "0.5rem",
          sm: "0.7rem",
          md: "1rem",
          lg: "1.5rem",
          xl: "2rem",
        }}
        className={`space-content scroll-contant`}
      >
        <Header title={"مدیریت:"} disabledButton={true} />
        <Grid
          item
          container
          size={12}
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: { sm: "center", md: "flex-start" },
            alignItems: "center",
            width: "100%",
            gap: { sm: "1rem", md: "1.2rem", lg: "1.4rem" },
          }}
        >
          {tabHeaders.map((item, index) => (
            <Button
              onClick={() => handleChange(item.value)}
              aria-label={item.tabNameEn}
              key={index}
              variant="contained"
              className={` ${
                tab === item.value ? styles.active_btn : styles.manual_btn
              }`}
            >
              {item.label}
            </Button>
          ))}
        </Grid>
        <Grid
          item
          container
          size={12}
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ReactDropdown
            optionsProp={tabHeaders}
            handleChange={handleChange}
            mainValue={tab}
          />
        </Grid>
        <Grid
          item
          container
          size={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          gap={{ xs: "1.5rem", md: "0" }}
        >
          <Grid
            item
            size={{ xs: 12, sm: 6, md: 5, lg: 4, xl: 3, xxl: 2 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              paddingTop: { xs: "0.5rem", sm: "0.8rem", md: 0 },
            }}
          >
            <Input
              name={"admission_number_input"}
              styled={"admission_number_input"}
              placeholder="جستجو"
              icon={faMagnifyingGlass}
              value={searchInput}
              onChange={handleChangeSearchField}
            />
          </Grid>
          <Grid
            item
            container
            size={{ xs: 12, md: 7, lg: 8, xl: 9, xxl: 10 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "flex-start",
                sm: "center",
                md: "flex-end",
              },
              width: "100%",
            }}
          >
            <Button2
              icon={faPlus}
              style={"search_btn"}
              onClick={() => handleOpenModal(item1, "add")}
            >
              {tab === 0
                ? "تعریف سالن جدید"
                : tab === 1
                ? "تعریف تعمیرکار جدید"
                : tab === 2
                ? "تعریف تجهیزات جدید"
                : tab === 3
                ? "تعریف کاربر جدید"
                : ""}
            </Button2>
          </Grid>
          <Box sx={{ width: "100%" }}>
            <CustomTabPanel value={tab} index={0}>
              {filterRows === undefined ? (
                <LoadingForm />
              ) : (
                <InfoTabel
                  tableInformation={filterRows}
                  page={page}
                  handleChange={handleChangePage}
                  totalRows={filterRows.length}
                  pageLength={rowsPerPage}
                  columnsTitle={halls_columns}
                  key={21}
                >
                  {filterRows.length > 0 ? (
                    filterRows
                      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                      .map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? "#fff" : "#f2f2f2",
                            fontFamily: "iranYekan",
                          }}
                        >
                          <TableCell
                            align={"center"}
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(row.code)}
                          </TableCell>
                          <TableCell
                            align={"center"}
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(row.name)}
                          </TableCell>

                          <TableCell
                            align={"center"}
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {`${toFarsiNumber(row.remaining_capacity)} ساعت`}
                          </TableCell>

                          <TableCell
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              fontFamily: "iranYekan",
                              padding: "19px",
                            }}
                          >
                            <div
                              className={`${styles.status_btn_halls} ${
                                row.status === true
                                  ? styles.status_halls_one
                                  : row.status === false
                                  ? styles.status_halls_two
                                  : styles.status_halls_defualt
                              }`}
                            >
                              {row.status === true
                                ? "فعال"
                                : row.status === false
                                ? "غیرفعال"
                                : "نامشخص"}
                            </div>
                          </TableCell>

                          <TableCell
                            align={"center"}
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(row.descriptions)}
                          </TableCell>

                          <TableCell
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "row",
                              gap: "1rem",
                              padding: "18px 10px",
                            }}
                          >
                            <Button3
                              icon={faPencil}
                              variant="contained"
                              style={"edit_delete_btn"}
                              onClick={() => handleOpenModal(row, "edit")}
                            />
                            <Button3
                              icon={faTrashCan}
                              variant="contained"
                              style={"edit_delete_btn"}
                              onClick={() => handleOpenModal(row, "delete")}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <></>
                  )}
                </InfoTabel>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
              {filterRows === undefined ? (
                <LoadingForm />
              ) : (
                <InfoTabel
                  tableInformation={filterRows}
                  page={page}
                  handleChange={handleChangePage}
                  totalRows={filterRows.length}
                  pageLength={rowsPerPage}
                  columnsTitle={repairman_columns}
                  key={22}
                >
                  {filterRows.length > 0 ? (
                    filterRows
                      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                      .map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? "#fff" : "#f2f2f2",
                            fontFamily: "iranYekan",
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(row.full_name)}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {Array.isArray(row.type) && row.type.length > 0
                              ? row.type.map((t) => t.type).join(" / ")
                              : "Invalid data"}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {`${toFarsiNumber(row.work_time)} ساعت کار در روز`}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              fontFamily: "iranYekan",
                              padding: "19px",
                            }}
                          >
                            <div
                              className={`${styles.status_btn_halls} ${
                                row.status === true
                                  ? styles.status_halls_one
                                  : row.status === false
                                  ? styles.status_halls_two
                                  : styles.status_halls_defualt
                              }`}
                            >
                              {row.status === true
                                ? "فعال"
                                : row.status === false
                                ? "غیرفعال"
                                : "نامشخص"}
                            </div>
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(
                              Array.isArray(row.salon) && row.salon.length > 0
                                ? row.salon.map((s) => s.name).join(" / ")
                                : "اطلاعاتی موجود نیست"
                            )}
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "row",
                              gap: "1rem",
                              padding: "18px 10px",
                            }}
                          >
                            <Button3
                              icon={faPencil}
                              variant="contained"
                              style={"edit_delete_btn"}
                              onClick={() => handleOpenModal(row, "edit")}
                            />
                            <Button3
                              icon={faTrashCan}
                              variant="contained"
                              style={"edit_delete_btn"}
                              onClick={() => handleOpenModal(row, "delete")}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <></>
                  )}
                </InfoTabel>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={2}>
              {filterRows === undefined ? (
                <LoadingForm />
              ) : (
                <InfoTabel
                  tableInformation={filterRows}
                  page={page}
                  handleChange={handleChangePage}
                  totalRows={filterRows.length}
                  pageLength={rowsPerPage}
                  columnsTitle={equipment_columns}
                  key={23}
                >
                  {filterRows.length > 0 ? (
                    filterRows
                      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                      .map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? "#fff" : "#f2f2f2",
                            fontFamily: "iranYekan",
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(row.code)}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(row.name)}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(row.salon?.name)}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              fontFamily: "iranYekan",
                              padding: "19px",
                            }}
                          >
                            <div
                              className={`${styles.status_btn_halls} ${
                                row.status === true
                                  ? styles.status_halls_one
                                  : row.status === false
                                  ? styles.status_halls_two
                                  : styles.status_halls_defualt
                              }`}
                            >
                              {row.status === true
                                ? "فعال"
                                : row.status === false
                                ? "غیرفعال"
                                : "نامشخص"}
                            </div>
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {toFarsiNumber(row.descriptions)}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "row",
                              gap: "1rem",
                              padding: "18px 10px",
                            }}
                          >
                            <Button3
                              icon={faPencil}
                              onClick={() => handleOpenModal(row, "edit")}
                            />
                            <Button3
                              icon={faTrashCan}
                              onClick={() => handleOpenModal(row, "delete")}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <></>
                  )}
                </InfoTabel>
              )}
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ManagementPage;

export function InfoTabel({
  tableInformation = [],
  handleChange,
  page = 0,
  pageLength = 10,
  totalRows,
  columnsTitle,
  children,
}) {
  return (
    <Grid
      container
      item
      size={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {tableInformation === undefined ? (
        <LoadingForm />
      ) : (
        <TableCustom
          rows={tableInformation}
          columns={columnsTitle}
          onChange={handleChange}
          page={page}
          rowsPerPage={pageLength}
          total={totalRows}
          maxHeight={"500px"}
        >
          {children}
        </TableCustom>
      )}
    </Grid>
  );
}

const tabHeaders = [
  {
    value: 1,
    label: "برنامه‌ریزی تعمیرکار",
    tabNameEn: "Repairman Scheduling",
  },
  { value: 2, label: "تجهیزات", tabNameEn: "Equipment" },
  { value: 0, label: "سالن‌ها", tabNameEn: "Halls" },
];

const item1 = {
  name: "Halls",
};

const halls_columns = [
  "کد",
  "نام سالن",
  "مانده ظرفیت",
  "وضعیت",
  "توضیحات",
  "عملیات",
];
const repairman_columns = [
  "کد",
  "نام تعمیرکار",
  "تخصص تعمیرکار",
  " قابلیت زمانی تعمیرکار",
  "وضعیت",
  "نام سالن",
  "عملیات",
];
const equipment_columns = [
  "کد",
  "نام تجهیزات",
  "نام سالن",
  "وضعیت",
  "توضیحات",
  "عملیات",
];

// const userColumns = [
//   "ردیف",
//   "نام کاربر",
//   "نقش کاربر",
//   "کد ملی",
//   "وضعیت",
//   "شماره تماس",
//   "عملیات",
// ];

{
  /* <CustomTabPanel value={tab} index={3}>
              {filterRows === undefined ? (
                <LoadingForm />
              ) : (
                <InfoTabel
                  tableInformation={filterRows}
                  page={page}
                  handleChange={handleChangePage}
                  totalRows={filterRows.length}
                  pageLength={rowsPerPage}
                  columnsTitle={userColumns}
                  key={24}
                >
                  {filterRows.length > 0 ? (
                    filterRows
                      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                      .map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? "#fff" : "#f2f2f2",
                            fontFamily: "iranYekan",
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {++index}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {row.full_name}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {Array.isArray(row.type) && row.type.length > 0
                              ? row.type.map((t) => t.type).join(" / ")
                              : "Invalid data"}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {row.national_code}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              fontFamily: "iranYekan",
                              padding: "19px",
                            }}
                          >
                            <div
                              className={`${styles.status_btn_halls} ${
                                row.status === true
                                  ? styles.status_halls_one
                                  : row.status === false
                                  ? styles.status_halls_two
                                  : styles.status_halls_defualt
                              }`}
                            >
                              {row.status === true
                                ? "فعال"
                                : row.status === false
                                ? "غیرفعال"
                                : "نامشخص"}
                            </div>
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{ fontFamily: "iranYekan" }}
                          >
                            {row.phone_number}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "row",
                              gap: "1rem",
                              padding: "18px 10px",
                            }}
                          >
                            <Button3
                              icon={faPencil}
                              onClick={() => handleOpenModal(row, "edit")}
                            />
                            <Button3
                              icon={faTrashCan}
                              onClick={() => handleOpenModal(row, "delete")}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <></>
                  )}
                </InfoTabel>
              )}
            </CustomTabPanel> */
}
