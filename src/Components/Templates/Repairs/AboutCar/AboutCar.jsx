import { useEffect, useState } from "react";
import apiClient from "../../../../config/axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import { errorMessage } from "../../../Modules/Toast/ToastCustom";
import styles from "./AboutCar.module.css";
import Grid from "@mui/material/Grid2";
export default function AboutCar() {
  const [dataCar, setDataCar] = useState("");

  const getDataCar = async () => {
    try {
      const response = await apiClient.get("/app/car-specs/", {
        params: { form_id: 39 },
      });
      if (response.status === 200) {
        console.log(response.data);
        setDataCar(response.data);
      }
    } catch (error) {
      errorMessage(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getDataCar();
  }, []);

  return (
    <>
      <div className={styles.car_onfo_box}>
        <span className={`${styles.car_onfo_box_title} subtitle-project`}>
          مشخصات خودرو :
        </span>
        <Grid
          container
          className={`${styles.wrap_colums}`}
          rowSpacing={2}
          columnSpacing={4}
          sx={{ margin: "2rem 0" }}
        >
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره شاسی : </span>
            <span className={styles.text_info_car}>
              {dataCar?.chassis_number}
            </span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>مدل خودرو : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>گروه خودرو : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>کیلومتر : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره هرم : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره موتور : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>تاریخ شروع گارانتی : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>رنگ : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>نوع پذیرش : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
