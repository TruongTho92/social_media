import { Input, InputRef } from "antd";
import { useRef } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { BsBookmarkPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import Comments from "~/components/Comments";
import styles from "./postStyles.module.scss";

const Post = ({ userId = 1, postId = 1 }) => {
  const ref = useRef<InputRef>(null);
  return (
    <div className={styles.post}>
      <div className={styles.user}>
        <div className={styles.userName}>
          <Link to={`/user-profile/${userId}`}>
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
      <div className={styles.comment}>
        <Comments />
      </div>
      <div className={styles.emotion}>
        <div className={styles.left}>
          <AiOutlineHeart className={styles.likeIcon} />

          <div style={{ lineHeight: 0 }} onClick={() => ref.current?.focus()}>
            <BiMessageRounded className={styles.commentIcon} />
          </div>
        </div>

        <BsBookmarkPlus className={styles.saveIcon} />
      </div>
      <Input
        ref={ref}
        suffix={<div className={styles.inputText}>Post</div>}
        className={styles.inputComment}
        placeholder="write a comment..."
      />
    </div>
  );
};

export default Post;
