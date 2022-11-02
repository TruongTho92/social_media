import { Typography } from "antd";
import { useEffect, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import PostMainDetail from "../PostMainDetail";
import styles from "./postStyles.module.scss";
import { LikeDataResponse } from "~/common/types";
import { getUser } from "~/features/Auth/userSlice";
import { postOfFollowingApi } from "~/features/postOfFollowing/postOfFollowingApi";
import { getLikeData } from "~/features/accountPost/postDetail/postDetailSlice";
import { getLikePostMain } from "~/features/postOfFollowing/postOfFollowingSlice";

type Props = {
  avatar: string;
  userId: number;
  postId: number;
  userName: string;
  nickName: string;
  caption: string;
  imagePost: string;
  likes: LikeDataResponse[];
  comments: LikeDataResponse[];
};

const Post: React.FC<Props> = ({
  avatar,
  userId,
  postId,
  userName,
  nickName,
  imagePost,
  caption,
  likes,
  comments,
}) => {
  const [liked, setLiked] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);

  const dispatch = useAppDispatch();
  const getUserData = useAppSelector(getUser);
  const likePostMain = useAppSelector(getLikePostMain);
  const location = useLocation();

  useEffect(() => {
    if (likes?.find((post) => post.user_id === getUserData.user.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [getUserData.user.id, likes]);

  // LIKE
  const handleLike = async () => {
    setLiked(true);
    await dispatch(postOfFollowingApi.like(postId));
    dispatch(postOfFollowingApi.getPostFollowing());
  };
  const handleDisLike = async () => {
    setLiked(false);
    await dispatch(postOfFollowingApi.disLike(postId, likePostMain.id));
    dispatch(postOfFollowingApi.getPostFollowing());
  };

  return (
    <div>
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
          <Link
            to={`/post-newfeeds/${postId}`}
            className={styles.commentLink}
            state={{ background: location }}
          >
            <img src={imagePost} alt="" />
          </Link>
        </div>

        <div className={styles.emotion}>
          <div className={styles.left}>
            {liked ? (
              <i
                onClick={handleDisLike}
                className={`fas fa-heart ${styles.likeIcon} ${styles.active}`}
              ></i>
            ) : (
              <i
                onClick={handleLike}
                className={`far fa-heart ${styles.likeIcon}`}
              ></i>
            )}

            <Link
              to={`/post-newfeeds/${postId}`}
              className={styles.commentLink}
              state={{ background: location }}
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
          <span>{likes?.length}</span> likes
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
    </div>
  );
};

export default Post;
