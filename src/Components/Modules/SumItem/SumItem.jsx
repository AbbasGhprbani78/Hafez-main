import { Col, Row } from "react-bootstrap";
import styles from "./SumItem.module.css";
export default function SumItem({ title, price, color }) {
  return (
    <Row className={`${styles.sumItem_wrapper} gx-0`}>
      <Col md={7}>
        <span className={styles.title_price}>{title}</span>
      </Col>
      <Col md={5}>
        <span className={`${styles.number_price} ${styles[color]}`}>
          {price.toLocaleString("fa")}
        </span>
      </Col>
    </Row>
  );
}
