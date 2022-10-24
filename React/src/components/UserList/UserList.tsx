import React from "react";
import { FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/Auth/userSlice";
import styles from "./userListStyles.module.scss";

const User: React.FC = () => {
  const getUserData = useAppSelector(getUser);

  return (
    <div className={styles.userList}>
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
          <div className={styles.btnLogout}>Logout</div>
        </div>
      </div>

      <div className={styles.textSuggestion}>Suggestions For You</div>

      {/* LIST USER */}
      <div className={styles.userItem}>
        <div className={styles.userInfo}>
          <Link to={`/user-profile/`}>
            <img
              src="/assets/images/user-img.jpg"
              alt=""
              className={styles.userImg}
            />
          </Link>
          <div className={styles.info}>
            <span className={styles.name}>Minh Tài</span>
            <span className={styles.description}>Conian Guys</span>
            <span className={styles.ticked}>
              <FiCheck className={styles.tickedIcon} />
            </span>
          </div>
        </div>
        <div className={styles.textFollow}>Follow</div>
      </div>
    </div>
  );
};

export default User;
