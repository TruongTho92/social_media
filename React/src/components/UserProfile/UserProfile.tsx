import { Tooltip, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { postsApi } from "~/features/accountPost/Posts/postsApi";
import {
  getAllPost,
  getLoadingPosts,
} from "~/features/accountPost/Posts/postsSlice";
import { getUser } from "~/features/Auth/userSlice";
import { profileUserApi } from "~/features/profileUser/profileUserApi";
import { getProfileUser } from "~/features/profileUser/profileUserSlice";
import Loading from "../Loading";
import AccountPosts from "../Posts/PostAccount/AccountPosts";

import styles from "./userProfileStyles.module.scss";

type Props = {};

const UserProfile: React.FC = (props: Props) => {
  const dispatch = useAppDispatch();
  const [isFollow, setIsFollow] = useState(false);

  const profileUser = useAppSelector(getProfileUser);
  const loadingPosts = useAppSelector(getLoadingPosts);
  const allAccountPost = useAppSelector(getAllPost);

  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    dispatch(profileUserApi.getProfileUser(userId));
    dispatch(postsApi.getAll(userId));
  }, []);

  return (
    <>
      {loadingPosts ? (
        <Loading />
      ) : (
        <div className={`container-fluid ${styles.userProfile}`}>
          <div className={styles.userProfileContainer}>
            <div className={styles.userProfileInfo}>
              <div className={styles.image}>
                <img
                  src={
                    profileUser.user.avatar
                      ? profileUser.user.avatar
                      : "/assets/images/user-vacant.jpg"
                  }
                  alt=""
                />
              </div>
              <div className={styles.info}>
                <div className={`${styles.infoItem} ${styles.infoItemMobile}`}>
                  <span className={styles.name}>
                    {profileUser.user.user_name ? (
                      profileUser.user.user_name
                    ) : (
                      <span className={styles.errorUpdate}>
                        * User hasn't name
                      </span>
                    )}
                  </span>
                  {isFollow ? (
                    <button className={styles.btnUnFollow}>Unfollow</button>
                  ) : (
                    <button className={styles.btnFollow}>Follow</button>
                  )}

                  <Tooltip
                    color="#fff"
                    placement="right"
                    trigger={"click"}
                    title={
                      <div
                        className={styles.settingContent}
                        style={{ color: "#000" }}
                      >
                        <Typography className={styles.settingText}>
                          Block
                        </Typography>
                        <Typography className={styles.settingText}>
                          Report
                        </Typography>
                      </div>
                    }
                  >
                    <div
                      style={{ lineHeight: 0 }}
                      className={styles.settingIconContainer}
                    >
                      <BsThreeDots className={styles.settingIcon} />
                    </div>
                  </Tooltip>
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
                      {profileUser.user.nick_name}
                    </span>
                    <div className={styles.bio}>{profileUser.user.bio}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className={styles.line}></span>
          <div className={styles.userProfilePost}>
            <AccountPosts postList={allAccountPost} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
