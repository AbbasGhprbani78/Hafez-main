import { useEffect, useState } from "react";

export default function SearchableSelect({
  icon,
  label,
  items = [],
  name,
  placeHolder,
  isDesirableValue,
  onChange,
  value,
}) {
  const [search, setSearch] = useState(value || "");
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setSearch(value || "");
  }, [value]);

  const filteredOptions = items.filter((opt) =>
    opt.value.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (selectedValue) => {
    setSearch(selectedValue);
    onChange(name, selectedValue);
    setShowOptions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      const exists = items.some((item) => item.value === search);
      const finalValue = exists ? search : search;
      onChange(name, finalValue);
      setShowOptions(false);
    }, 150);
  };

  return (
    <div className="relative w-full max-w-md">
      {label && <label className="block mb-1">{label}</label>}
      <div className="relative">
        <input
          className="w-full p-2 border rounded"
          type="text"
          value={search}
          placeholder={placeHolder || "Select or type..."}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowOptions(true);
          }}
          onFocus={() => setShowOptions(true)}
          onBlur={handleBlur}
        />

        {icon && (
          <div className="absolute top-2 right-2 text-gray-400 pointer-events-none">
            <i className={icon} />
          </div>
        )}
      </div>

      {showOptions && (
        <ul className="absolute z-10 w-full bg-white border rounded max-h-40 overflow-auto mt-1 shadow">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt.value_id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(opt.value)}
              >
                {opt.value}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">
              برای انتخاب "{search}" اینتر بزنید
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
