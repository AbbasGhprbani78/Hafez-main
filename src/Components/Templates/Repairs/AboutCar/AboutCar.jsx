import styles from "./AboutCar.module.css";
import { Col } from "react-bootstrap";


export default function AboutCar() {


  return (
    <>
      <div className={styles.car_onfo_box}>
        <span className={`${styles.car_onfo_box_title} subtitle-project`}>
          مشخصات خودرو :
        </span>
        <div className={`${styles.wrap_colums} mt-4`}>
          <Col className={styles.info_col} xs={6} md={4}>
            <div className={styles.item_info_car}>
              <span className={styles.title_info_car}>شماره شاسی : </span>
              <span className={styles.text_info_car}>dsfdg518h4956f</span>
            </div>
            <div className={styles.item_info_car}>
              <span className={styles.title_info_car}>شماره شاسی : </span>
              <span className={styles.text_info_car}>dsfdg518h4956f</span>
            </div>
            <div className={styles.item_info_car}>
              <span className={styles.title_info_car}>شماره شاسی : </span>
              <span className={styles.text_info_car}>dsfdg518h4956f</span>
            </div>
          </Col>
          <Col className={styles.info_col} xs={6} md={4}>
            <div className={styles.item_info_car}>
              <span className={styles.title_info_car}>شماره شاسی : </span>
              <span className={styles.text_info_car}>dsfdg518h4956f</span>
            </div>
            <div className={styles.item_info_car}>
              <span className={styles.title_info_car}>شماره شاسی : </span>
              <span className={styles.text_info_car}>dsfdg518h4956f</span>
            </div>
            <div className={styles.item_info_car}>
              <span className={styles.title_info_car}>شماره شاسی : </span>
              <span className={styles.text_info_car}>dsfdg518h4956f</span>
            </div>
          </Col>
          <Col className={styles.info_col} xs={6} md={4}>
            <div className={styles.item_info_car}>
              <span className={styles.title_info_car}>شماره شاسی : </span>
              <span className={styles.text_info_car}>dsfdg518h4956f</span>
            </div>
            <div className={styles.item_info_car}>
              <span className={styles.title_info_car}>شماره شاسی : </span>
              <span className={styles.text_info_car}>dsfdg518h4956f</span>
            </div>
            <div className={styles.item_info_car}>
              <span className={styles.title_info_car}>شماره شاسی : </span>
              <span className={styles.text_info_car}>dsfdg518h4956f</span>
            </div>
          </Col>
        </div>
      </div>
    </>
  );
}
