import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "./DataInput.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DataInput({
  value,
  onChange,
  placeHolder = "زمان و تاریخ مدنظر را انتخاب کنید!",
}) {
  const displayValue = value
    ? new DateObject({
        date: new Date(value),
        calendar: persian,
        locale: persian_fa,
      })
    : null;

  return (
    <div className="estimate_input">
      <div className="input_content_wrapper">
        <div className="datepicker_with_clear">
          <DatePicker
            className="teal"
            placeholder={placeHolder}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD HH:mm"
            calendarPosition="bottom-right"
            value={displayValue}
            plugins={[<TimePicker key={1} position="bottom" />]}
            onChange={(dateObject) => {
              const gregorianDate = dateObject?.toDate();
              onChange(gregorianDate);
            }}
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              fontFamily: "iranYekan",
            }}
          />

          {value ? (
            <button
              type="button"
              className="clear-date-btn"
              aria-label="پاک کردن تاریخ"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(null);
              }}
            >
              <FontAwesomeIcon icon={faXmark} fontSize={18} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
