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
import { ChnageDate } from "../../../Modules/ChnageDate/ChnageDate";

export default function Table({ pendingTask = [] }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faBoxArchive} />
        <span>تسک‌های در حال اجرا</span>
      </div>

      <TableContainer component={Paper} style={{ height: "100%" }}>
        <MuiTable
          stickyHeader
          aria-label="sticky table"
          sx={{
            minWidth: "max-content",
          }}
        >
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
              {/* <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan", fontWeight: "bold" }}
              >
                ارسال تیکت
              </TableCell> */}
              {/* <TableCell
                align="center"
                sx={{ fontFamily: "iranYekan", fontWeight: "bold" }}
              >
                عملیات
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingTask.length > 0 ? (
              pendingTask?.map((row) => (
                <TableRow key={row?.id}>
                  <TableCell
                    align="center"
                    sx={{ fontFamily: "iranYekan", padding: "5px" }}
                  >
                    {toFarsiNumber(row?.model)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "iranYekan",
                      justifyItems: "center",
                      padding: "5px",
                    }}
                  >
                    <div className={styles.status}>{row?.status}</div>
                  </TableCell>
                  <ChnageDate date={row?.admission_date} />

                  {/* <TableCell
                    align="center"
                    sx={{
                      fontFamily: "iranYekan",
                      justifyItems: "center",
                      padding: "5px",
                    }}
                  >
                    <Button3 icon={faComments} onClick={""} />
                  </TableCell>  */}
                  {/* <TableCell
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
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <p
                style={{
                  padding: "10px",
                }}
              >
                هیچ تسکی وجود ندارد !
              </p>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
}
