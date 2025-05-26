import React from "react";
import styles from "./TableForm3.module.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  faPen,
  faTrash,
  faFileImage,
  faFileAudio,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toFarsiNumber } from "../../../utils/helper";

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center" className={styles.table}>
          {toFarsiNumber(row?.CustomerStatements)}
        </TableCell>
        <TableCell align="center" className={styles.table}>
          {toFarsiNumber(row?.ExpertStatements)}
        </TableCell>
        <TableCell align="center" className={styles.table}>
          <div className={styles.wrapper_icon}>
            <FontAwesomeIcon
              icon={faFileImage}
              className={`${styles.icon} ${styles.icon_attch}`}
            />
            <FontAwesomeIcon
              icon={faFileAudio}
              className={`${styles.icon} ${styles.icon_attch}`}
            />
          </div>
        </TableCell>
        <TableCell align="center" className={styles.table}>
          <div className={styles.wrapper_icon}>
            <FontAwesomeIcon
              icon={faFileImage}
              className={`${styles.icon} ${styles.icon_attch}`}
            />
            <FontAwesomeIcon
              icon={faFileAudio}
              className={`${styles.icon} ${styles.icon_attch}`}
            />
          </div>
        </TableCell>
        <TableCell align="center" className={styles.table}>
          <div className={styles.wrapper_icon}>
            <FontAwesomeIcon
              icon={faPen}
              className={`${styles.icon} ${styles.icon_attch}`}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className={`${styles.icon} deleteIcon`}
            />
          </div>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            style={{ color: "var(--color-3)" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className={styles.table}
                dir="rtl"
              >
                جزییات
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={styles.table}>
                      کد اجرت
                    </TableCell>
                    <TableCell align="center" className={styles.table}>
                      قیمت
                    </TableCell>
                    <TableCell align="center" className={styles.table}>
                      کد تعمیرکار
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.invoiceItems.length > 0 &&
                    row.invoiceItems.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell align="center" className={styles.table}>
                          {toFarsiNumber(item?.wages)}
                        </TableCell>
                        <TableCell align="center" className={styles.table}>
                          {toFarsiNumber(item?.price)}
                        </TableCell>
                        <TableCell align="center" className={styles.table}>
                          {toFarsiNumber(item?.repairman)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TableForm3({ data = [] }) {
  return (
    <TableContainer component={Paper} dir="rtl">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={styles.table}>
              اظهارات مشتری
            </TableCell>
            <TableCell align="center" className={styles.table}>
              کد اظهار
            </TableCell>
            <TableCell align="center" className={styles.table}>
              پیوست مشتری
            </TableCell>
            <TableCell align="center" className={styles.table}>
              پیوست کارشناس
            </TableCell>
            <TableCell align="center" className={styles.table}>
              عملیات
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 && data.map((row, i) => <Row key={i} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
