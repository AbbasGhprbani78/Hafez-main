import "./App.css";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import routes from "./Routes";

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasAccess = Boolean(sessionStorage.getItem("access"));
    const isAuthPage =
      location.pathname === "/login" || location.pathname === "/signup";

    if (!hasAccess && !isAuthPage) {
      navigate("/login", { replace: true });
      return;
    }
    console.log("run");
  }, []);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const router = useRoutes(routes);

  return <AuthGuard>{router}</AuthGuard>;
}

export default App;
