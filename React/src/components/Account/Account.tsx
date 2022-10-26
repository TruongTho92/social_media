import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import { postsApi } from "~/features/accountPost/Posts/postsApi";
import {
  getAllPost,
  getLoadingPosts,
} from "~/features/accountPost/Posts/postsSlice";
import { getUser } from "~/features/Auth/userSlice";
import { profileUserApi } from "~/features/profileUser/profileUserApi";
import {
  getUserFollowers,
  getUserFollowings,
} from "~/features/profileUser/profileUserSlice";
import Loading from "../Loading";
import ModalFollowers from "../Modal/ModalFollowers";
import ModalFollowing from "../Modal/ModalFollowing";
import ModalSetting from "../Modal/ModalSetting";
import AccountPosts from "../Posts/PostAccount/AccountPosts";
import styles from "./accountStyles.module.scss";

const Account: React.FC = () => {
  const dispatch = useAppDispatch();

  const getUserData = useAppSelector(getUser);

  const userFollowers = useAppSelector(getUserFollowers);
  const userFollowings = useAppSelector(getUserFollowings);
  const loadingPosts = useAppSelector(getLoadingPosts);
  const allAccountPost = useAppSelector(getAllPost);

  useEffect(() => {
    dispatch(postsApi.getAll(getUserData.user.id));
    dispatch(profileUserApi.getProfileUser(getUserData.user.id));
  }, []);

  return (
    <>
      {loadingPosts ? (
        <Loading />
      ) : (
        <div className={`${styles.account}`}>
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

                  {/* MODAL FOLLOW */}
                  <ModalFollowers followers={userFollowers} />
                  <ModalFollowing followings={userFollowings} />
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
