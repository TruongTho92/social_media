import React from "react";
import Post from "../Post";
import styles from "./postListStyles.module.scss";

const PostList = () => {
  return (
    <div className={styles.posts}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default PostList;
