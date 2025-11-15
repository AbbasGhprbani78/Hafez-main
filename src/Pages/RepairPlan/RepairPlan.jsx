import Header from "../../Components/Modules/Header/Header";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import styles from "./RepairPlan.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import TableStatus from "../../Components/Modules/TableStatus/TableStatus";
import { TableCell, TableRow } from "@mui/material";
import Input from "../../Components/Modules/Input/Input";
export default function RepairPlan() {
  const [inputSearch, setInputSearch] = useState("");

  const columns = [
    "کد",
    "نام تعمیرکار",
    "تخصص تعمیرکار",
    "قابلیت زمانی تعمیرکار",
    "وضعیت",
    "عملیات",
  ];

  const [page, setPage] = useState(0);

  const [rows, setRows] = useState([
    {
      code: "1102",
      name: "مهدی رضائی",
      expertise: "مکانیک",
      time_capability: "3 ساعت کار در روز",
      status: "free",
      operation: "",
    },
    {
      code: "1103",
      name: "سارا احمدی",
      expertise: "برق",
      time_capability: "4 ساعت کار در روز",
      status: "hide",
      operation: "",
    },
    {
      code: "1104",
      name: "علی کاظمی",
      expertise: "عمران",
      time_capability: "5 ساعت کار در روز",
      status: "hide",
      operation: "",
    },
    {
      code: "1105",
      name: "زهرا مرادی",
      expertise: "معماری",
      time_capability: "6 ساعت کار در روز",
      status: "underrepair",
      operation: "",
    },
    {
      code: "1106",
      name: "حسین موسوی",
      expertise: "کامپیوتر",
      time_capability: "7 ساعت کار در روز",
      status: "free",
      operation: "",
    },
    {
      code: "1107",
      name: "فاطمه حسینی",
      expertise: "شیمی",
      time_capability: "8 ساعت کار در روز",
      status: "underrepair",
      operation: "",
    },
    {
      code: "1108",
      name: "رضا نادری",
      expertise: "فیزیک",
      time_capability: "5 ساعت کار در روز",
      status: "free",
      operation: "",
    },
    {
      code: "1109",
      name: "مریم جعفری",
      expertise: "ریاضی",
      time_capability: "6 ساعت کار در روز",
      status: "underrepair",
      operation: "",
    },
    {
      code: "1110",
      name: "احمد صادقی",
      expertise: "زیست‌شناسی",
      time_capability: "4 ساعت کار در روز",
      status: "hide",
      operation: "",
    },
    {
      code: "1111",
      name: "لیلا کریمی",
      expertise: "زمین‌شناسی",
      time_capability: "7 ساعت کار در روز",
      status: "underrepair",
      operation: "",
    },
  ]);

  const [filterRows, setFilterRows] = useState([
    {
      code: "1102",
      name: "مهدی رضائی",
      expertise: "مکانیک",
      time_capability: "3 ساعت کار در روز",
      status: "free",
      operation: "",
    },
    {
      code: "1103",
      name: "سارا احمدی",
      expertise: "برق",
      time_capability: "4 ساعت کار در روز",
      status: "hide",
      operation: "",
    },
    {
      code: "1104",
      name: "علی کاظمی",
      expertise: "عمران",
      time_capability: "5 ساعت کار در روز",
      status: "hide",
      operation: "",
    },
    {
      code: "1105",
      name: "زهرا مرادی",
      expertise: "معماری",
      time_capability: "6 ساعت کار در روز",
      status: "underrepair",
      operation: "",
    },
    {
      code: "1106",
      name: "حسین موسوی",
      expertise: "کامپیوتر",
      time_capability: "7 ساعت کار در روز",
      status: "free",
      operation: "",
    },
    {
      code: "1107",
      name: "فاطمه حسینی",
      expertise: "شیمی",
      time_capability: "8 ساعت کار در روز",
      status: "underrepair",
      operation: "",
    },
    {
      code: "1108",
      name: "رضا نادری",
      expertise: "فیزیک",
      time_capability: "5 ساعت کار در روز",
      status: "free",
      operation: "",
    },
    {
      code: "1109",
      name: "مریم جعفری",
      expertise: "ریاضی",
      time_capability: "6 ساعت کار در روز",
      status: "underrepair",
      operation: "",
    },
    {
      code: "1110",
      name: "احمد صادقی",
      expertise: "زیست‌شناسی",
      time_capability: "4 ساعت کار در روز",
      status: "hide",
      operation: "",
    },
    {
      code: "1111",
      name: "لیلا کریمی",
      expertise: "زمین‌شناسی",
      time_capability: "7 ساعت کار در روز",
      status: "underrepair",
      operation: "",
    },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSerach = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setInputSearch(searchTerm);

    const filterProducts = rows.filter(
      (item) =>
        item.code.includes(searchTerm) ||
        item.expertise.toLowerCase().includes(searchTerm) ||
        item.name.includes(searchTerm) ||
        item.status.includes(searchTerm) ||
        item.operation.includes(searchTerm) ||
        item.time_capability.includes(searchTerm)
    );
    setFilterRows(filterProducts);
  };

  return (
    <div className="content-conatiner">
      <SideBar />
      <div className="space-content">
        <Header title={"برنامه ریزی تعمیرکار :"} />
        <div className={styles.wrapper}>
          <div className={styles.input_wrap}>
            <Input
              value={inputSearch}
              onChange={handleSerach}
              placeholder={"جستجو"}
              icon={faMagnifyingGlass}
              type={"text"}
            />
          </div>
          <TableStatus
            Gridumns={columns}
            rows={20}
            page={page}
            onChange={handleChangePage}
            rowsPerPage={rowsPerPage}
          >
            {filterRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                    fontFamily: "iranYekan",
                  }}
                >
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {row.code}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {row.expertise}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {row.time_capability}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontFamily: "iranYekan",
                    }}
                  >
                    <div
                      className={`
                      ${styles.status_wrap}
                      ${
                        row.status === "free"
                          ? styles.free
                          : row.status === "hide"
                          ? styles.hide
                          : row.status === "underrepair"
                          ? styles.under
                          : ""
                      }
                      `}
                    >
                      {row.status === "free"
                        ? "آزاد"
                        : row.status === "hide"
                        ? "پنهان"
                        : row.status === "underrepair"
                        ? "درحال تعمیر"
                        : ""}
                    </div>
                  </TableCell>
                  <TableCell align="center" sx={{ width: "200px" }}>
                    <div className={styles.wrap_btn}>
                      <button className={styles.btn}>مشاهده</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableStatus>
        </div>
      </div>
    </div>
  );
}
