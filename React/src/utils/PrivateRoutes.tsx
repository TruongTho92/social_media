import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = Boolean(sessionStorage.getItem("access_token"));

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
