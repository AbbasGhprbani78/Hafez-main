import "./App.css";
import { useRoutes, useNavigate } from "react-router-dom";
import routes from "../Routes";
import { useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isUserLogin = async () => {
  //     const refresh = sessionStorage.getItem("refresh");
  //     if (refresh) {
  //       const body = {
  //         refresh: refresh,
  //       };

  //       try {
  //         const response = await axios.post(
  //           `${apiUrl}/user/token/refresh/`,
  //           body
  //         );
  //         if (response.status === 200) {
  //           window.sessionStorage.setItem("access", response.data.access);
  //           const level = sessionStorage.getItem("level");
  //           if (level === "one") {
  //             navigate("/login");
  //           }
  //         }
  //       } catch (e) {
  //         if (e.response.status === 401) {
  //           sessionStorage.removeItem("access");
  //           sessionStorage.removeItem("refresh");
  //           navigate("/login");
  //         }
  //       }
  //     }
  //   };

  //   isUserLogin();
  // }, []);

  let router = useRoutes(routes);
  return <>{router}</>;
}

export default App;
