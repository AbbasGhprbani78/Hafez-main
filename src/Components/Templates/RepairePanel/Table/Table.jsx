import React from "react";
import styles from "./Table.module.css";
import { faBoxArchive, faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toFarsiNumber } from "../../../../utils/helper";
import { Button } from "react-bootstrap";
import Button3 from "../../../Modules/Button3/Button3";

const rows = [
  {
    id: 1,
    carModel: "پراید 131",
    repairStatus: "در حال بررسی",
    receiveDate: "1403/04/10",
    hasTicket: true,
  },
  {
    id: 2,
    carModel: "سمند LX",
    repairStatus: "در حال تعمیر",
    receiveDate: "1403/04/12",
    hasTicket: false,
  },
  {
    id: 3,
    carModel: "دنا پلاس",
    repairStatus: "تعمیر کامل",
    receiveDate: "1403/04/15",
    hasTicket: true,
  },
  {
    id: 1,
    carModel: "پراید 131",
    repairStatus: "در حال بررسی",
    receiveDate: "1403/04/10",
    hasTicket: true,
  },
  {
    id: 2,
    carModel: "سمند LX",
    repairStatus: "در حال تعمیر",
    receiveDate: "1403/04/12",
    hasTicket: false,
  },
  {
    id: 3,
    carModel: "دنا پلاس",
    repairStatus: "تعمیر کامل",
    receiveDate: "1403/04/15",
    hasTicket: true,
  },
];
export default function Table() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faBoxArchive} />
        <span>تسک‌های در حال اجرا</span>
      </div>

      <TableContainer component={Paper} style={{ maxHeight: 300 }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan", fontWeight: "bold" }}
              >
                مدل خودرو
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan", fontWeight: "bold" }}
              >
                وضعیت تعمیر
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan", fontWeight: "bold" }}
              >
                تاریخ پذیرش
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan", fontWeight: "bold" }}
              >
                ارسال تیکت
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan", fontWeight: "bold" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  align="center"
                  sx={{ fontFamily: "iranYekan", padding: "5px" }}
                >
                  {row.carModel}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "iranYekan",
                    justifyItems: "center",
                    padding: "5px",
                  }}
                >
                  <div className={styles.status}>{row.repairStatus}</div>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontFamily: "iranYekan", padding: "5px" }}
                >
                  {toFarsiNumber(row.receiveDate)}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "iranYekan",
                    justifyItems: "center",
                    padding: "5px",
                  }}
                >
                  <Button3 icon={faComments} onClick={""} />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "iranYekan",
                    justifyItems: "center",
                    padding: "5px",
                  }}
                >
                  <Button
                    className={`view_btn`}
                    variant="contained"
                    onClick={""}
                  >
                    مشاهده
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
}
