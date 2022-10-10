import { Input } from "antd";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { GoComment } from "react-icons/go";
import Comments from "../Comments";
import styles from "./postStyles.module.scss";

const Post = ({ userId = 1, postId = 1 }) => {
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

      <Link to={`posts/${postId}`}>
        <div className={styles.postImage}>
          <img src="/assets/images/post_img.jpg" alt="" />
        </div>
      </Link>

      <div className={styles.emotion}>
        <div className={styles.left}>
          <AiOutlineHeart className={styles.likeIcon} />

          <Link to={`posts/${postId}`} className={styles.commentContainer}>
            <GoComment className={styles.commentIcon} />
          </Link>
        </div>

        <BsBookmarkPlus className={styles.saveIcon} />
      </div>
      <div className={styles.comment}>
        <Comments />
      </div>
    </div>
  );
};

export default Post;
