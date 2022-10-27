import { Button, Col, Input, Row, Typography } from "antd";
import { TextAreaRef } from "antd/lib/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import Comments from "~/components/Comments";
import Loading from "~/components/Loading";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import {
  getLikeData,
  getLoadingPosts,
  getPostDetail,
  getUsersCommented,
  getUsersLiked,
} from "~/features/accountPost/postDetail/postDetailSlice";
import { postsApi } from "~/features/accountPost/Posts/postsApi";
import { getUser } from "~/features/Auth/userSlice";
import { profileUserApi } from "~/features/profileUser/profileUserApi";
import { getProfileUser } from "~/features/profileUser/profileUserSlice";

import styles from "./postMainDetailStyles.module.scss";

export type Props = {
  avatar?: string;
  userId?: number;
  userName?: string;
  nickName?: string;
  caption?: string;
};
const PostMainDetail: React.FC<Props> = ({
  avatar,
  userId,
  userName,
  nickName,
  caption,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [isOpenComment, setisOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const inputRef = useRef<TextAreaRef>(null);

  const getUserData = useAppSelector(getUser);
  const loadingPost = useAppSelector(getLoadingPosts);
  const likeData = useAppSelector(getLikeData);
  const userProfile = useAppSelector(getProfileUser);

  const postDetailData = useAppSelector(getPostDetail);
  const userLikedData = useAppSelector(getUsersLiked);
  const commentData = useAppSelector(getUsersCommented);

  const { id } = useParams();
  const postId = Number(id);

  useEffect(() => {
    dispatch(postDetailApi.getPost(postId));

    document.body.classList.add("postDetailOpen");
    return function cleanup() {
      document.body.classList.remove("postDetailOpen");
    };
  }, []);

  useEffect(() => {
    if (userLikedData.find((like: any) => like.id === getUserData.user.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [getUserData.user.id, userLikedData]);

  // LIKE
  const handleLike = async () => {
    setLiked(true);
    await dispatch(postDetailApi.like(postId));
    dispatch(postDetailApi.getPost(postId));
  };
  const handleDisLike = async () => {
    setLiked(false);
    await dispatch(postDetailApi.disLike(postId, likeData.id));
    dispatch(postDetailApi.getPost(postId));
  };

  // COMMENT
  const handleComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload = {
      comment: {
        content: comment,
      },
    };
    setComment("");
    await dispatch(postDetailApi.comment(payload, postId));
    dispatch(postDetailApi.getPost(postId));
  };

  return (
    <>
      {loadingPost ? (
        <Loading />
      ) : (
        <section
          className={` ${styles.postDetail}`}
          onClick={() => {
            navigate(-1);
          }}
        >
          <div
            className={styles.postDetailContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.postDetailImg}>
              <img src={postDetailData.image} alt="" />
            </div>
            <div className={styles.postDetailContent}>
              <div className={styles.contentTop}>
                {/* HEADER */}
                {/* <div className={styles.postDetailHeader}>
                  <div className={styles.userName}>
                    <div className={styles.image}>
                      <Link to={`/user-profile/${userId}`}>
                        <img
                          src={
                            avatar ? avatar : `/assets/images/user-vacant.jpg`
                          }
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className={styles.info}>
                      <p className={styles.name}>{userName}</p>
                      <p className={styles.description}>{nickName}</p>
                    </div>
                  </div>
                </div> */}

                <Typography className={styles.caption}>
                  {postDetailData.caption}
                </Typography>

                {/* COMMENT */}
                <div className={styles.comment}>
                  <Comments postId={postId} commentList={commentData} />
                </div>
              </div>

              <div className={`${styles.postDetailImg} ${styles.mobile}`}>
                <img src={postDetailData.image} alt="" />
              </div>

              <div className={styles.contentBottom}>
                {/* Like */}
                <div className={styles.emotion}>
                  <div className={styles.iconEmotion}>
                    {liked ? (
                      <i
                        onClick={handleDisLike}
                        className={`fas fa-heart ${styles.icon} ${styles.active}`}
                      ></i>
                    ) : (
                      <i
                        onClick={handleLike}
                        className={`far fa-heart ${styles.icon}`}
                      ></i>
                    )}

                    <i
                      onClick={() => inputRef.current?.focus()}
                      className={`far fa-comment ${styles.icon}`}
                    ></i>
                  </div>

                  <div className={styles.save} style={{ lineHeight: 0 }}>
                    <IoBookmarkOutline
                      color={"#00000"}
                      // title={}
                      className={styles.iconSave}
                    />
                  </div>
                </div>
                <Typography className={styles.likeNumber}>
                  <span>{userLikedData.length}</span> Likes
                </Typography>
                {/* COMMENT MOBILE */}

                {isOpenComment && (
                  <Comments postId={postId} commentList={commentData} />
                )}

                <Typography.Text
                  className={styles.seeComment}
                  onClick={() => setisOpenComment(!isOpenComment)}
                >
                  {isOpenComment ? "Hide comments..." : "View comments..."}
                </Typography.Text>

                {/* FORM To Comment */}
                <form action="" className={styles.form}>
                  <Input.TextArea
                    value={comment}
                    ref={inputRef}
                    id={"input-comment"}
                    placeholder="Add a comment..."
                    className={styles.inputComment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={styles.btnComment}
                    onClick={handleComment}
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
      <ToastContainer
        icon={<MdOutlineDone size={30} />}
        position="top-center"
        autoClose={false}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default PostMainDetail;
