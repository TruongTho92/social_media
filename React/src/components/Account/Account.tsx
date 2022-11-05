import React, { useEffect } from "react";
import { Link, NavLink, Outlet, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
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
import SavePage from "~/pages/SavePage";
import LoadingSpinner from "../LoadingSpinner";
import ModalFollowers from "../Modal/ModalFollowers";
import ModalFollowing from "../Modal/ModalFollowing";
import ModalSetting from "../Modal/ModalSetting";
import PagePosts from "../PagePosts";
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
    if (getUserData.user.id) {
      dispatch(postsApi.getAll(getUserData.user.id));
      dispatch(profileUserApi.getProfileUser(getUserData.user.id));
    }
  }, [getUserData.user.id]);

  return (
    <>
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
              <div className={`${styles.infoItem} ${styles.mobile}`}>
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
              <div className={`${styles.infoItem} ${styles.infoItemFollow}`}>
                <div className={`${styles.followContainer} ${styles.posts}`}>
                  <span>{allAccountPost?.length}</span> posts
                </div>

                {/* MODAL FOLLOW */}
                <div className={styles.followContainer}>
                  <ModalFollowers followers={userFollowers} />
                </div>
                <div className={styles.followContainer}>
                  <ModalFollowing followings={userFollowings} />
                </div>
              </div>
              <div className={`${styles.infoItem} ${styles.desktop}`}>
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

        {/*LINK POST PAGE */}
        <PagePosts />
        {/* ROUTES */}
        <Routes>
          <Route
            path="/"
            element={
              loadingPosts ? (
                <div style={{ position: "relative" }}>
                  <LoadingSpinner width={30} />
                </div>
              ) : (
                <div className={styles.accountPost}>
                  <AccountPosts isAccount={true} postList={allAccountPost} />
                </div>
              )
            }
          />
          <Route path="saves" element={<SavePage />} />
        </Routes>
      </div>
    </>
  );
};

export default Account;
