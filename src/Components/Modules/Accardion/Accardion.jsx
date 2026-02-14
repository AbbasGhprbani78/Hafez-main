import styles from "./Accardion.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Accardion({ title, content }) {
  return (
    <>
      <Accordion
        sx={{
          marginBottom: "1.3rem",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#000" }} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            color: "#15616d",
            fontWeight: "600",
            fontSize: "1rem",
            fontFamily: "iranYekan, sans-serif !important;",
          }}
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>{content}</AccordionDetails>
      </Accordion>
    </>
  );
}
