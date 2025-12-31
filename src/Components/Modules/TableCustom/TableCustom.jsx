import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import "./TableCustomStyle.css";

function TableCustom({
  children,
  columns,
  rows = [],
  onChange,
  page = 0,
  rowsPerPage = 5,
  total = 10,
  maxHeight = 370,
  ishidepageination = false,
}) {
  return (
    <Grid
      container
      item
      size={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TableContainer
        id="table_custome_info"
        style={{
          maxHeight: maxHeight,
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
              {columns.map((item, i) => (
                <TableCell
                  align="center"
                  key={i}
                  sx={{ background: "#f4f1e8", fontFamily: "iranYekan" }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length !== 0 ? (
              children
            ) : (
              <Grid
                container
                size={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "1rem",
                  margin: "1rem 0",
                }}
              >
                <FontAwesomeIcon
                  color="#3e846b"
                  size="lg"
                  icon={faCircleInfo}
                />
                <Typography style={{ fontFamily: "iranYekan" }} variant="body2">
                  داده‌ای برای نمایش وجود ندارد.
                </Typography>
              </Grid>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!ishidepageination && (
        <Grid
          item
          size={12}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
          }}
          spacing={1}
        >
          <IconButton
            disabled={(page + 2) * rowsPerPage >= total}
            onClick={() => onChange(page + 2)}
            aria-label="double_next"
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
          <IconButton
            disabled={(page + 1) * rowsPerPage >= total}
            onClick={() => onChange(page + 1)}
            aria-label="next"
          >
            <ChevronRightIcon />
          </IconButton>
          <Typography className="text_navigation" style={{ direction: "ltr" }}>
            {`${page * rowsPerPage + 1} - ${Math.min(
              (page + 1) * rowsPerPage,
              total
            )} of ${total}`}{" "}
          </Typography>
          <IconButton
            disabled={page <= 0}
            onClick={() => onChange(page - 1)}
            aria-label="previous"
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            disabled={page <= 1}
            onClick={() => onChange(page - 2)}
            aria-label="double_previous"
          >
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}

export default TableCustom;
