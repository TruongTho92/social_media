import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = Boolean(localStorage.getItem("user"));

  return auth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
