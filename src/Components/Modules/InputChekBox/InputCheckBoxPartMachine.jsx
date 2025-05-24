import { useEffect, useState } from 'react'
import styles from "./InputCheckBox.module.css";

export default function InputCheckBoxPartMachine({ value, onChange, onDescriptionChange, name, fillForm }) {
    const [checked, setChecked] = useState(false);
    const [description, setDescription] = useState('');

    
    useEffect(() => {
        const matchingItem = fillForm?.find(item => item.parts == value);
        if (matchingItem) {
            setChecked(true);
            setDescription(matchingItem.description || '');
            // onChange(true);
            // onDescriptionChange(matchingItem.description || '');
        }
    }, []);


    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        onChange(isChecked);
        if (!isChecked) {
            setDescription('');
            onDescriptionChange('');
        }
    };

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        onDescriptionChange(newDescription);
    };

    return (
      <>
        <div className={`${styles.checkbox_container} mx-2`}>
          <input
            type="checkbox"
            className={styles.check_input}
            value={value}
            onChange={handleChange}
            checked={checked}
          />

          <label className={styles.label_check}>{name}</label>
        </div>
        {checked && (
          <div className={styles.wrap_checkbox_dec}>
            <textarea
              className={`${styles.wrap_checkbox} ${styles.textarea}`}
              placeholder="توضیحات"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        )}
      </>
    );
}
