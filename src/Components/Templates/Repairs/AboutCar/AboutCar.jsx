import styles from "./AboutCar.module.css";
import Grid from "@mui/material/Grid2";
export default function AboutCar() {
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
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره شاسی : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره شاسی : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره شاسی : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره شاسی : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره شاسی : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره شاسی : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره شاسی : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <span className={styles.title_info_car}>شماره شاسی : </span>
            <span className={styles.text_info_car}>dsfdg518h4956f</span>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
