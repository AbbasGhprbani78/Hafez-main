import styles from "./ToggleSwitch.module.css";
export default function ToggleSwitch({ value, handleChange, name = "check box" }) {
  return (
    <>
      <label className={styles.toggle_switch}>
        <input name={name} checked={value} onChange={handleChange} type="checkbox" />
        <div className={styles.toggle_switch_background}>
          <div className={styles.toggle_switch_handle}></div>
        </div>
      </label>
    </>
  );
}
