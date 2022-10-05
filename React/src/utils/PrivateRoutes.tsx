import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isLogin = Boolean(sessionStorage.getItem("user"));

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
