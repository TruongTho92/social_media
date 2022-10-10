import { Input, Modal } from "antd";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { GoComment } from "react-icons/go";
import Comments from "../Comments";
import styles from "./postStyles.module.scss";
import { useEffect, useState } from "react";

const Post = ({ userId = 1, postId = 1 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleClick = (window.onclick = () => {
      setIsModalOpen(false);
    });
    return () => {
      window.removeEventListener("click", handleClick);
    };
  });
  return (
    <div className={styles.post}>
      <div className={styles.user}>
        <div className={styles.userName}>
          <Link to={`/profile/${userId}`}>
            <div className={styles.image}>
              <img src="/assets/images/user-img.jpg" alt="" />
            </div>
          </Link>
          <div className={styles.info}>
            <p className={styles.name}>Minh Tài</p>
            <p className={styles.description}>Conianguys</p>
          </div>
        </div>
        <button className={styles.userFollowBtn}>Follow</button>
      </div>

      <div className={styles.postImage}>
        <img src="/assets/images/post_img.jpg" alt="" />
      </div>

      <div className={styles.emotion}>
        <div className={styles.left}>
          <AiOutlineHeart className={styles.likeIcon} />

          <GoComment className={styles.commentIcon} onClick={showModal} />
        </div>

        <BsBookmarkPlus className={styles.saveIcon} />
      </div>
      <div className={styles.comment}></div>

      <Modal open={isModalOpen} closable={false} footer={false}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <Comments />
        </div>
      </Modal>
    </div>
  );
};

export default Post;
