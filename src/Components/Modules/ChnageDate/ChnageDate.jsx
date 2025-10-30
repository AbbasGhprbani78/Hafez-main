import { useEffect, useState } from "react";
import moment from "jalali-moment";
import { toFarsiNumber } from "../../../utils/helper";
import { TableCell } from "@mui/material";
export function ChnageDate({ date }) {
  const [persianDate, setPersianDate] = useState("");
  useEffect(() => {
    const gregorianDate = date?.slice(0, 10);
    const convert = convertGregorianToPersian(gregorianDate);
    setPersianDate(convert);
  }, [date]);
  return (
    <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
      {toFarsiNumber(persianDate)}
    </TableCell>
  );
}

export function convertPersianToGregorian(persianDate) {
  const m = moment.from(persianDate, "fa", "YYYY/MM/DD");
  if (m.isValid()) {
    return m.locale("en").format("YYYY-MM-DD");
  } else {
    return "Invalid Persian Date";
  }
}
export function convertGregorianToPersian(gregorianDate) {
  if (!gregorianDate || typeof gregorianDate !== "string") {
    return "Invalid Date";
  }

  const [year, month, day] = gregorianDate.split("-");
  const formattedDate = `${year}-${month}-${day}`;

  const m = moment(formattedDate, "YYYY-MM-DD");
  if (m.isValid()) {
    return m.locale("fa").format("YYYY/MM/DD");
  } else {
    return "Invalid Gregorian Date";
  }
}
