import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "../../Components/Modules/Header/Header";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import InputCheckBox from "../../Components/Modules/InputChekBox/InputCheckBox";
import InputPrice from "../../Components/Modules/InputPrice/InputPrice";
import DataInput from "../../Components/Modules/DataInput/DataInput";
import Button2 from "../../Components/Modules/Button2/Button2";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grid from "@mui/material/Grid2";

export default function FundItem() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="content-conatiner">
        <SideBar />
        <div className={`space-content scroll-contant`}>
          <Header title={"صندوق"} />
          <Box
            sx={{
              padding: "1.7rem 0 1rem 0",
              borderBottom: "1px solid var(--color-21)",
            }}
          >
            <Typography className="title_top">اطلاعات پذیرش :</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1.2rem",
                color: "var(--color-3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="key_item">شماره پذیرش :</span>
                <span className="value_item">dsfdg518h4956f</span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="key_item">تاریخ و زمان پرداخت:</span>
                <span className="value_item">01.02.24</span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="key_item">نام و نام خانوادگی :</span>
                <span className="value_item">رضا مرادی</span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="key_item">شماره تماس:</span>
                <span className="value_item">09131234567</span>
              </Box>
            </Box>
          </Box>
          <Typography className="title_top" sx={{ padding: "1.7rem 0 1rem 0" }}>
            نوع پرداخت :
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
            <Box>
              <InputCheckBox text={"علی‌الحساب"} />
              <InputCheckBox text={"پیش پرداخت"} />
            </Box>

            <Box>
              <Grid item container size={{ xs: 12 }}>
                <Grid item size={{ xs: 12, md: 4, lg: 3 }}>
                  <InputPrice
                    label="مبلغ"
                    value={""}
                    onChange={""}
                    name="price"
                    maxLength={30}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid item container size={{ xs: 12 }}>
                <Grid item size={{ xs: 12, md: 4, lg: 3 }}>
                  <Typography
                    className={"label_input_form3"}
                    sx={{ marginBottom: { xs: "5px" } }}
                  >
                    {"تخمین زمان تعمیرکار"}
                  </Typography>

                  <DataInput
                    placeHolder="تخمین زمان تعمیر را انتخاب نمایید!"
                    value={""}
                    onChange={""}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                margin: "1rem 0 ",
              }}
            >
              <Button2
                key={811}
                type="button"
                variant="contained"
                icon={loading ? "" : faCheck}
                onClick={""}
                disable={loading}
                button_width={"button_width"}
              >
                {loading ? (
                  <CircularProgress size={"25.2px"} color="success" />
                ) : (
                  "تایید"
                )}
              </Button2>
              <button className="edit-btn confirmation-btn" onClick={""}>
                ویرایش <FontAwesomeIcon icon={faPen} className="penicon" />
              </button>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}
