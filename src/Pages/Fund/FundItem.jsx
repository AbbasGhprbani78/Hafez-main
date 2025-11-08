import Header from "../../Components/Modules/Header/Header";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import styles from "./FundItem.module.css";
import { useParams } from "react-router-dom";
import Accardion from "../../Components/Modules/Accardion/Accardion";
import SumItem from "../../Components/Modules/SumItem/SumItem";
import TableStatus from "../../Components/Modules/TableStatus/TableStatus";
import { useEffect, useState } from "react";
import { Box, TableCell, TableRow } from "@mui/material";
import {
  formatWithThousandSeparators,
  toFarsiNumber,
} from "../../utils/helper";
import Grid from "@mui/material/Grid2";
import colors from "react-multi-date-picker/plugins/colors";
import Button2 from "../../Components/Modules/Button2/Button2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPrint } from "@fortawesome/free-solid-svg-icons";

export default function FundItem() {
  const { id } = useParams();

  const Gridumns = ["", "عهده شرکت", "مشتری"];
  const [rows, setRows] = useState([
    {
      work: "قطعات",
      company: 0,
      customer: 1200000,
    },
    {
      work: "اجرت تعمیرات",
      company: 2,
      customer: 1500000,
    },
    {
      work: "جمع کل خدمات",
      company: 7,
      customer: 1900000,
    },
    {
      work: "تخفیف خدمات",
      company: 2,
      customer: 3400000,
    },
    {
      work: "کار خارج",
      company: 11,
      customer: 100000,
    },
    {
      work: "جمع خالص",
      company: 4,
      customer: 1700000,
    },
    {
      work: "مبلغ قابل پرداخت",
      company: 2,
      customer: 16700000,
    },
  ]);

  return (
    <>
      <div className="content-conatiner">
        <SideBar />
        <div
          className={`space-content ${styles.wrap_fund_item} scroll-contant`}
        >
          <Header title={"کارتابل صندوق پذیرش :"} />
          <div className={styles.wrapper_info}>
            <p className={styles.title}>مشخصات خودرو :</p>
            <Grid container className={`${styles.content} `}>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={styles.item_content}
              >
                <span className={styles.key_item}>شماره شاسی :</span>
                <span className={styles.value_item}>dsfdg518h4956f</span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={styles.item_content}
              >
                <span className={styles.key_item}>شماره موتور :</span>
                <span className={styles.value_item}>{toFarsiNumber(7521)}</span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={styles.item_content}
              >
                <span className={styles.key_item}>تاریخ شروع گارانتی :</span>
                <span className={styles.value_item}>10/05/25</span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={styles.item_content}
              >
                <span className={styles.key_item}>رنگ :</span>
                <span className={styles.value_item}>سفید</span>
              </Grid>
            </Grid>
          </div>
          <div className={styles.wrapper_info}>
            <p className={styles.title}>اطلاعات پذیرش :</p>
            <Grid container className={`${styles.content} `}>
              <Grid
                size={{ xs: 12, md: 6, lg: 4 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>شماره پذیرش :</span>
                <span className={styles.value_item}>12444956f</span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 4 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>کیلومتر :</span>
                <span className={styles.value_item}>7521</span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 4 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>پلاک :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber("64ط258 ایران 13")}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 4 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>تاریخ و زمان پذیرش :</span>
                <span className={styles.value_item}>1403/12/7</span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 4 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>زمان تخمینی:</span>
                <span className={styles.value_item}>1403/12/19</span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 4 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>هزینه تخمینی :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(formatWithThousandSeparators(1400000))}
                </span>
              </Grid>
            </Grid>
            <Grid container className={`${styles.content} `}>
              <Grid
                size={{ xs: 12, md: 6, lg: 4 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>شماره هرم :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(20000)}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 4 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>توضیحات :</span>
                <span className={styles.value_item}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  beatae vitae quas, temporibus itaque, perspiciatis doloribus
                  quae sequi consequuntur quia odio debitis iure dolor atque
                  maiores! Amet quaerat earum tempora?
                </span>
              </Grid>
            </Grid>
          </div>
          <div className={styles.wrapper_info}>
            <p className={styles.title}>اطلاعات مشتری :</p>
            <Grid container className={`${styles.content} `}>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>نام :</span>
                <span className={styles.value_item}>لیلا</span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>نام خانوادگی :</span>
                <span className={styles.value_item}>سعیدی</span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>کد ملی :</span>
                <span className={styles.value_item}>1234567890</span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>تلفن همراه :</span>
                <span className={styles.value_item}>09162957253</span>
              </Grid>
            </Grid>
          </div>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={4}
            sx={{ margin: "1rem 0" }}
          >
            <Grid size={{ xs: 12, md: 7 }} className={styles.payment_method}>
              <div className={styles.wrap_accardions}>
                <Accardion title={"انتخاب تخفیف"} />
                <Accardion title={"پرداخت چک"} />
                <Accardion title={"پرداخت نقدی"} />
              </div>
              <div className={styles.prices_wrapper}>
                <SumItem title={"پیش پرداخت"} price={1200000} />
                <SumItem title={"جمع پرداختی"} price={1200000} />
                <SumItem
                  title={"جمع پرداختی"}
                  price={1200000}
                  Gridor={"Gridor"}
                />
              </div>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} className={styles.invoice}>
              <div className={styles.invoice_content}>
                <div className={styles.invoice_header}>
                  <span className={styles.invoice_title}>جمع فاکتور</span>
                </div>
                <div className={styles.wrap_table}>
                  <TableStatus
                    Gridumns={Gridumns}
                    rows={""}
                    page={""}
                    onChange={""}
                    rowsPerPage={""}
                    notPagination={"true"}
                  >
                    {rows.length > 0 &&
                      rows.map((row, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            backgroundColor: i % 2 === 0 ? "white" : "#f5f5f5",
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "iranYekan",
                              color: "var(--color-3)",
                              fontWeight: 600,
                            }}
                          >
                            {row.work}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "iranYekan",
                              color: "var(--color-3)",
                              fontWeight: 600,
                            }}
                          >
                            {toFarsiNumber(row.company)}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "iranYekan",
                              color: "var(--color-3)",
                              fontWeight: 600,
                            }}
                          >
                            {row.customer.toLocaleString("fa")}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableStatus>
                </div>
              </div>
            </Grid>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                marginTop: "1rem",
                gap: "20px",
              }}
            >
              <Button2>
                تایید
                <FontAwesomeIcon icon={faCheck} />
              </Button2>
              <Button2>
                چاپ فاکتور
                <FontAwesomeIcon icon={faPrint} />
              </Button2>
            </Box>
          </Grid>
        </div>
      </div>
    </>
  );
}
