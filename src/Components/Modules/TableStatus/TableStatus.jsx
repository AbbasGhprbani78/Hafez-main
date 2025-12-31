import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

export default function TableStatus({
  children,
  Gridumns = [],
  rows,
  page,
  onChange,
  rowsPerPage = 8,
  notPagination,
}) {
  return (
    <>
      <TableContainer
        style={{
          maxHeight: 500,
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
        className="scroll-right"
      >
        <Table
          stickyHeader
          sx={{
            minWidth: "max-content",
          }}
        >
          <TableHead sx={{ background: "#f4f1e8" }}>
            <TableRow>
              {Gridumns.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{
                    background: "#f4f1e8",
                    fontFamily: "iranYekan",
                    color: "var(--color-3)",
                    fontWeight: "bold",
                  }}
                  align="center"
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      {!notPagination && (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChange}
          sx={{
            direction: "ltr",
            alignItems: "flex-start",
          }}
        />
      )}
    </>
  );
}
