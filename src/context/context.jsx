import { createContext, useState } from "react";
import apiClient from "../config/axiosConfig";
import { useEffect } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [dataForm, setDataForm] = useState("");
  const [idForm, setIdForm] = useState("");
  const [currentTab, setCurrentTab] = useState(1);
  const [userInfo, setUserInfo] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await apiClient("user/profile/me/");
      if (response.status === 200) {
        console.log(response.data);
        setUserInfo(response.data.permissions_tree);
        setPermissions(response.data.permissions_tree || []);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleOpen = () => {
    setIsOpen((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access");
    if (token && window.location.pathname !== "/login") {
      getUserInfo();
    }
  }, []);
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
        userInfo,
        permissions,
        setPermissions,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
