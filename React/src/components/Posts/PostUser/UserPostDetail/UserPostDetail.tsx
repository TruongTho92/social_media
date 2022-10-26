import { Button, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { BsBookmarkPlus, BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

import Tooltip from "antd/es/tooltip";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import Comments from "~/components/Comments";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import {
  getLoadingPosts,
  getPostDetail,
} from "~/features/accountPost/postDetail/postDetailSlice";
import { postsApi } from "~/features/accountPost/Posts/postsApi";
import { getUser } from "~/features/Auth/userSlice";
// import { likedApi } from "~/features/liked/likedApi";

import styles from "./userPostDetailStyles.module.scss";

export type Props = {
  isAccount: boolean;
};
const UserPostDetail: React.FC<Props> = ({ isAccount = false }) => {
  const dispatch = useAppDispatch();
  const [isOpenSettingPost, setIsOpenSettingPost] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [liked, setLiked] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  const [editCaption, setEditCaption] = useState("");
  const [isOpenComment, setisOpenComment] = useState(false);
  const inputRef = useRef<TextAreaRef>(null);

  const getUserData = useAppSelector(getUser);
  const loadingPost = useAppSelector(getLoadingPosts);
  const postDetailData = useAppSelector(getPostDetail);

  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);

  useEffect(() => {
    dispatch(postDetailApi.getPost(postId));

    // if (getUserData.user.id === likedData.userId) {
    //   setLiked(true);
    // }
  }, []);

  const handleUpdatePost = () => {
    const data = {
      post: {
        caption: editCaption,
      },
    };
    dispatch(postDetailApi.update(postId, data));
  };

  const handleDeletePost = () => {
    dispatch(postsApi.delete(postId));
    // dispatch(postsApi.getAll());
  };

  const handleLike = () => {
    setLiked(true);
    // dispatch(likedApi.like(postId));
  };
  const handleDisLike = () => {
    setLiked(false);
    // dispatch(likedApi.disLike(id, likeId));
  };

  return (
    <>
      {loadingPost ? (
        "Loading..."
      ) : (
        <div className={` ${styles.postDetail}`} onClick={() => navigate(-1)}>
          <div
            className={styles.postDetailContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.top}>
              <div className={styles.postDetailImg}>
                <img src={postDetailData.image} alt="" />
              </div>
              <div className={styles.postDetailContent}>
                {/* HEADER */}
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
                  <Comments />
                </div>
              </div>
            </div>

            <div className={styles.bottom}>
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
                    <span>20</span> Liked
                  </Typography>
                </div>
                <div className={styles.save} style={{ lineHeight: 0 }}>
                  <BsBookmarkPlus size={26} />
                </div>
              </div>

              {/* COMMENT */}
              <div
                className={
                  isOpenComment
                    ? `${styles.commentMobile} ${styles.open} `
                    : `${styles.commentMobile}`
                }
              >
                <Comments />
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
                  ref={inputRef}
                  id={"input-comment"}
                  placeholder="Add a comment..."
                  className={styles.inputComment}
                />
                <button type="submit" className={styles.btnComment}>
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPostDetail;