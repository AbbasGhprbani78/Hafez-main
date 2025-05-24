import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

export default function DataInput({
  value,
  onChange,
  placeHolder = "زمان و تاریخ مدنظر را انتخاب کنید!",
}) {
  const displayValue = value
    ? new DateObject({
        date: value,
        calendar: persian,
        locale: persian_fa,
      })
    : null;

  return (
    <div className="estimate_input">
      <div className="input_content_wrapper">
        <DatePicker
          placeholder={placeHolder}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          value={displayValue}
          onChange={(dateObject) => {
            const gregorianDate = dateObject?.toDate();
            onChange(gregorianDate);
          }}
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}
