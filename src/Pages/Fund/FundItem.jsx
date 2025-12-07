import Header from "../../Components/Modules/Header/Header";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import styles from "./FundItem.module.css";
import { useParams } from "react-router-dom";
import Accardion from "../../Components/Modules/Accardion/Accardion";
import SumItem from "../../Components/Modules/SumItem/SumItem";
import TableStatus from "../../Components/Modules/TableStatus/TableStatus";
import { useEffect, useState } from "react";
import { Box, TableCell, TableRow } from "@mui/material";
import { toFarsiNumber } from "../../utils/helper";
import Grid from "@mui/material/Grid2";

import Button2 from "../../Components/Modules/Button2/Button2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPrint } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../config/axiosConfig";
import { convertGregorianToPersian } from "../../Components/Modules/ChnageDate/ChnageDate";
import {
  errorMessage,
  successMessage,
} from "../../Components/Modules/Toast/ToastCustom";
import { ToastContainerCustom } from "../../Components/Modules/Toast/ToastCustom";
const Gridumns = ["", "عهده شرکت", "مشتری"];
export default function FundItem() {
  const { id } = useParams();
  const [fund, setFund] = useState({});
  const [loading, setLoading] = useState(false);

  const getFunditem = async () => {
    try {
      const response = await apiClient.get(`app/invoice/${id}/`);
      if (response.status === 200) {
        console.log(response.data);
        setFund(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveFund = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post(`/app/api/invoices/confirm/`, {
        invoice_number: fund?.admission_info.invoice_number,
      });
      if (response.status === 200) {
        successMessage("پذیرش با موفقیت تایید شد.");
      }
    } catch (error) {
      console.log(error);
      errorMessage(error.response?.data?.error || "خطا در تایید پذیرش.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFunditem();
  }, []);

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
                <span className={styles.key_item}>مدل :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(fund?.car_info?.model)}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={styles.item_content}
              >
                <span className={styles.key_item}>پلاک :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(fund?.car_info?.plate)}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={styles.item_content}
              >
                <span className={styles.key_item}>شماره شاسی :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(fund?.car_info?.chassis)}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={styles.item_content}
              >
                <span className={styles.key_item}>کیلومتر :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(fund?.car_info?.km)}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={styles.item_content}
              >
                <span className={styles.key_item}>رنگ :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(fund?.car_info?.color)}
                </span>
              </Grid>
            </Grid>
          </div>
          <div className={styles.wrapper_info}>
            <p className={styles.title}>اطلاعات پذیرش :</p>
            <Grid container className={`${styles.content} `}>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>شماره پذیرش :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(fund?.admission_info?.admission_number)}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>تاریخ پذیرش :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(
                    convertGregorianToPersian(
                      fund?.admission_info?.admission_date
                    )
                  )}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>شماره فاکتور :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(fund?.admission_info?.invoice_number)}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>تاریخ فاکتور :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(
                    convertGregorianToPersian(
                      fund?.admission_info?.invoice_date
                    )
                  )}
                </span>
              </Grid>

              {/* <Grid
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
              </Grid> */}
            </Grid>
            {/* <Grid container className={`${styles.content} `}>
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
            </Grid> */}
          </div>
          <div className={styles.wrapper_info}>
            <p className={styles.title}>اطلاعات مشتری :</p>
            <Grid container className={`${styles.content} `}>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>نام و نام خانوادگی :</span>
                <span className={styles.value_item}>
                  {fund?.customer_info?.name}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>کد ملی :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(fund?.customer_info?.national_code)}
                </span>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                className={`${styles.item_content}`}
              >
                <span className={styles.key_item}>تلفن همراه :</span>
                <span className={styles.value_item}>
                  {toFarsiNumber(fund?.customer_info?.phone)}
                </span>
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
                <SumItem
                  title={"پیش پرداخت"}
                  price={fund?.factor?.totals?.prepayment}
                />

                <SumItem
                  title={"جمع پرداختی"}
                  price={fund?.factor?.totals?.payable_amount}
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
                    {fund?.factor?.invoice_table.length > 0 &&
                      fund?.factor?.invoice_table.map((item, i) => (
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
                            {item?.row}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "iranYekan",
                              color: "var(--color-3)",
                              fontWeight: 600,
                            }}
                          >
                            {toFarsiNumber(item?.company)}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "iranYekan",
                              color: "var(--color-3)",
                              fontWeight: 600,
                            }}
                          >
                            {item.customer.toLocaleString("fa")}
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
              <Button2 onClick={approveFund} disabled={loading}>
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
      <ToastContainerCustom />
    </>
  );
}
