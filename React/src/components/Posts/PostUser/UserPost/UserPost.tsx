import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import styles from "./userPostStyles.module.scss";

type Props = {
  id?: number | null;
  image?: string;
};

const UserPost: React.FC<Props> = ({ id, image }) => {
  return (
    <>
      <div className={styles.postImg}>
        <Link to={`/user-post/${id}`}>
          <img src={`${image}`} alt="" />
        </Link>
      </div>
    </>
  );
};

export default UserPost;
