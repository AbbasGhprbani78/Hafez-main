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
            minWidth: "max-content",
            typography: "inherit",
            border: "1px solid #f2f2f2",
          }}
        >
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{ background: "#f7f4eb", fontFamily: "iranYekan" }}
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
