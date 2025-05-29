import styles from "./Attaches.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import Texteara from "../../../Modules/Texteara/Textarea";
import Grid from "@mui/material/Grid2";
export default function Attaches() {
  return (
    <div className={styles.box}>
      <span className={`${styles.box_title} subtitle-project`}>
        پیوستها:<Button2 onClick={""}>{"تاریخچه پیوست‌ها"}</Button2>
      </span>
      <Grid container>
        <Grid size={{ xs: 12, md: 4 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Texteara value={""} onChange={""} name={""} text={"توضیحات"} />
        </Grid>
      </Grid>
    </div>
  );
}
