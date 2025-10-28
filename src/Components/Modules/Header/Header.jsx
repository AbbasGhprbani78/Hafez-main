import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ResponsiveExample from "../Offcanvas/OffcanvasMenu";
import Button2 from "../Button2/Button2";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Header({ title, isPanel, routes }) {
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <ResponsiveExample
        show={isShowSideBar}
        setIsShowSideBar={setIsShowSideBar}
        routes={routes}
      />
      <header className={`no-print ${styles.header}`} style={{ width: "100%" }}>
        <div className={styles.header_content}>
          <div
            className={styles.wrap_icon}
            onClick={() => setIsShowSideBar(true)}
          >
            <FontAwesomeIcon icon={faAlignRight} className={styles.icon_m} />
          </div>
          <Typography
            variant="body1"
            display={{ xs: "none", md: "block" }}
            fontSize={{ md: "1rem" }}
            className={styles.title_page}
          >
            {title}
          </Typography>
          {/* <div className={styles.logo_wrapper}>
            <img src="/image/1.svg" alt="logo" />
          </div> */}
          {isPanel ? (
            <div className={styles.profile_header}>
              <div className={styles.profile_image_wrapper}>
                <img src="/public/image/4.png" alt="image profile" />
              </div>
              <span className={styles.name_porfile}>عباس قربانی</span>
            </div>
          ) : (
            <div className={styles.header_btn_wrapper}>
              <Button2
                style="search_btn"
                icon={faPlus}
                onClick={() => navigate("/paziresh")}
              >
                {"پذیرش جدید"}
              </Button2>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

{
  /* {!disableBottomTitle && (
          <Typography
            display={{ xs: "block", md: "none" }}
            marginTop={{ xs: ".4rem", sm: ".5rem", md: ".6rem" }}
            fontSize={{ xs: ".9rem", sm: "1rem", md: "1.2rem" }}
            variant="body2"
            className={styles.title_page}
          >
            {title}
          </Typography>
        )} */
}
