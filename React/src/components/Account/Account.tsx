import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { postsApi } from "~/features/accountPost/Posts/postsApi";
import {
  getAllPost,
  getLoadingPosts,
} from "~/features/accountPost/Posts/postsSlice";
import { getUser } from "~/features/Auth/userSlice";
import Loading from "../Loading";
import ModalSetting from "../Modal/ModalSetting";
import AccountPosts from "../Posts/PostProfile/AccountPosts";
import styles from "./accountStyles.module.scss";
type Props = {};

const Account: React.FC = (props: Props) => {
  const dispatch = useAppDispatch();

  const getUserData = useAppSelector(getUser);
  const loadingPosts = useAppSelector(getLoadingPosts);

  const allAccountPost = useAppSelector(getAllPost);

  useEffect(() => {
    dispatch(postsApi.getAll());
  }, []);

  return (
    <>
      {loadingPosts ? (
        <Loading />
      ) : (
        <div className={`container-fluid ${styles.account}`}>
          <div className={styles.accountContainer}>
            <div className={styles.accountInfo}>
              <div className={styles.image}>
                <img
                  src={
                    getUserData.user.avatar
                      ? getUserData.user.avatar
                      : "/assets/images/user-vacant.jpg"
                  }
                  alt=""
                />
              </div>
              <div className={styles.info}>
                <div className={`${styles.infoItem} ${styles.infoItemMobile}`}>
                  <span className={styles.name}>
                    {getUserData.user.user_name ? (
                      getUserData.user.user_name
                    ) : (
                      <span className={styles.errorUpdate}>
                        * Update your name
                      </span>
                    )}
                  </span>

                  <Link to="/profile/update" className={styles.linkEdit}>
                    Edit profile
                  </Link>
                  <div style={{ lineHeight: 0 }}>
                    <ModalSetting classNameIconSetting={styles.settingIcon} />
                  </div>
                </div>
                <div className={`${styles.infoItem} ${styles.infoItemFollow}`}>
                  <span className={styles.posts}>
                    <span>12</span> posts
                  </span>
                  <span className={styles.follower}>
                    <span>122312</span> followers
                  </span>
                  <span className={styles.following}>
                    <span>200000</span> following
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <div>
                    <span className={styles.username}>
                      {getUserData.user.nick_name ? (
                        getUserData.user.nick_name
                      ) : (
                        <span className={styles.errorUpdate}>
                          * Update your nick name
                        </span>
                      )}
                    </span>
                    <div className={styles.bio}>
                      {getUserData.user.bio ? (
                        getUserData.user.bio
                      ) : (
                        <span className={styles.errorUpdate}>
                          * Update your Biography
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className={styles.line}></span>
          <div className={styles.accountPost}>
            <AccountPosts postList={allAccountPost} />
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
