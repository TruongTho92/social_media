import { Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import MoreAccount from "./Pages/MoreAccount";
import NotFound from "./Pages/NotFound";

const Admin = () => {
  return (
    <div className="Admin">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="more-account" element={<MoreAccount />} />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Admin;
