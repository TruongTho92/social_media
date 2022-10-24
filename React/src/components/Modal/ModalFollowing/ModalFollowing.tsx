import { Modal } from "antd";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from "./modalFollowing.module.scss";
type Props = {};

const ModalFollowing = (props: Props) => {
  const [isFollowerOpen, setIsFollowerOpen] = useState(false);

  const showModal = () => {
    setIsFollowerOpen(true);
  };

  const handleCancel = () => {
    setIsFollowerOpen(false);
  };
  return (
    <div className={styles.modalFollower}>
      <div className={styles.follower} onClick={showModal}>
        <span>122312</span> followers
      </div>
      <Modal
        open={isFollowerOpen}
        closable={false}
        footer={false}
        onCancel={handleCancel}
      >
        <div className={styles.followerContainer}>
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
          <div className={styles.userList}></div>
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
      </Modal>
    </div>
  );
};

export default ModalFollowing;
