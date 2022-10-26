import { Typography } from "antd";
import { useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { Link, Route, Routes } from "react-router-dom";

import { useAppDispatch } from "~/app/hooks";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import PostMainDetail from "../PostMainDetail";
import styles from "./postStyles.module.scss";

type Props = {
  avatar: string;
  userId: number;
  postId: number;
  userName: string;
  nickName: string;
  caption: string;
  imagePost: string;
};

const Post: React.FC<Props> = ({
  avatar,
  userId,
  postId,
  userName,
  nickName,
  imagePost,
  caption,
}) => {
  const [liked, setLiked] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);

  const dispatch = useAppDispatch();

  // LIKE
  const handleLike = async () => {
    setLiked(true);
    await dispatch(postDetailApi.like(postId));
    // dispatch(postDetailApi.getPost(postId));
  };
  const handleDisLike = async () => {
    setLiked(false);
    // await dispatch(postDetailApi.disLike(postId, likeData.id));
    dispatch(postDetailApi.getPost(postId));
  };

  return (
    <>
      <div className={styles.post}>
        <div className={styles.user}>
          <div className={styles.userName}>
            <Link to={`/user-profile/${userId}`}>
              <div className={styles.image}>
                <img
                  src={avatar ? avatar : "/assets/images/user-img.jpg"}
                  alt=""
                />
              </div>
            </Link>
            <div className={styles.info}>
              <p className={styles.name}>{userName}</p>
              <p className={styles.description}>{nickName} </p>
            </div>
          </div>
        </div>

        <div className={styles.postImage}>
          <Link to={`/post-newfeeds/${postId}`} className={styles.commentLink}>
            <img src={imagePost} alt="" />
          </Link>
        </div>

        <div className={styles.emotion}>
          <div className={styles.left}>
            <i
              onClick={handleLike}
              className={`far fa-heart ${styles.likeIcon}`}
            ></i>

            <Link
              to={`/post-newfeeds/${postId}`}
              className={styles.commentLink}
            >
              <i className={`far fa-comment ${styles.commentIcon}`}></i>
            </Link>
          </div>
          <IoBookmarkOutline
            color={"#00000"}
            // title={}
            className={styles.saveIcon}
          />
        </div>
        <Typography className={styles.textUserLiked}>
          <span>12</span> likes
        </Typography>
        <div className={styles.captionContainer}>
          <Typography className={styles.userNameCaption}>{userName}</Typography>
          <Typography.Paragraph
            ellipsis={
              ellipsis ? { rows: 1, expandable: true, symbol: "more" } : false
            }
            className={styles.caption}
          >
            {caption}
          </Typography.Paragraph>
        </div>
      </div>

      <Routes>
        <Route
          path="post-newfeeds/:id"
          element={
            <PostMainDetail
              avatar={avatar}
              userId={userId}
              userName={userName}
              nickName={nickName}
              caption={caption}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Post;
