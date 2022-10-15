import { Input, Modal } from "antd";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { GoComment } from "react-icons/go";
import styles from "./postStyles.module.scss";
import { useEffect, useState } from "react";
import Comments from "~/components/Comments";
import PostDetail from "../../PostDetail";
import { BiMessageRounded } from "react-icons/bi";

const Post = ({ userId = 1, postId = 1 }) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const handleOpenDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpenDetail(true);
  };

  useEffect(() => {
    const handleClick = (window.onclick = () => {
      setIsOpenDetail(false);
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
        <img
          src="/assets/images/post_img.jpg"
          alt=""
          onClick={handleOpenDetail}
        />
        <Modal
          style={{ width: "fit-content" }}
          open={isOpenDetail}
          closable={false}
          footer={false}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <PostDetail isAccount={false} id={1} />
          </div>
        </Modal>
      </div>

      <div className={styles.emotion}>
        <div className={styles.left}>
          <AiOutlineHeart className={styles.likeIcon} />

          <div onClick={handleOpenDetail} style={{ lineHeight: 0 }}>
            <BiMessageRounded className={styles.commentIcon} />
          </div>
        </div>

        <BsBookmarkPlus className={styles.saveIcon} />
      </div>
    </div>
  );
};

export default Post;
