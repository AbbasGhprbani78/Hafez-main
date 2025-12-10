import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import { useState, useEffect, useCallback } from "react";
import { TableCell, TableRow, CircularProgress } from "@mui/material";
import { toFarsiNumber } from "../../utils/helper";
import Button2 from "../../Components/Modules/Button2/Button2";
import TableCustom from "../../Components/Modules/TableCustom/TableCustom";
import { useNavigate } from "react-router-dom";
import apiClient from "../../config/axiosConfig";
import { errorMessage } from "../../Components/Modules/Toast/ToastCustom";
import Grid from "@mui/material/Grid2";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Modules/Input/Input";
const columns = ["کد", "اظهارات مشتری", "تاریخ ارجاع", "وضعیت", "عملیات"];

export default function ExpertReferral() {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const getExpertReferrals = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: page + 1,
        page_size: rowsPerPage,
      };

      if (inputSearch && inputSearch.trim() !== "") {
        params.search = inputSearch.trim();
      }

      const response = await apiClient.get("app/get-referral-to-an-expert/", {
        params,
      });
      if (response.status === 200) {
        setRows(response.data.results || []);
        setTotalRows(response.data.count || 0);
      }
    } catch (error) {
      errorMessage("خطا در دریافت لیست ارجاعات");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, inputSearch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setInputSearch(value);
  };

  useEffect(() => {
    getExpertReferrals();
  }, [getExpertReferrals]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setPage(0);
    }, 600);

    return () => clearTimeout(debounceTimer);
  }, [inputSearch]);

  const handleView = (formId) => {
    navigate(`/expert-referral/${formId}`);
  };

  return (
    <div className="content-conatiner">
      <SideBar />
      <div className="space-content scroll-contant">
        <Header title={"ارجاع تخصصی"} />
        <Grid container style={{ marginTop: "1.5rem" }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Input
              label={"جستوجو"}
              icon={faMagnifyingGlass}
              value={inputSearch}
              onChange={handleSearch}
              placeholder={"جستوجو براساس کد , اظهارات مشتری , وضعیت"}
              styled={"width"}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: "1.5rem" }}>
          {loading && rows.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <TableCustom
              columns={columns}
              rows={rows}
              onChange={handleChangePage}
              page={page}
              rowsPerPage={rowsPerPage}
              total={totalRows}
            >
              {rows.map((row) => (
                <TableRow key={row.id || row.form_id}>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(row.form_id)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {row.CustomerStatements || "-"}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    {toFarsiNumber(row.referral_date)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
                    <div
                      style={{
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "100px",
                        width: "130px",
                        margin: "0 auto",
                      }}
                      className={`${
                        row.referral_to_an_expert === "referral to an expert"
                          ? "under"
                          : "free"
                      }`}
                    >
                      {row.referral_to_an_expert === "referral to an expert"
                        ? "ارجاع به کارشناس"
                        : "نیاز به تایید"}
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "iranYekan",
                      flexDirection: "row",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button2 onClick={() => handleView(row.form_id || row.id)}>
                      مشاهده
                    </Button2>
                  </TableCell>
                </TableRow>
              ))}
            </TableCustom>
          )}
        </div>
      </div>
    </div>
  );
}
