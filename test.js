{
  data?.repairmen_status?.length > 0 &&
    data?.repairmen_status.map((item) => (
      <TableRow key={item.id}>
        <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
          {toFarsiNumber(item?.repairman_code)}
        </TableCell>
        <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
          {toFarsiNumber(item?.repairman_name)}
        </TableCell>
        <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
          {Array.isArray(item.repairman_specialties) &&
          item.repairman_specialties.length > 0
            ? item.repairman_specialties.map((t) => t).join(" / ")
            : "Invalid data"}
        </TableCell>
        <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
          {`${toFarsiNumber(item?.total_hours)} ساعت کار در روز`}
        </TableCell>
        <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
          {`${toFarsiNumber(item?.free_hours)}`}
        </TableCell>
        <TableCell align="center" sx={{ fontFamily: "iranYekan" }}>
          <div
            style={{
              color: "#fff",
              padding: "4px 10px",
              borderRadius: "100px",
            }}
            className={` ${
              item?.work_status === "free"
                ? "free"
                : item?.work_status === "in_repair"
                ? "under"
                : "hide"
            }`}
          >
            {item?.work_status === "free"
              ? "آزاد"
              : item?.work_status === "in_repair"
              ? "درحال تعمیر"
              : "Hide"}
          </div>
        </TableCell>
      </TableRow>
    ));
}
