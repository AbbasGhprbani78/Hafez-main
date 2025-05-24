import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "./ReactDropdownStyles.css"

//Icons 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';


function ReactDropdown({
    mainValue,
    optionsProp,
    handleChange,
    reactDropdownControl = "first_elm_dropdown",
    reactDropClass = "custome_react_dropdown",
    reactDropArrowClassName = "arrow_react_drop",
    placeholder = "Select an option" }) {

    const selectedItem = optionsProp.find(item => item.value === mainValue) || null;
    const handleChangeDropDown = (selectedOption) => {
        handleChange(selectedOption.value);
    };

    return (
        <Dropdown
            options={optionsProp}
            onChange={handleChangeDropDown}
            value={selectedItem}
            placeholder={placeholder}
            controlClassName={reactDropdownControl}
            className={reactDropClass}
            arrowClassName={reactDropArrowClassName}
            arrowClosed={<FontAwesomeIcon icon={faAngleDown} />}
            arrowOpen={<FontAwesomeIcon icon={faAngleUp} />}

        />
    );
}

export default ReactDropdown
