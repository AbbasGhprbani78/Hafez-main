import styles from './InputPrice.moduel.css'
export default function InputPrice({ lable, value, onChange, placeholder }) {
  return (
    <div className={`${styles.input_container}`}>
      <label>{lable}</label>
      <div className={styles.input_content_wrapper}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
