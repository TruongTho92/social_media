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
import { useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/Auth/userSlice";
import { Typography } from "antd";

import "./admin.scss";

const Admin = () => {
  const getAdminData = useAppSelector(getUser);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      {getAdminData.user.is_admin || getAdminData.user.is_supervisor ? (
        <div className="Admin">
          {/* Sider */}
          <Sidebar
            setIsOpenSidebar={setOpenSidebar}
            isOpenSidebar={openSidebar}
          />

          {/* HEADER */}
          <Header
            setIsOpenSidebar={setOpenSidebar}
            isOpenSidebar={openSidebar}
          />
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
      ) : (
        <div className="error__permission">
          <i className="fal fa-exclamation-circle error__icon-left "></i>
          <i className="fal fa-exclamation-circle error__icon-right "></i>
          <i className="fal fa-exclamation-circle error__icon-left-bottom "></i>
          <i className="fal fa-exclamation-circle error__icon-right-bottom "></i>
          <Typography className="error__permission-text">
            <span>
              Sorry!!{" "}
              <i className="fas fa-exclamation-triangle error__icon "></i>
            </span>{" "}
            You do not have permission to access this site
          </Typography>
        </div>
      )}
    </>
  );
};

export default Admin;
