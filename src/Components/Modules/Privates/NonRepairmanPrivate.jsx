import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NonRepairmanPrivate({ children }) {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const typeStr = sessionStorage.getItem("type");

    if (!typeStr) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const types = JSON.parse(typeStr);

      if (!Array.isArray(types)) {
        navigate("/login", { replace: true });
        return;
      }

      if (types.includes("repairman")) {
        navigate("/p-repairman/", { replace: true });
      } else {
        setAllowed(true);
      }
    } catch (error) {
      console.error(error);
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  if (!allowed) return null;
  return <>{children}</>;
}
