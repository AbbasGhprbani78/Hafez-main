import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid2";

const steps = [
  { id: "step_1", label: "اطلاعات مشتری" },
  { id: "step_2", label: "اطلاعات خودرو" },
  { id: "step_3", label: "اظهارات مشتری" },
  { id: "step_4", label: "فرم تایید" },
];

export default function MuiStepper({ activeStep = 0 }) {
  return (
    <Grid
      size={{ xs: 12 }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
        width: "100%",
        direction: "ltr",
      }}
      marginY={{ xs: ".5rem", sm: ".6rem", md: ".75rem", lg: "1rem" }}
    >
      <Grid
        size={{ xs: 12, sm: 9, md: 8, lg: 6, xl: 5, xxl: 4 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Stepper
          sx={{
            width: "100%",
            "& .MuiStepLabel-label": {
              fontFamily: "iranYekan",
              fontSize: "0.9rem",
              color: "#333",
            },
            "& .MuiStep-root": {
              backgroundColor: "#f9f9f9",
            },
            "& .MuiStepIcon-root": {
              color: "#ccc",
              "&.Mui-completed": {
                color: "var(--color-3)",
              },
              "&.Mui-active": {
                color: "var(--color-3)",
              },
            },
          }}
          activeStep={activeStep - 1}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label.id}>
              <StepLabel id={label.id}>{label.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
}
