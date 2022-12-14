import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppSelector } from "~/app/hooks";
import { UserFollowResponse } from "~/common/types";
import Loading from "~/components/Loading";
import { getUser } from "~/features/Auth/userSlice";
import { getloadingProfile } from "~/features/profileUser/profileUserSlice";

import styles from "./modalFollowing.module.scss";

type Props = {
  followings: UserFollowResponse[];
};

const ModalFollowing: React.FC<Props> = ({ followings }) => {
  const [isFollowerOpen, setIsFollowerOpen] = useState(false);

  const loadingProfile = useAppSelector(getloadingProfile);
  const getUserData = useAppSelector(getUser);

  const showModal = () => {
    setIsFollowerOpen(true);
  };

  const handleCancel = () => {
    setIsFollowerOpen(false);
  };

  return (
    <>
      {loadingProfile ? (
        <Loading />
      ) : (
        <div className={styles.modalFollower}>
          <div className={styles.follower} onClick={showModal}>
            <span>{followings?.length > 0 ? followings?.length : "0"}</span>
            following
          </div>
          <Modal
            open={isFollowerOpen}
            closable={false}
            footer={false}
            onCancel={handleCancel}
          >
            <div
              className={
                followings.length > 6
                  ? `${styles.followerContainer} ${styles.scroll}`
                  : `${styles.followerContainer}`
              }
            >
              {followings?.length > 0 ? (
                followings.map((user, index) => (
                  <div className={styles.userItem} key={user.id}>
                    <Link
                      to={
                        followings.find(
                          (user) => user.id === getUserData.user.id
                        )
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
                  OH No! You dont have user following...
                  <i className="far fa-sad-tear"></i>
                </span>
              )}
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ModalFollowing;
