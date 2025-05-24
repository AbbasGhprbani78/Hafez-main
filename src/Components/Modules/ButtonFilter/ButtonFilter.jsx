import styles from "./Button.module.css";

export default function ButtonFilter({ text, OnClick, filterText, value }) {
  return (
    <button
      className={`${styles.filter_btn} 
      ${filterText === value ? styles.active :""}`}
      onClick={OnClick}
    >
      {text}
    </button>
  );
}
