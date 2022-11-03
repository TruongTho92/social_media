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
import { followApi } from "~/features/follow/followApi";
import { profileUserApi } from "~/features/profileUser/profileUserApi";
import {
  getloadingProfile,
  getProfileUser,
  getUserFollowers,
  getUserFollowings,
} from "~/features/profileUser/profileUserSlice";
import Loading from "../Loading";
import LoadingSpinner from "../LoadingSpinner";
import ModalFollowers from "../Modal/ModalFollowers";
import ModalFollowing from "../Modal/ModalFollowing";
import AccountPosts from "../Posts/PostAccount/AccountPosts";

import styles from "./userProfileStyles.module.scss";

type Props = {};

const UserProfile: React.FC = (props: Props) => {
  const dispatch = useAppDispatch();
  const [isFollow, setIsFollow] = useState(false);

  const getUserData = useAppSelector(getUser);

  const profileUser = useAppSelector(getProfileUser);
  const userFollowers = useAppSelector(getUserFollowers);
  const userFollowings = useAppSelector(getUserFollowings);
  const loadingPosts = useAppSelector(getLoadingPosts);
  const loadingProfile = useAppSelector(getloadingProfile);
  const allAccountPost = useAppSelector(getAllPost);

  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    dispatch(profileUserApi.getProfileUser(userId));
    dispatch(postsApi.getAll(userId));
  }, [userId]);

  useEffect(() => {
    if (userFollowers.find((follow) => follow.id === getUserData.user.id)) {
      setIsFollow(true);
    }
    return () => {
      setIsFollow(false);
    };
  }, [getUserData.user.id, userFollowers]);

  const handleFollow = async () => {
    const data = {
      id: userId,
    };
    await dispatch(followApi.follow(data));
    setIsFollow(true);
    dispatch(profileUserApi.getProfileUser(userId));
  };

  const handleUnFollow = async () => {
    setIsFollow(false);
    await dispatch(followApi.unFollow(userId));
    dispatch(profileUserApi.getProfileUser(userId));
  };

  return (
    <>
      {loadingProfile ? (
        <div style={{ position: "relative" }}>
          <Loading />
        </div>
      ) : (
        <div className={`${styles.userProfile}`}>
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
                    <button
                      onClick={handleUnFollow}
                      className={styles.btnUnFollow}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={handleFollow} className={styles.btnFollow}>
                      Follow
                    </button>
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
                    <span>{allAccountPost?.length}</span> posts
                  </span>
                  <ModalFollowers followers={userFollowers} />
                  <ModalFollowing followings={userFollowings} />
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

          {loadingPosts ? (
            <div style={{ position: "relative" }}>
              <LoadingSpinner width={30} />
            </div>
          ) : (
            <div className={styles.accountPost}>
              <AccountPosts isAccount={false} postList={allAccountPost} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
