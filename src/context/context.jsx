import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataForm, setDataForm] = useState("");
  const [idForm, setIdForm] = useState("");

  const [currentTab, setCurrentTab] = useState(1);

  const toggleOpen = () => {
    setIsOpen((prevStatus) => !prevStatus);
  };
  return (
    <MyContext.Provider
      value={{
        toggleOpen,
        isOpen,
        dataForm,
        setDataForm,
        setIdForm,
        idForm,
        currentTab,
        setCurrentTab,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
