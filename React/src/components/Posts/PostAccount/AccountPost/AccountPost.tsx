import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "~/app/hooks";
import {
  getUsersCommented,
  getUsersLiked,
} from "~/features/accountPost/postDetail/postDetailSlice";

import styles from "./accountPostStyles.module.scss";

type Props = {
  id?: number | null;
  image?: string;
};

const AccountPost: React.FC<Props> = ({ id, image }) => {
  const location = useLocation();
  const usersLiked = useAppSelector(getUsersLiked);
  const usersCommentd = useAppSelector(getUsersCommented);

  return (
    <>
      <div className={styles.postImg}>
        <Link to={`/account-post/${id}`} state={{ background: location }}>
          <img src={`${image}`} alt="" />
        </Link>
        <div className={styles.postImgHover}>
          <div className={styles.postItemHoverItem}>
            <i className="fas fa-heart"></i>
            <span>{usersLiked.length}</span>
          </div>
          <div className={styles.postItemHoverItem}>
            <i className="fas fa-comment"></i>
            <span>{usersCommentd.length}</span>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default AccountPost;
