import { Button, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { BsBookmarkPlus, BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./postDetailStyles.module.scss";

import Tooltip from "antd/es/tooltip";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { MdOutlineDone } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import {
  UserCommentResponse,
  PostAccount,
  userLikedTypes,
} from "~/common/types";
import Comments from "~/components/Comments";
import Loading from "~/components/Loading";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import {
  getLikeData,
  getLoadingPosts,
} from "~/features/accountPost/postDetail/postDetailSlice";
import { postsApi } from "~/features/accountPost/Posts/postsApi";
import { getUser } from "~/features/Auth/userSlice";

export type Props = {
  isAccount: boolean;
  postDetailData: PostAccount;
  postId: number;
  userLiked: userLikedTypes[];
  commentData: UserCommentResponse[];
};
const PostDetail: React.FC<Props> = ({
  isAccount,
  postDetailData,
  postId,
  userLiked,
  commentData,
}) => {
  const dispatch = useAppDispatch();
  const [isOpenSettingPost, setIsOpenSettingPost] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [liked, setLiked] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  const [editCaption, setEditCaption] = useState("");
  const [isOpenComment, setisOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const inputRef = useRef<TextAreaRef>(null);

  const getUserData = useAppSelector(getUser);
  const loadingPost = useAppSelector(getLoadingPosts);
  const likeData = useAppSelector(getLikeData);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if(postDetailData.likes.find(like => liked.id === getUserData.user.id)){
  //     setLiked(true)
  //   }
  // }, [post.likes,getUserData.user.id]);

  // UPDATE POST
  const handleUpdatePost = () => {
    const data = {
      post: {
        caption: editCaption,
      },
    };
    dispatch(postDetailApi.update(postId, data));
    setIsOpenEdit(false);
  };

  const handleDeletePost = () => {
    dispatch(postsApi.delete(postId));
    navigate("/profile");
    window.location.reload();
  };

  // LIKE
  const handleLike = async () => {
    setLiked(true);
    await dispatch(postDetailApi.like(postId, postDetailData, getUserData));
    // dispatch(postDetailApi.getPost(postId));
  };
  const handleDisLike = async () => {
    setLiked(false);
    await dispatch(
      postDetailApi.disLike(postId, likeData.id, postDetailData, getUserData)
    );
    // dispatch(postDetailApi.getPost(postId));
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
        <div
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
              {/* HEADER */}
              <div className={styles.contentTop}>
                <div className={styles.postDetailHeader}>
                  <div className={styles.userName}>
                    <div className={styles.image}>
                      <img
                        src={
                          getUserData.user.avatar
                            ? getUserData.user.avatar
                            : `/assets/images/user-vacant.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <div className={styles.info}>
                      <p className={styles.name}>
                        {getUserData.user.user_name}
                      </p>
                      <p className={styles.description}>
                        {getUserData.user.nick_name}
                      </p>
                    </div>
                  </div>
                  {isAccount ? (
                    <div className={styles.settingPost}>
                      <Tooltip
                        trigger={"click"}
                        placement="right"
                        color="#fff"
                        zIndex={20001}
                        title={() => (
                          <div className={styles.settingPostContent}>
                            <div onClick={handleDeletePost}>
                              <Typography
                                className={`${styles.text} ${styles.warn}`}
                              >
                                Delete
                              </Typography>
                            </div>
                            <div onClick={() => setIsOpenEdit(true)}>
                              <Typography className={styles.text}>
                                Edit
                              </Typography>
                            </div>
                          </div>
                        )}
                      >
                        <BsThreeDots
                          className={styles.iconSettingPost}
                          onClick={() =>
                            setIsOpenSettingPost(!isOpenSettingPost)
                          }
                        />
                      </Tooltip>
                    </div>
                  ) : null}
                </div>

                {/* CAPTION AND EDIT */}
                {isOpenEdit ? (
                  <div className={styles.editContainer}>
                    <Input.TextArea
                      defaultValue={postDetailData.caption}
                      className={styles.inputEdit}
                      onChange={(e) => setEditCaption(e.target.value)}
                    />
                    <Row gutter={[12, 12]} justify="center">
                      <Col>
                        <Button
                          onClick={() => setIsOpenEdit(false)}
                          className={styles.btnEditCancel}
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          onClick={handleUpdatePost}
                          className={styles.btnEditSave}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <Typography.Paragraph
                    ellipsis={
                      ellipsis
                        ? { rows: 2, expandable: true, symbol: "more" }
                        : false
                    }
                    className={styles.caption}
                  >
                    {postDetailData.caption}
                  </Typography.Paragraph>
                )}

                {/* COMMENT */}
                <div className={styles.comment}>
                  <Comments
                    postId={postId}
                    isAccount={isAccount}
                    commentList={commentData}
                  />
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
                      <AiFillHeart
                        onClick={handleDisLike}
                        className={`${styles.icon} ${styles.active} `}
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={handleLike}
                        className={styles.icon}
                      />
                    )}
                    <BiMessageRounded
                      className={styles.icon}
                      onClick={() => inputRef.current?.focus()}
                    />
                    <Typography className={styles.likeNumber}>
                      <span>{userLiked.length}</span> Liked
                    </Typography>
                  </div>
                  <div className={styles.save} style={{ lineHeight: 0 }}>
                    <BsBookmarkPlus size={26} />
                  </div>
                </div>

                {/* COMMENT MOBILE */}
                <div
                  className={
                    isOpenComment
                      ? `${styles.commentMobile} ${styles.open} `
                      : `${styles.commentMobile}`
                  }
                >
                  <Comments
                    postId={postId}
                    isAccount={isAccount}
                    commentList={commentData}
                  />
                </div>

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
        </div>
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

export default PostDetail;
