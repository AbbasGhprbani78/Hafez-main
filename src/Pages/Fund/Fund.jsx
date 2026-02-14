import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import { TableCell, TableRow } from "@mui/material";
import {
  formatWithThousandSeparators,
  toFarsiNumber,
} from "../../utils/helper";
import { ChnageDate } from "../../Components/Modules/ChnageDate/ChnageDate";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import { useEffect, useState } from "react";
import apiClient from "../../config/axiosConfig";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { warningMessage } from "../../Components/Modules/Toast/ToastCustom";
import Input from "../../Components/Modules/Input/Input";
import Grid from "@mui/material/Grid2";

const columns = [
  "شماره پذیرش",
  "کد ملی",
  "نام ونام خانوادگی",
  "شماره پذیرش",
  "تاریخ پرداخت",
];
const pageLength = 10;
export default function Fund() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState([]);
  const [admissionNumber, setAdmissionNumber] = useState("");

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeAdmissionNumber = (event) => {
    const input = event.target.value;
    const regex = /^[0-9]*$/;
    if (input === "" || regex.test(input)) {
      setAdmissionNumber(input);
      setPage(0);
    } else {
      warningMessage("فقط عدد وارد نمایید!");
    }
  };

  const getFunddata = async () => {
    try {
      const params = {
        page: page + 1,
        page_size: pageLength,
      };

      if (admissionNumber && admissionNumber.trim() !== "") {
        params.search = admissionNumber.trim();
      }

      const response = await apiClient.get(`/fund`, { params });

      if (response.status === 200) {
        const data = response.data || {};

        const results = data.results ?? data.data ?? data.items ?? [];
        const count =
          data.count ?? data.total ?? data.meta?.total ?? results.length;

        setTotalRows(Number(count) || 0);
        setRows(results);
      }
    } catch (error) {
      console.error("خطا در دریافت تاریخچه مشتریان:", error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getFunddata();
    }, 400);
    return () => clearTimeout(timeout);
  }, [page, admissionNumber]);

  return (
    <div className="content-conatiner">
      <SideBar />
      <div className="space-content scroll-contant">
        <Header title={"صندوق"} />
        <Grid
          item
          container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            width: "100%",
            margin: "1rem 0",
          }}
          size={{ xs: 12 }}
        >
          <Grid
            item
            size={{ xs: 12, md: 4, lg: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Input
              name={"admission_number_input"}
              styled={"admission_number_input"}
              label="شماره پذیرش"
              placeholder="شماره پذیرش"
              icon={faHashtag}
              value={admissionNumber}
              onChange={handleChangeAdmissionNumber}
            />
          </Grid>
        </Grid>

        <TableCustom
          rows={totalRows}
          columns={columns}
          onChange={handleChangePage}
          page={page}
          rowsPerPage={pageLength}
          total={totalRows}
        >
          {rows?.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                fontFamily: "iranYekan !important",
              }}
            >
              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
              ></TableCell>
              <ChnageDate date={row.acceptDate} />
              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
              ></TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
              ></TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
              ></TableCell>
            </TableRow>
          ))}
        </TableCustom>
      </div>
    </div>
  );
}
