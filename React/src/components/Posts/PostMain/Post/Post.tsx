import { Input, InputRef } from "antd";
import { useRef } from "react";

import { Link } from "react-router-dom";
import Comments from "~/components/Comments";
import styles from "./postStyles.module.scss";

const Post = ({ userId = 133, postId = 1 }) => {
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
      </div>

      <div className={styles.postImage}>
        <img src="/assets/images/post_img.jpg" alt="" />
      </div>

      <div className={styles.emotion}>
        <div className={styles.left}>
          <i className={`far fa-heart ${styles.likeIcon}`}></i>

          <div style={{ lineHeight: 0 }} onClick={() => ref.current?.focus()}>
            <i className={`far fa-comment ${styles.commentIcon}`}></i>
          </div>
        </div>

        <i className={`far fa-file-plus ${styles.saveIcon}`}></i>
      </div>
      <div className={styles.comment}>
        <Comments postId={1} />
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
