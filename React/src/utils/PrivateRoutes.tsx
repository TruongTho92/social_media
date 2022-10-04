import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "~/app/hooks";
import { getLoginSuccess } from "~/features/Auth/AuthSlice";

const PrivateRoutes = () => {
  const isLogin = useAppSelector(getLoginSuccess);

  return isLogin ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
