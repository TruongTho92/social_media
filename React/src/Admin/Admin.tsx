import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import DashboardPage from "./Pages/DashboardPage";
import ManagePosts from "./Pages/ManagePosts";
import ManageUsers from "./Pages/ManageUsers";
import MoreAccount from "./Pages/MoreAccount";
import NotFound from "./Pages/NotFound";
import ProfilePage from "./Pages/ProfilePage";
import UpdatePasswordPage from "./Pages/UpdatePasswordPage";
import UpdateProfilePage from "./Pages/UpdateProfilePage";

const Admin = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="Admin">
      {/* Sider */}
      <Sidebar setIsOpenSidebar={setOpenSidebar} isOpenSidebar={openSidebar} />

      {/* HEADER */}
      <Header setIsOpenSidebar={setOpenSidebar} isOpenSidebar={openSidebar} />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="update-profile" element={<UpdateProfilePage />} />
        <Route path="update-password" element={<UpdatePasswordPage />} />

        <Route path="manage-posts" element={<ManagePosts />} />
        <Route path="manage-users" element={<ManageUsers />} />

        <Route path="more-account" element={<MoreAccount />} />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Admin;
