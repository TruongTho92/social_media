import React from "react";
import styles from "./userListStyles.module.scss";
import { FiCheck } from "react-icons/fi";

const UserList: React.FC = () => {
  return (
    <div className={styles.userList}>
      <div className={styles.userItem}>
        <img
          src="/assets/images/user-img.jpg"
          alt=""
          className={styles.userImg}
        />
        <div className={styles.userInfo}>
          <span className={styles.name}>Minh Tài</span>
          <span className={styles.description}>Conian Guys</span>
        </div>
        <span className={styles.ticked}>
          <FiCheck className={styles.tickedIcon} />
        </span>
      </div>

      <div className={styles.userItem}>
        <img
          src="/assets/images/user-img.jpg"
          alt=""
          className={styles.userImg}
        />
        <div className={styles.userInfo}>
          <span className={styles.name}>My Tien</span>
          <span className={styles.description}>my tien xinh dep</span>
        </div>
      </div>
    </div>
  );
};

export default UserList;
