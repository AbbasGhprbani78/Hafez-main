import React from "react";
import styles from "./ClearProgress.module.css";
import { toFarsiNumber } from "../../../utils/helper";

export default function ClearProgress({ name, value, onChange }) {
  return (
    <div className={styles.range_container}>
      <input
        className={styles.range_input}
        type="range"
        value={value}
        onChange={onChange}
        min="0"
        max="100"
        step="1"
        name={name}
      />
      <div className={styles.numbers}>
        <span className={styles.number}>{toFarsiNumber(0)}%</span>
        <span className={styles.number}>{toFarsiNumber(25)}%</span>
        <span className={styles.number}>{toFarsiNumber(50)}%</span>
        <span className={styles.number}>{toFarsiNumber(75)}%</span>
        <span className={styles.number}>{toFarsiNumber(100)}%</span>
      </div>

      <div className={styles.symbols}>
        <span className={styles.symbol}></span>
        <span className={styles.symbol}></span>
        <span className={styles.symbol}></span>
        <span className={styles.symbol}></span>
        <span className={styles.symbol}></span>
      </div>
    </div>
  );
}
