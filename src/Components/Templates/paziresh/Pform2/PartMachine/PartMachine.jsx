// PartMachine.js

import "./PartMachine.css";
import InputCheckBoxPartMachine from "../../../../Modules/InputChekBox/InputCheckBoxPartMachine";
import { toFarsiNumber } from "../../../../../utils/helper";

export default function PartMachine({
  part,
  onCheckboxChange,
  onDescriptionChange,
  fillForm,
}) {
  return (
    <div className="partmachine-wrapper">
      <span className="title-partmachine">
        {toFarsiNumber(part.value_number)} {part.name}
      </span>
      {part?.children?.map((belonging) => (
        <InputCheckBoxPartMachine
          key={belonging.name}
          value={belonging.id}
          name={belonging.name}
          fillForm={fillForm}
          onChange={(isChecked) =>
            onCheckboxChange(belonging.id, isChecked, belonging.value_number)
          }
          onDescriptionChange={(description) =>
            onDescriptionChange(belonging.id, description)
          }
        />
      ))}
    </div>
  );
}
