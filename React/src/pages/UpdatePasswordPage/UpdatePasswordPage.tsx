import React from "react";
import UpdatePassword from "~/components/UpdatePassword";
import styles from "./updatePassStyles.module.scss";

const UpdatePasswordPage: React.FC = () => {
  return (
    <div className={styles.udpatePage}>
      <UpdatePassword />
    </div>
  );
};

export default UpdatePasswordPage;
