import styles from "./MapCar.module.css";

export default function MapCar({ selectPart, selectParts, fillForm }) {
  const handleItemClick = (number) => {
    selectPart(number);
  };

  const isActive = (number) => {
    const isPartSelected = selectParts?.some(
      (part) => part.value_number == number
    );
    return isPartSelected;
  };

  return (
    <div className={styles.grid_container}>
      <div className={styles.wrapper_top_row}>
        <div
          className={`${styles.item} ${styles.item1} ${
            isActive(1) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(1)}
        >
          1<div className={`${styles.path} ${styles.path_1}`}></div>
        </div>
        <div
          className={`${styles.item} ${styles.item2} ${
            isActive(2) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(2)}
        >
          2
        </div>
        <div
          className={`${styles.item} ${styles.item3} ${
            isActive(3) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(3)}
        >
          3
        </div>
        <div
          className={`${styles.item} ${styles.item4} ${
            isActive(4) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(4)}
        >
          4<div className={`${styles.path} ${styles.path_2}`}></div>
        </div>
      </div>
      <div className={styles.wrapper_top_row}>
        <div
          className={`${styles.item} ${styles.item5} ${
            isActive(5) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(5)}
        >
          5
        </div>
        <div
          className={`${styles.item} ${styles.item6} ${
            isActive(6) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(6)}
        >
          6
        </div>
        <div
          className={`${styles.item} ${styles.item7} ${
            isActive(7) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(7)}
        >
          7
        </div>
      </div>
      <div className={styles.wrapper_top_row}>
        <div
          className={`${styles.item} ${styles.item8} ${
            isActive(8) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(8)}
        >
          8<div className={`${styles.path} ${styles.path_3}`}></div>
        </div>
        <div
          className={`${styles.item} ${styles.item9} ${
            isActive(9) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(9)}
        >
          9
        </div>
        <div
          className={`${styles.item} ${styles.item10} ${
            isActive(10) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(10)}
        >
          10
        </div>
        <div
          className={`${styles.item} ${styles.item11} ${
            isActive(11) ? styles.activepart : ""
          }`}
          onClick={() => handleItemClick(11)}
        >
          11<div className={`${styles.path} ${styles.path_4}`}></div>
        </div>
      </div>
    </div>
  );
}
