import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppSelector } from "~/app/hooks";
import { UserFollowResponse } from "~/common/types";
import { getUser } from "~/features/Auth/userSlice";

import styles from "./modalFollowers.module.scss";

type Props = {
  followers: UserFollowResponse[];
};

const ModalFollowers: React.FC<Props> = ({ followers }) => {
  const [isFollowerOpen, setIsFollowerOpen] = useState(false);

  const getUserData = useAppSelector(getUser);

  const showModal = () => {
    setIsFollowerOpen(true);
  };

  const handleCancel = () => {
    setIsFollowerOpen(false);
  };
  return (
    <div className={styles.modalFollower}>
      <div className={styles.follower} onClick={showModal}>
        <span>{followers.length}</span> followers
      </div>
      <Modal
        open={isFollowerOpen}
        closable={false}
        footer={false}
        onCancel={handleCancel}
      >
        <div
          className={
            followers.length > 6
              ? `${styles.followerContainer} ${styles.scroll}`
              : `${styles.followerContainer}`
          }
        >
          {followers?.length > 0 ? (
            followers.map((user, index) => (
              <div className={styles.userItem} key={index}>
                <Link
                  to={
                    followers.find((user) => user.id === getUserData.user.id)
                      ? `/profile`
                      : `/user-profile/${user.id}`
                  }
                  className={styles.userItemLink}
                >
                  <div className={styles.userInfo}>
                    <img
                      src={
                        user.avatar
                          ? user.avatar
                          : "/assets/images/user-vacant.jpg"
                      }
                      alt=""
                      className={styles.userImg}
                    />
                    <div className={styles.info}>
                      <span className={styles.name}>{user.user_name}</span>
                      <span className={styles.description}>
                        {user.nick_name}
                      </span>
                      <span className={styles.ticked}>
                        <FiCheck className={styles.tickedIcon} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <span className={styles.textNoneFl}>
              OH No! You dont have user follower...
              <i className="far fa-sad-tear"></i>
            </span>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModalFollowers;
