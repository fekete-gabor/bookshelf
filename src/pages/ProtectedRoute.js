import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/app_context";

const ProtectedRoute = ({ redirectPath = "/landing", children }) => {
  const { user } = useAppContext();
  const { email } = user;

  if (!email) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
