import React from "react";
import Header from "~/components/Header";
import UpdatePassword from "~/components/UpdatePassword";

const UpdatePasswordPage: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <UpdatePassword />
      </div>
    </>
  );
};

export default UpdatePasswordPage;
