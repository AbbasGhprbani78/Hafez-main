
import styles from './InputCheckBox.module.css'
export default function InputCheckBox({ marginRight, onChange, checked, value, text }) {
    return (
      <div className={`${styles.checkbox_container} mx-2 ${marginRight}`}>
        <input
          type="checkbox"
          className={styles.check_input}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <label className="lable-check">{text}</label>
      </div>
    );
}

