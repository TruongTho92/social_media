import React from "react";
import Header from "~/components/Header";
import UpdatePassword from "~/components/UpdatePassword";
import styles from "./updatePassStyles.module.scss";

const UpdatePasswordPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.udpatePage}>
        <UpdatePassword />
      </div>
    </>
  );
};

export default UpdatePasswordPage;
