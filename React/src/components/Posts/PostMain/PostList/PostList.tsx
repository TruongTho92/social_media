import { Typography } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { PostOfFollowingResponse } from "~/common/types";
import Story from "~/components/Story";
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

const LIMIT = 4;
const PostList = () => {
  const [postData, setPostData] = useState<PostOfFollowingResponse[]>([]);
  const [visible, setVisible] = useState(LIMIT);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useAppDispatch();
  const allPostFollowing = useAppSelector(getAllPostOfFollowing);
  const loadingPostFollowing = useAppSelector(getLoadingPostFollowing);
  const allPostSaved = useAppSelector(getAllPostSave);

  useEffect(() => {
    dispatch(postOfFollowingApi.getPostFollowing());
    dispatch(getAllPostSaveAsync());
  }, []);

  useEffect(() => {
    setPostData(allPostFollowing.slice(0, LIMIT));
  }, [allPostFollowing]);

  const fetchData = () => {
    const newLimit = visible + LIMIT;
    const dataToAdd = allPostFollowing.slice(visible, newLimit);

    if (allPostFollowing.length > postData.length) {
      setTimeout(() => {
        setPostData([...postData].concat(dataToAdd));
      }, 400);
      setVisible(newLimit);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div>
      {!loadingPostFollowing ? <Story /> : null}
      <div className={styles.posts}>
        {/* <InfiniteScroll
          dataLength={allPostFollowing.length}
          next={fetchData}
          hasMore={hasMore}
          loader={postData.length > 0 && <p>loading...</p>}
          scrollThreshold={0.8}
        > */}
        {!loadingPostFollowing ? (
          allPostFollowing.length > 0 ? (
            allPostFollowing.map((post) => (
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
                  allPostSaved={allPostSaved}
                  dateCreated={post.created_at}
                />
              </div>
            ))
          ) : (
            <Typography className={styles.textErrorFL}>
              Oh No!! You dont have user following or <br /> User dont have post
            </Typography>
          )
        ) : (
          <>
            <div className={styles.post}>
              <div className={styles.user}>
                <div className={styles.image}></div>

                <div className={styles.info}>
                  <p className={styles.name}></p>
                  <p className={styles.description}> </p>
                </div>
              </div>
              <div className={styles.postImage}></div>
              <div className={styles.postContent}>
                <div className={styles.emotion}>
                  <div className={styles.left}></div>
                </div>
                <Typography className={styles.textUserLiked}></Typography>
                <div className={styles.captionContainer}>
                  <Typography className={styles.userNameCaption}></Typography>
                  <Typography.Paragraph
                    className={styles.caption}
                  ></Typography.Paragraph>
                </div>
              </div>
            </div>
          </>
        )}
        {/* </InfiniteScroll> */}
      </div>
    </div>
  );
};

export default PostList;
