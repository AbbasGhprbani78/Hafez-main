import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Button2 from "../../Components/Modules/Button2/Button2";
import {
  formatWithThousandSeparators,
  toFarsiNumber,
} from "../../utils/helper";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import { faBuilding, faHashtag } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Modules/Input/Input";
import Grid from "@mui/material/Grid2";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import styles from "./Report.module.css";
import apiClient from "../../config/axiosConfig";
import SelectDropDown2 from "../../Components/Modules/SelectDropDown2/SelectDropDown2";
import { ChnageDate } from "../../Components/Modules/ChnageDate/ChnageDate";
const columns = [
  "شماره پذیرش",
  "کد ملی",
  "شماره شاسی",
  "شماره موتور",
  "تاریخ پذیرش",
  "تاریخ ترخیص",
  "وضعیت پذیرش",
  "قطعات",
  "اجرت",
  "کار خارج",
];
const pageLength = 10;

export default function CustomerHistory() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [parts, setParts] = useState([]);
  const [filters, setFilters] = useState({
    chassis_number: "",
    national_code: "",
    repairs: "",
    parts: "",
    external_work: "",
  });

  const applyFilter = (updater) => {
    setFilters((prev) =>
      typeof updater === "function" ? updater(prev) : { ...prev, ...updater }
    );
    setPage(0);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleInputChange = (name, value) => {
    applyFilter({ [name]: value });
  };

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const transformCustomerHistory = (results) => {
    return results.map((item) => ({
      admission_number: item.admission_number,
      nationalCode: item.customer_info?.national_code || "",
      vin: item.car_info?.chassis_number || "",
      engineNumber: item.car_info?.engine_number || "",
      acceptDate: item.admission_date || "",
      releaseDate: item.estimated_time_cost || "",
      status: mapStatus(item.status),
      parts: (item.parts || []).map((p) => ({
        code: p.piece_code ? `P-${String(p.piece_code).padStart(3, "0")}` : "",
        description: p.piece_name || "",
        reason: p.description || "",
        price: p.price || "",
        quantity: p.count || 1,
        mechanic: p.repairman_name || "",
      })),
      wages: (item.repairs || []).map((r) => ({
        issue: r.action || "",
        wage: r.price || "",
        mechanic: r.repairman[0] || "",
        repairTime: r.repair_hours ? `${r.repair_hours} ساعت` : "",
      })),
      externalWork: (item.work_abroad || []).map((w) => ({
        description: w.descriptions || "",
        price: w.price || "",
      })),
    }));
  };

  const mapStatus = (status) => {
    const map = {
      one: "در انتظار",
      two: "در حال بررسی",
      three: "در حال تعمیر",
      done: "تکمیل شده",
    };
    return map[status] || status;
  };

  const getCustomerHistory = async () => {
    try {
      const params = new URLSearchParams({
        page: page + 1,
        page_size: pageLength,
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          params.append(key, value);
        }
      });

      const response = await apiClient.get(
        `/app/api/receptions/?${params.toString()}`
      );

      if (response.status === 200) {
        const data = response.data;

        setTotalRows(data.count || 0);
        const transformedRows = transformCustomerHistory(data.results || []);
        setRows(transformedRows);
      }
    } catch (error) {
      console.error("خطا در دریافت تاریخچه مشتریان:", error);
    }
  };

  const getParts = async () => {
    try {
      const resposne = await apiClient.get("app/api/parts/");
      if (resposne.status === 200) {
        const allParts =
          resposne.data?.map((item) => ({
            value_id: item.id,
            value: item.name || item.value,
          })) || [];

        setParts(allParts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getParts();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getCustomerHistory();
    }, 400);

    return () => clearTimeout(timeout);
  }, [filters, page]);

  return (
    <Grid className="content-conatiner">
      <SideBar />
      <Grid
        size={{ xs: 12 }}
        container
        sx={{
          width: "100%",
        }}
        minWidth={100}
        className="space-content scroll-contant"
      >
        <Header title={"سابقه مشتریان"} />
        <Box
          sx={{
            margin: "2rem 0",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 2, md: 10, xl: 30 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name="chassis_number"
                label="شماره شاسی :"
                placeholder="شماره شاسی"
                icon={faHashtag}
                value={filters.chassis_number}
                onChange={(e) =>
                  handleInputChange("chassis_number", e.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name="national_code"
                label="کد ملی :"
                placeholder="کد ملی"
                icon={faHashtag}
                value={filters.national_code}
                onChange={(e) =>
                  handleInputChange("national_code", e.target.value)
                }
                justNumber={true}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 2, md: 10, xl: 30 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name="repairs"
                label="اجرت :"
                placeholder="اجرت"
                icon={faHashtag}
                value={filters.repairs}
                justNumber
                onChange={(e) => handleInputChange("repairs", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SelectDropDown2
                label="قطعات :"
                items={parts}
                name="parts"
                placeHolder={"قطعه را انتخاب یا وارد کنید"}
                isDesirableValue={false}
                onChange={handleChange}
                value={filters.parts}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 2, md: 10, xl: 30 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                name="external_work"
                label="کار خارج :"
                placeholder="کار خارج"
                value={filters.external_work}
                onChange={(e) =>
                  handleInputChange("external_work", e.target.value)
                }
                icon={faBuilding}
              />
            </Grid>
          </Grid>
        </Box>
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
              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.admission_number)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.nationalCode)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.vin)}
              </TableCell>

              <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                {toFarsiNumber(row.engineNumber)}
              </TableCell>
              <ChnageDate date={row.acceptDate} />
              <ChnageDate date={row.releaseDate} />
              <TableCell
                align="center"
                sx={{
                  fontFamily: "iranYekan",
                  color:
                    row.status === "تکمیل شده"
                      ? "green"
                      : row.status === "تحویل شده"
                      ? "blue"
                      : "#ff9800",
                  fontWeight: "bold",
                }}
              >
                {toFarsiNumber(row.status)}
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                {row.parts && row.parts.length > 0
                  ? row.parts.map((part, idx) => (
                      <div
                        key={idx}
                        style={{ marginBottom: "6px", textAlign: "right" }}
                      >
                        <div>{toFarsiNumber(`کد قطعه: ${part.code}`)}</div>
                        <div>
                          {toFarsiNumber(`شرح قطعه: ${part.description}`)}
                        </div>
                        <div>{toFarsiNumber(`علت تعویض: ${part.reason}`)}</div>
                        <div>
                          {toFarsiNumber(
                            `قیمت: ${formatWithThousandSeparators(part.price)}`
                          )}
                        </div>
                        <div>{toFarsiNumber(`تعداد: ${part.quantity}`)}</div>
                        <div>{toFarsiNumber(`تعمیرکار: ${part.mechanic}`)}</div>
                      </div>
                    ))
                  : "-"}
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                {row.wages && row.wages.length > 0
                  ? row.wages.map((wage, idx) => (
                      <div
                        key={idx}
                        style={{ marginBottom: "6px", textAlign: "right" }}
                      >
                        <div>
                          {toFarsiNumber(`اظهار/عیب فنی: ${wage.issue}`)}
                        </div>
                        <div>
                          {toFarsiNumber(
                            `اجرت: ${formatWithThousandSeparators(wage.wage)}`
                          )}
                        </div>
                        <div>{toFarsiNumber(`تعمیرکار: ${wage.mechanic}`)}</div>
                        <div>
                          {toFarsiNumber(`مدت زمان تعمیر: ${wage.repairTime}`)}
                        </div>
                      </div>
                    ))
                  : "-"}
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan" }}
                className={styles.info_cell}
              >
                {row.externalWork && row.externalWork.length > 0
                  ? row.externalWork.map((work, idx) => (
                      <div
                        key={idx}
                        style={{ marginBottom: "6px", textAlign: "right" }}
                      >
                        <div>
                          {toFarsiNumber(`شرح کار: ${work.description}`)}
                        </div>
                        <div>
                          {toFarsiNumber(
                            `قیمت: ${formatWithThousandSeparators(work.price)}`
                          )}
                        </div>
                      </div>
                    ))
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableCustom>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: ".5rem",
            margin: "1.5rem 0",
            justifyContent: "end",
            width: "100%",
            flexDirection: { sx: "column", md: "row" },
          }}
        >
          <Button2 button_width={"button_width"}>
            {loading ? (
              <CircularProgress size={"20px"} color="success" />
            ) : (
              "دریافت اکسل"
            )}
          </Button2>
          <Button2 button_width={"button_width"}>
            {loading ? (
              <CircularProgress size={"20px"} color="success" />
            ) : (
              "دریافت PDF"
            )}
          </Button2>
          <Button2 button_width={"button_width"}>
            {loading ? (
              <CircularProgress size={"20px"} color="success" />
            ) : (
              "چاپ"
            )}
          </Button2>
        </Box>
      </Grid>
    </Grid>
  );
}

{
  /* <Input
                name="parts"
                label="قطعات :"
                placeholder="قطعات"
                value={filters.parts}
                onChange={(e) => handleInputChange("parts", e.target.value)}
              /> */
}
