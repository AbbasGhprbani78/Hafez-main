import {
  formatWithThousandSeparators,
  toFarsiNumber,
} from "../../../utils/helper";
import styles from "./SumItem.module.css";
import Grid from "@mui/material/Grid2";
export default function SumItem({ title, price, color }) {
  return (
    <Grid container className={`${styles.sumItem_wrapper} `}>
      <Grid size={{ xs: 12, md: 7 }}>
        <span className={styles.title_price}>{title}</span>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <span className={`${styles.number_price} ${styles[color]}`}>
          {toFarsiNumber(formatWithThousandSeparators(price))}
        </span>
      </Grid>
    </Grid>
  );
}
