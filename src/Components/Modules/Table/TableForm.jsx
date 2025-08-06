import "./Table.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function TableForm({ columns, children }) {
  return (
    <>
      <TableContainer sx={{ maxHeight: 340 }}>
        <Table
          aria-label="dynamic table"
          stickyHeader
          sx={{
            typography: "inherit",
            border: "1px solid #f2f2f2",
            minWidth: "max-content",
          }}
        >
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    background: "#f7f4eb",
                    fontFamily: "iranYekan",
                    textAlign: "center",
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
