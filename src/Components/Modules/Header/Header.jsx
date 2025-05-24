import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ResponsiveExample from '../Offcanvas/OffcanvasMenu'
import Button2 from "../Button2/Button2";
import { Typography } from '@mui/material';
export default function Header({ title, disabledButton = false, handleClick, disableBottomTitle = false }) {
  const [isShowSideBar, setIsShowSideBar] = useState(false);

  return (
    <>
      <ResponsiveExample
        show={isShowSideBar}
        setIsShowSideBar={setIsShowSideBar}
      />
      <header className={`${styles.header}`} style={{ width: "100%" }}>
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
            fontSize={{ lg: "1.3rem", xl: "1.4rem", xxl: "1.5rem" }}
            className={styles.title_page}
          >{title}</Typography>
          <div className={styles.logo_wrapper}>
            <img src="/image/1.svg" alt="logo" />
          </div>
          {disabledButton ? <></> : <div className={styles.header_btn_wrapper}>
            <Button2 style="search_btn" onClick={handleClick} icon={faPlus} >{"پذیرش جدید"}</Button2>
          </div>}
        </div>
        {!disableBottomTitle &&
          <Typography
            display={{ xs: "block", md: "none" }}
            marginTop={{ xs: ".4rem", sm: ".5rem", md: ".6rem" }}
            fontSize={{ xs: ".9rem", sm: "1rem", md: "1.2rem" }}
            variant="body2" className={styles.title_page}>{title}
          </Typography>}

      </header>
    </>
  );
}

