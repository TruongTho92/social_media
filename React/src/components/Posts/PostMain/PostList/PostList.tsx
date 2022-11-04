import { Typography } from "antd";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import LoadingSpinner from "~/components/LoadingSpinner";
import { postOfFollowingApi } from "~/features/postOfFollowing/postOfFollowingApi";
import {
  getAllPostOfFollowing,
  getLoadingPostFollowing,
} from "~/features/postOfFollowing/postOfFollowingSlice";
import {
  getAllPostSave,
  getAllPostSaveAsync,
} from "~/features/savePosts/savePostsSlice";
import Post from "../Post/Post";
import styles from "./postListStyles.module.scss";

const PostList = () => {
  const dispatch = useAppDispatch();
  const allPostFollowing = useAppSelector(getAllPostOfFollowing);
  const loadingPostFollowing = useAppSelector(getLoadingPostFollowing);
  const sortAllPostFollowing = [...allPostFollowing].sort(
    (a, b) => b.id - a.id
  );
  const allPostSave = useAppSelector(getAllPostSave);

  useEffect(() => {
    dispatch(postOfFollowingApi.getPostFollowing());
    dispatch(getAllPostSaveAsync());
  }, []);

  return (
    <>
      {loadingPostFollowing ? (
        <LoadingSpinner width={30} />
      ) : (
        <div className={styles.posts}>
          {allPostFollowing?.length > 0 ? (
            sortAllPostFollowing.map((post) => (
              <div key={post.id}>
                <Post
                  avatar={post.avatar}
                  userName={post.user_name}
                  nickName={post.nick_name}
                  imagePost={post.image}
                  userId={post.user_id}
                  postId={post.id}
                  caption={post.caption}
                  likes={post.like}
                  comments={post.comment}
                  allPostSave={allPostSave}
                />
              </div>
            ))
          ) : (
            <Typography className={styles.textErrorFL}>
              Oh No!! You dont have user following or <br /> User dont have post
            </Typography>
          )}
        </div>
      )}
    </>
  );
};

export default PostList;
