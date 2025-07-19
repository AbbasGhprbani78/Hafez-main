import { useNavigate } from "react-router-dom";

export default function PAdminPrivate({ children }) {
  const navigate = useNavigate();

  return (
    <>
      {/* {
            authContext.userInfos.role === 'ADMIN' ? <>{children}</> : navigate('/login')
        } */}
    </>
  );
}
