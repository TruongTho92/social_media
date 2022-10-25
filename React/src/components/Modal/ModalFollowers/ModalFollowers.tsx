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
  const [isAccount, setIsAccount] = useState(false);

  const getUserData = useAppSelector(getUser);

  useEffect(() => {
    if (followers.find((user) => user.id === getUserData.user.id)) {
      setIsAccount(true);
    }
  }, []);

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
        <div className={styles.followerContainer}>
          {followers?.length > 0 ? (
            followers.map((user) => (
              <div className={styles.userItem}>
                <div className={styles.userInfo}>
                  <Link
                    to={isAccount ? `/profile` : `/user-profile/${user.id}`}
                  >
                    <img
                      src={
                        user.avatar
                          ? user.avatar
                          : "/assets/images/user-vacant.jpg"
                      }
                      alt=""
                      className={styles.userImg}
                    />
                  </Link>
                  <div className={styles.info}>
                    <span className={styles.name}>{user.user_name}</span>
                    <span className={styles.description}>{user.nick_name}</span>
                    <span className={styles.ticked}>
                      <FiCheck className={styles.tickedIcon} />
                    </span>
                  </div>
                </div>
                <div className={styles.textFollow}>Follow</div>
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
