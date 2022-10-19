import { Button, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { BsBookmarkPlus, BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

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

import styles from "./postMainDetailStyles.module.scss";

export type Props = {
  id: number | null;
  isAccount: boolean;
};
const PostDetail: React.FC<Props> = ({ id, isAccount = false }) => {
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
  console.log(loadingPost);

  useEffect(() => {
    // Call Api here
  }, []);

  const handleUpdatePost = () => {
    const data = {
      post: {
        caption: editCaption,
      },
    };

    dispatch(postDetailApi.update(id, data));
  };

  const handleDeletePost = () => {
    dispatch(postsApi.delete(id));
  };

  const handleLike = () => {
    setLiked(true);
  };
  const handleDisLike = () => {
    setLiked(false);
  };

  return (
    <>
      {loadingPost ? (
        "Loading..."
      ) : (
        <div className={` ${styles.postDetail}`}>
          <div className={styles.postDetailContainer}>
            <div className={styles.top}>
              <div className={styles.postDetailImg}>
                <img src="/assets/images/post_img.jpg" alt="" />
              </div>
              <div className={styles.postDetailContent}>
                {/* HEADER */}
                <div className={styles.postDetailHeader}>
                  <div className={styles.userName}>
                    <Link to={`/profile/id`}>
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
                    </Link>
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
                      defaultValue={"1"}
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
                    adkjhdahsh ahjdh akshdjka shdjkhajk dhajksdh jkashd ahd
                    haksdjka djkasdjk sda dasd asd asd ada lajsdkl alskdj
                    aklsdjkla jkld klaslk asda dd da sd ad adasdad adawd awd
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

export default PostDetail;
