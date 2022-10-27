import React from "react";
import { Outlet } from "react-router-dom";
import UserProfile from "~/components/UserProfile";
import Header from "~/components/Header";

const UserProfilePage: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <UserProfile />
        <Outlet />
      </div>
    </>
  );
};

export default UserProfilePage;
