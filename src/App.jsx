import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";

function App() {
  const router = useRoutes(routes);

  return <>{router}</>;
}

export default App;

// const AuthGuard = ({ children }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const hasAccess = Boolean(sessionStorage.getItem("access"));
//     const isAuthPage =
//       location.pathname === "/login" || location.pathname === "/signup";

//     if (!hasAccess && !isAuthPage) {
//       navigate("/login", { replace: true });
//       return;
//     }
//   }, []);

//   return children;
// };

// AuthGuard.propTypes = {
//   children: PropTypes.node.isRequired,
// };
