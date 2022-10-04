import { Input } from "antd";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import Comments from "../Comments";
import styles from "./postStyles.module.scss";

const Post = () => {
  return (
    <div className={styles.post}>
      <div className={styles.user}>
        <div className={styles.userName}>
          <div className={styles.image}>
            <img src="/assets/images/user-img.jpg" alt="" />
          </div>
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

      {/* Comment */}
      <Comments />

      <div className={styles.emotion}>
        <div className={styles.left}>
          <AiOutlineHeart className={styles.likeIcon} />

          <Input
            type="text"
            placeholder="comment..."
            className={styles.inputComment}
          />
        </div>

        <BsBookmarkPlus className={styles.saveIcon} />
      </div>
    </div>
  );
};

export default Post;
