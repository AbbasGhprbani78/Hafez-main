// import { useEffect, useRef, useState } from "react";
// import CreatableSelect from "react-select/creatable";
// import { components } from "react-select";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

// /* textarea input سفارشی */
// const MultilineInput = (props) => {
//   const { innerRef, innerProps, value, selectProps } = props;

//   const textareaRef = useRef(null);

//   useEffect(() => {
//     if (!textareaRef.current) return;

//     textareaRef.current.style.height = "auto";
//     textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";

//     selectProps.onHeightChange?.(textareaRef.current.scrollHeight);
//   }, [value, selectProps]);

//   return (
//     <textarea
//       ref={(el) => {
//         textareaRef.current = el;
//         innerRef(el);
//       }}
//       {...innerProps}
//       value={value}
//       rows={1}
//       style={{
//         resize: "none",
//         overflow: "hidden",
//         whiteSpace: "pre-wrap",
//         wordBreak: "break-word",
//         width: "100%",
//         background: "transparent",
//         border: "none",
//         outline: "none",
//         fontFamily: "iranYekan",
//         fontSize: "14px",
//         color: "var(--color-3)",
//         direction: "rtl",
//       }}
//     />
//   );
// };

// const DropdownIndicator = (props) => (
//   <components.DropdownIndicator {...props}>
//     <FontAwesomeIcon icon={faAngleDown} />
//   </components.DropdownIndicator>
// );

// export default function MultilineCreatableSelect({
//   items,
//   name,
//   value,
//   onChange,
//   label,
// }) {
//   const [options, setOptions] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [selected, setSelected] = useState(null);
//   const [height, setHeight] = useState(44);

//   useEffect(() => {
//     setOptions(
//       items?.map((i) => ({
//         label: i.value,
//         value: i.value_id,
//       })) || []
//     );
//   }, [items]);

//   const handleBlur = () => {
//     if (!inputValue.trim()) return;

//     const custom = { label: inputValue, value: inputValue };

//     if (!options.find((o) => o.value === inputValue)) {
//       setOptions((p) => [...p, custom]);
//     }

//     setSelected(custom);
//     onChange(name, inputValue);
//   };

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       minHeight: height,
//       alignItems: "flex-start",
//       padding: "6px 10px",
//       direction: "rtl",
//     }),
//     valueContainer: (base) => ({
//       ...base,
//       padding: 0,
//     }),
//     input: () => ({
//       display: "none",
//     }),
//   };

//   return (
//     <>
//       {label && <label className="label_input">{label}</label>}

//       <CreatableSelect
//         components={{
//           Input: MultilineInput,
//           DropdownIndicator,
//         }}
//         styles={customStyles}
//         options={options}
//         value={selected}
//         inputValue={inputValue}
//         onInputChange={setInputValue}
//         onBlur={handleBlur}
//         isClearable
//         name={name}
//         onChange={(opt) => {
//           setSelected(opt);
//           onChange(name, opt?.value || null);
//         }}
//         onHeightChange={(h) => setHeight(Math.max(44, h))}
//       />
//     </>
//   );
// }

import { useEffect, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";

const MultilineInput = (props) => {
  const { innerRef, value, selectProps } = props;
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";

    selectProps.onHeightChange?.(textareaRef.current.scrollHeight);
  }, [value, selectProps]);

  return (
    <textarea
      ref={(el) => {
        textareaRef.current = el;
        innerRef(el);
      }}
      value={value || ""}
      rows={1}
      onChange={(e) => {
        selectProps.onInputChange(e.target.value, {
          action: "input-change",
        });
      }}
      style={{
        resize: "none",
        overflow: "hidden",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        width: "100%",
        background: "transparent",
        border: "none",
        outline: "none",
        fontFamily: "iranYekan",
        fontSize: "14px",
        lineHeight: "1.7",
        color: "var(--color-3)",
        direction: "rtl",
        backgroundColor: "var(--color-20)",
      }}
    />
  );
};

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <FontAwesomeIcon icon={faAngleDown} />
  </components.DropdownIndicator>
);

export default function MultilineCreatableSelect({
  items = [],
  name,
  value,
  onChange,
  label,
  placeHolder,
}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(null);
  const [height, setHeight] = useState(44);
  const [menuOpen, setMenuOpen] = useState(false);

  /* map items */
  useEffect(() => {
    setOptions(
      items.map((i) => ({
        label: i.value,
        value: i.value_id,
      }))
    );
  }, [items]);

  /* sync external value */
  useEffect(() => {
    if (!value) {
      setSelected(null);
      setInputValue("");
      return;
    }

    const found = options.find((o) => o.value === value || o.label === value);

    if (found) {
      setSelected(found);
      setInputValue(found.label);
    } else {
      setSelected({ label: value, value });
      setInputValue(value);
    }
  }, [value, options]);

  const handleInputChange = (val, meta) => {
    if (meta.action === "input-change") {
      setInputValue(val);
      setMenuOpen(true);
    }
  };

  const handleBlur = () => {
    if (!inputValue.trim()) {
      setSelected(null);
      onChange(name, null, null);
      setMenuOpen(false);
      return;
    }

    const custom = { label: inputValue, value: inputValue };

    if (!options.some((o) => o.value === inputValue)) {
      setOptions((prev) => [...prev, custom]);
    }

    setSelected(custom);
    onChange(name, inputValue, inputValue);
    setMenuOpen(false);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: height,
      height: "auto",
      alignItems: "flex-start",
      padding: "6px 10px",
      direction: "rtl",
      borderRadius: "var(--border-radius-1)",
      backgroundColor: "var(--color-20)",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),
    input: () => ({
      display: "none",
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "0.75rem",
      color: "var(--color-21)",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 999,
    }),
  };

  return (
    <>
      {label && <label className="label_input">{label}</label>}

      <Box sx={{ width: "100%", marginTop: ".5rem" }}>
        <CreatableSelect
          components={{
            Input: MultilineInput,
            DropdownIndicator,
          }}
          styles={customStyles}
          options={options}
          value={selected}
          inputValue={inputValue}
          placeholder={placeHolder}
          isClearable
          name={name}
          menuIsOpen={menuOpen}
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
          onInputChange={handleInputChange}
          onBlur={handleBlur}
          onChange={(opt) => {
            setSelected(opt);
            setInputValue(opt?.label || "");
            setMenuOpen(false);
            onChange(name, opt?.value || null, opt?.label || null);
          }}
          onHeightChange={(h) => setHeight(Math.max(44, h))}
        />
      </Box>
    </>
  );
}
