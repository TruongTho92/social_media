import React from "react";
import { Outlet } from "react-router-dom";
import UserProfile from "~/components/UserProfile";

const UserProfilePage: React.FC = () => {
  return (
    <div>
      <UserProfile />
      <Outlet />
    </div>
  );
};

export default UserProfilePage;
