import React, { useEffect } from "react";
import { useAppDispatch } from "~/app/hooks";
import { postOfFollowingApi } from "~/features/postOfFollowing/postOfFollowingApi";
import Post from "../Post";
import styles from "./postListStyles.module.scss";

const PostList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(postOfFollowingApi.getPostFollowing());
  }, []);
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
