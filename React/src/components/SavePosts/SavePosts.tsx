import React from "react";
import { Link } from "react-router-dom";
import styles from "./savePostsStyles.module.scss";

type Props = {
  postId?: number;
};
const SavePosts: React.FC<Props> = ({ postId }) => {
  return (
    <div className={styles.savePosts}>
      <ul className={styles.savePostList}>
        <div className={styles.savePostItem}>
          <Link to={`/posts-newfeeds/${postId}`}>
            <img src="/assets/images/bg-left-top-1.jpg" alt="" />
          </Link>
        </div>
        <div className={styles.savePostItem}>
          <Link to={`/posts-newfeeds/${postId}`}>
            <img src="/assets/images/bg-left-top-1.jpg" alt="" />
          </Link>
        </div>
        <div className={styles.savePostItem}>
          <Link to={`/posts-newfeeds/${postId}`}>
            <img src="/assets/images/bg-left-top-1.jpg" alt="" />
          </Link>
        </div>
        <div className={styles.savePostItem}>
          <Link to={`/posts-newfeeds/${postId}`}>
            <img src="/assets/images/bg-left-top-1.jpg" alt="" />
          </Link>
        </div>
        <div className={styles.savePostItem}>
          <Link to={`/posts-newfeeds/${postId}`}>
            <img src="/assets/images/bg-left-top-1.jpg" alt="" />
          </Link>
        </div>
        <div className={styles.savePostItem}>
          <Link to={`/posts-newfeeds/${postId}`}>
            <img src="/assets/images/bg-left-top-1.jpg" alt="" />
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default SavePosts;
