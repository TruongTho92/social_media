import React from "react";
import LazyLoad from "react-lazy-load";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "~/app/hooks";
import {
  getPostDetail,
  getUsersCommented,
  getUsersLiked,
} from "~/features/accountPost/postDetail/postDetailSlice";
import styles from "./accountPostStyles.module.scss";

type Props = {
  id?: number | null;
  image?: string[];
};

const AccountPost: React.FC<Props> = ({ id, image }) => {
  const location = useLocation();
  const usersLiked = useAppSelector(getUsersLiked);
  const usersCommentd = useAppSelector(getUsersCommented);

  return (
    <>
      <div className={styles.postImg}>
        <Link to={`/account-post/${id}`} state={{ background: location }}>
          {image && image?.length > 1 ? (
            <div className={styles.imageMutiple}>
              <div className={styles.iconDuplicate}>
                <i className="fas fa-clone"></i>
              </div>
              <LazyLoad threshold={0.6} width={"100%"} height={"100%"}>
                <img src={`${image[image.length - 1]}`} alt="" />
              </LazyLoad>
            </div>
          ) : (
            <LazyLoad threshold={0.6} width={"100%"} height={"100%"}>
              <img src={image && `${image[image.length - 1]}`} alt="" />
            </LazyLoad>
          )}

          {/* <div className={styles.postImgHover}>
            <div className={styles.postItemHoverItem}>
              <i className="fas fa-heart"></i>
              <span>{usersLiked.length}</span>
            </div>
            <div className={styles.postItemHoverItem}>
              <i className="fas fa-comment"></i>
              <span>{usersCommentd.length}</span>
            </div>
          </div> */}
        </Link>
        <Outlet />
      </div>
    </>
  );
};

export default AccountPost;
