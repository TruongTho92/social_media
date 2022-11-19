import { Typography } from "antd";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { PostOfFollowingResponse } from "~/common/types";
import LoadingSpinner from "~/components/LoadingSpinner";
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
    dispatch(getAllPostSaveAsync());
    dispatch(postOfFollowingApi.getPostFollowing());
  }, []);

  useEffect(() => {
    setPostData(allPostFollowing.slice(0, LIMIT));
  }, [allPostFollowing]);

  const fetchData = () => {
    const newLimit = visible + LIMIT;
    const dataToAdd = allPostFollowing.slice(visible, newLimit);
    if (allPostFollowing.length > postData.length) {
      setTimeout(() => {
        setPostData((prev) => [...prev].concat(dataToAdd));
      }, 500);
      setVisible(newLimit);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div>
      {loadingPostFollowing ? (
        <div style={{ marginBottom: 24 }}>
          <LoadingSpinner width={30} />
        </div>
      ) : (
        <Story />
      )}

      {postData.length <= 0 && (
        <Typography className={styles.textErrorFL}>
          Oh No!! You dont have user following or <br /> User dont have post
        </Typography>
      )}

      <div className={styles.posts}>
        {/* <InfiniteScroll
          scrollableTarget="body"
          dataLength={postData.length}
          next={fetchData}
          hasMore={hasMore}
          loader={postData.length > 0 && <p>loading...</p>}
          style={{ overflow: "hidden" }}
        > */}
        {allPostFollowing.length > 0 ? (
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
                dateCreated={post.created_at}
                allPostSaved={allPostSaved}
              />
            </div>
          ))
        ) : (
          <>
            {loadingPostFollowing && (
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
            )}
          </>
        )}
        {/* </InfiniteScroll> */}
      </div>
    </div>
  );
};

export default PostList;
