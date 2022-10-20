import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import styles from "./accountPostStyles.module.scss";

type Props = {
  id?: number | null;
  image?: string;
};

const AccountPost: React.FC<Props> = ({ id, image }) => {
  const location = useLocation();

  return (
    <>
      <div className={styles.postImg}>
        <Link to={`/account-post/${id}`} state={{ background: location }}>
          <img src={`${image}`} alt="" />
        </Link>
        <Outlet />
      </div>
    </>
  );
};

export default AccountPost;
