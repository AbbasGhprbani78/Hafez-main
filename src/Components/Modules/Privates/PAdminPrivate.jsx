import { useNavigate } from "react-router-dom";

export default function PAdminPrivate({ children }) {
  const navigate = useNavigate();
  return <>{children}</>;
}
