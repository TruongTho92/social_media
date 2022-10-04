import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = Boolean(sessionStorage.getItem("user"));

  return auth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
