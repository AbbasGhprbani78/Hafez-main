import { useEffect, useState } from "react";
import styles from "./TtypeOfService.module.css";
import InputCheckBox from "../InputChekBox/InputCheckBox";
import apiClient from "../../../config/axiosConfig";
import Grid from "@mui/material/Grid2";

export default function TypeOfService({
  handleServiceChange,
  selectedServices,
}) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getService = async () => {
      try {
        const res = await apiClient.get(`/app/get-service-type/`);
        if (res.status === 200) {
          setServices(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getService();
  }, []);

  return (
    <>
      <p className={`${styles.title_item_form}`}>نوع خدمات </p>
      <Grid container className={styles.options_services_wrappper}>
        {services?.map((service) => (
          <Grid size={{ xs: 12, sm: 4 }} key={service.id}>
            <InputCheckBox
              value={service.id}
              text={service.name}
              onChange={() => handleServiceChange(service.id)}
              checked={selectedServices.includes(service.id)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

{
  /* <InputCheckBoxAccessories
              value={service.id}
              checked={""}
              onChange={(isChecked) =>
                handleServiceChange(service.id, isChecked)
              }
              onDescriptionChange={(description) =>
                handleDescriptionChange(service.id, description)
              }
              name={service.name}
              accessoriesFill={selectedServices}
              allAccessories={services}
            /> */
}
