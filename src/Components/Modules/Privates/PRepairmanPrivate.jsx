import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PRepairmanPrivate({ children }) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const typeStr = sessionStorage.getItem("type");

    if (!typeStr) {
      setIsAuthorized(false);
      return;
    }

    try {
      const types = JSON.parse(typeStr);

      if (!Array.isArray(types)) {
        setIsAuthorized(false);
        return;
      }

      if (types.includes("repairman")) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Error parsing type from sessionStorage:", error);
      setIsAuthorized(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized === false) {
      navigate("/login", { replace: true });
    }
  }, [isAuthorized, navigate]);

  if (isAuthorized === null) return null;
  if (isAuthorized) return <>{children}</>;

  return null;
}
