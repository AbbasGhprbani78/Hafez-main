import styles from "./Loading.module.css";
export default function LoadingForm() {
  return (
    <div className={styles.loading_form_wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
}
