import React from "react";
import UpdatePassword from "~/components/UpdatePassword";
import styles from "./updatePassStyles.module.scss";
type Props = {};

const UpdatePasswordPage = (props: Props) => {
  return (
    <div className={styles.udpatePage}>
      <UpdatePassword />
    </div>
  );
};

export default UpdatePasswordPage;
