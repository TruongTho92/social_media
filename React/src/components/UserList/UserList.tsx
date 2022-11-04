import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { userApi } from "~/features/Auth/userApi";
import { getUser } from "~/features/Auth/userSlice";
import { followApi } from "~/features/follow/followApi";
import { postOfFollowingApi } from "~/features/postOfFollowing/postOfFollowingApi";
import { userAllApi } from "~/features/userAll/userAllApi";
import { getAllUser } from "~/features/userAll/userAllSlice";
import styles from "./userListStyles.module.scss";

const User: React.FC = () => {
  const [isFollow, setIsFollow] = useState(false);
  const dispatch = useAppDispatch();
  const getUserData = useAppSelector(getUser);
  const allAccount = useAppSelector(getAllUser);

  useEffect(() => {
    dispatch(userAllApi.getAllUser());
  }, []);

  const handleFollow = async (userId: number) => {
    const data = {
      id: userId,
    };
    await dispatch(followApi.follow(data));
    dispatch(postOfFollowingApi.getPostFollowing());
    dispatch(userAllApi.getAllUser());
  };

  const handleLogout = async () => {
    const payload = {
      user: {
        email: getUserData.user.email,
        authentication_token: getUserData.user.authentication_token,
      },
    };
    dispatch(userApi.logoutUser(payload));
  };

  return (
    <>
      {/* ACCOUNT */}
      <div className={styles.account}>
        <div className={styles.userName}>
          <div className={styles.infoLeft}>
            <div className={styles.image}>
              <Link to="/profile">
                <img
                  src={
                    getUserData.user.avatar
                      ? getUserData.user.avatar
                      : `/assets/images/user-vacant.jpg`
                  }
                  alt=""
                />
              </Link>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{getUserData.user.user_name}</p>
              <p className={styles.description}>{getUserData.user.nick_name}</p>
            </div>
          </div>
          <div className={styles.btnLogout} onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>

      <div className={styles.textSuggestion}>Suggestions For You</div>

      {/* LIST USER */}
      <div className={styles.userList}>
        {allAccount?.length > 0
          ? allAccount.map((account, index) => (
              <div className={styles.userItem} key={account.id}>
                <div className={styles.userInfo}>
                  <Link to={`/user-profile/${account.id}`}>
                    <img
                      src={
                        account.avatar
                          ? account.avatar
                          : `/assets/images/user-vacant.jpg`
                      }
                      alt=""
                      className={styles.userImg}
                    />
                  </Link>
                  <div className={styles.info}>
                    <span className={styles.name}>{account.user_name}</span>
                    <span className={styles.description}>
                      {account.nick_name}
                    </span>
                  </div>
                </div>

                {isFollow ? (
                  <div
                    onClick={() => handleFollow(account.id)}
                    className={styles.textFollowing}
                  >
                    Following
                  </div>
                ) : (
                  <div
                    onClick={() => handleFollow(account.id)}
                    className={styles.textFollow}
                  >
                    Follow
                  </div>
                )}
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default User;
