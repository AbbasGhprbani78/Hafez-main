import { useState } from "react";
import TitleWithSearch from "../../../Components/Modules/TitleWithSearch/TitleWithSearch";
import Button2 from "../../../Components/Modules/Button2/Button2";
import { TableCell, TableRow } from "@mui/material";
import TableCustom from "../../../Components/Modules/TableCustom/TableCustom";
import styles from "../RunningTasks/RunningTasks.module.css";
const fakeRows = [
  {
    code: "X123",
    name: "پراید 131",
    remaining_capacity: 4,
    status: 2,
    startDate: "1403/04/20",
    endDate: "1403/04/23",
    acceptDate: "1403/04/19",
  },
  {
    code: "Y456",
    name: "پژو 206",
    remaining_capacity: 6,
    status: 1,
    startDate: "1403/04/18",
    endDate: "1403/04/21",
    acceptDate: "1403/04/17",
  },
  {
    code: "Z789",
    name: "سمند LX",
    remaining_capacity: 3,
    status: 3,
    startDate: "1403/04/15",
    endDate: "1403/04/18",
    acceptDate: "1403/04/14",
  },
  {
    code: "A321",
    name: "تیبا 2",
    remaining_capacity: 5,
    status: 2,
    startDate: "1403/04/22",
    endDate: "1403/04/25",
    acceptDate: "1403/04/21",
  },
  {
    code: "B654",
    name: "دنا پلاس",
    remaining_capacity: 2,
    status: 1,
    startDate: "1403/04/10",
    endDate: "1403/04/12",
    acceptDate: "1403/04/09",
  },
  {
    code: "C987",
    name: "رانا LX",
    remaining_capacity: 7,
    status: 3,
    startDate: "1403/04/05",
    endDate: "1403/04/08",
    acceptDate: "1403/04/04",
  },
];
export default function History() {
  const columns = [
    "مدل ماشین",
    "تاریخ شروع",
    "تاریخ پایان",
    "تاریخ پذیرش",
    "وضعیت تعمیر",
    "کارت تعمیر",
  ];
  const [rows, setRows] = useState(fakeRows);
  const [filterRows, setFilterRows] = useState(fakeRows);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [searchInput, setSearchInput] = useState("");

  const handleChangeSearchField = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);
    const filtered = rows.filter(
      (row) =>
        row.name.toLowerCase().includes(searchTerm) ||
        row.startDate.toLowerCase().includes(searchTerm) ||
        row.endDate.toLowerCase().includes(searchTerm) ||
        row.acceptDate.toLowerCase().includes(searchTerm)
    );
    setFilterRows(filtered);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  return (
    <>
      <TitleWithSearch
        searchInput={searchInput}
        onChange={handleChangeSearchField}
        title={"سوابق"}
      />

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
                  {row.name}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {row.startDate}
                </TableCell>

                <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                  {row.endDate}
                </TableCell>

                <TableCell align="center">{row.acceptDate}</TableCell>

                <TableCell
                  align="center"
                  sx={{ fontFamily: "iranYekan", justifyItems: "center" }}
                >
                  <div
                    className={`${styles.status_btn} ${
                      row.status === 1
                        ? styles.status_one
                        : row.status === 2
                        ? styles.status_two
                        : styles.status_three
                    }`}
                  >
                    {row.status == 1
                      ? "در انتظار تعمیر"
                      : row.status == 2
                      ? "در حال تعمیر"
                      : "اتمام تعمیر"}
                  </div>
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
                  <Button2 onClick={""}>مشاهده</Button2>
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
