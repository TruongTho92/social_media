import { Button, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./postDetailStyles.module.scss";

import Tooltip from "antd/es/tooltip";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { MdOutlineDone } from "react-icons/md";
import Slider from "react-slick";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import {
  NextArrow,
  PrevArrow,
} from "~/components/ArrowSlickCustom/ArrowSlickCustom";
import Comments from "~/components/Comments";
import Loading from "~/components/Loading";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import {
  getLikeData,
  getLoadingLike,
  getLoadingPosts,
  getLoadingUpdateCaption,
  getPostDetail,
  getUsersCommented,
  getUsersLiked,
} from "~/features/accountPost/postDetail/postDetailSlice";
import { postsApi } from "~/features/accountPost/Posts/postsApi";
import { getAllPost } from "~/features/accountPost/Posts/postsSlice";
import { getUser } from "~/features/Auth/userSlice";
import { getProfileUser } from "~/features/profileUser/profileUserSlice";
import {
  getAllPostSave,
  getAllPostSaveAsync,
  savePostAsync,
  unSavePostAsync,
} from "~/features/savePosts/savePostsSlice";
import moment from "moment";
import LoadingSpinner from "~/components/LoadingSpinner";

export type Props = {};
const PostDetail: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [isOpenSettingPost, setIsOpenSettingPost] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [liked, setLiked] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  const [editCaption, setEditCaption] = useState("");
  const [isOpenComment, setisOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const inputRef = useRef<TextAreaRef>(null);
  const [isAccount, setIsAccount] = useState(false);

  const getUserData = useAppSelector(getUser);
  const loadingPost = useAppSelector(getLoadingPosts);
  const likeData = useAppSelector(getLikeData);
  const loadingLike = useAppSelector(getLoadingLike);

  const userProfile = useAppSelector(getProfileUser);
  const allPostData = useAppSelector(getAllPost);
  const postDetailData = useAppSelector(getPostDetail);
  const userLikedData = useAppSelector(getUsersLiked);
  const commentData = useAppSelector(getUsersCommented);
  const allPostSaved = useAppSelector(getAllPostSave);

  const { id } = useParams();
  const postId = Number(id);

  // GET POST DETAIL
  useEffect(() => {
    dispatch(postDetailApi.getPost(postId));
    dispatch(getAllPostSaveAsync());

    document.body.classList.add("postDetailOpen");
    return function cleanup() {
      document.body.classList.remove("postDetailOpen");
    };
  }, []);

  // CHECK SAVED POST
  useEffect(() => {
    if (allPostSaved.find((post) => post.id === postId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [allPostSaved, postId]);

  // CHECK ACCOUNT AND LIKED
  useEffect(() => {
    if (allPostData.find((post: any) => post.user_id === getUserData.user.id)) {
      setIsAccount(true);
    }
    if (userLikedData.find((like: any) => like.id === getUserData.user.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [allPostData, getUserData.user.id, userLikedData]);

  // CONFIG Slider
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    className: `${styles.slider} ${styles.postImgSlider}`,
    nextArrow: (
      <NextArrow
        styleArrow={styles.arrow}
        styleNext={styles.next}
        styleIcon={styles.arrowNextIcon}
      />
    ),
    prevArrow: (
      <PrevArrow
        styleArrow={styles.arrow}
        stylePrev={styles.prev}
        styleIcon={styles.arrowNextIcon}
      />
    ),
    dotsClass: `slick-dots ${styles.slickDots} ${styles.slickThumb}`,
    customPaging: (i: any) => <div className={styles.dotCustom}></div>,
  };
  const settingsMobile = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    className: `${styles.slider} ${styles.postImgSliderMobile}`,
    nextArrow: (
      <NextArrow
        styleArrow={styles.arrow}
        styleNext={styles.next}
        styleIcon={styles.arrowNextIcon}
      />
    ),
    prevArrow: (
      <PrevArrow
        styleArrow={styles.arrow}
        stylePrev={styles.prev}
        styleIcon={styles.arrowNextIcon}
      />
    ),
    dotsClass: `slick-dots ${styles.slickDots} ${styles.slickThumb}`,
    customPaging: (i: any) => <div className={styles.dotCustom}></div>,
  };

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

  // DELETE POST
  const handleDeletePost = async () => {
    await dispatch(postsApi.delete(postId));
    dispatch(postsApi.getAll(getUserData.user.id));
    navigate("/profile");
  };

  // LIKE POST
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
    if (!comment) return;

    await dispatch(postDetailApi.comment(payload, postId));
    dispatch(postDetailApi.getPost(postId));
    setComment("");
    inputRef.current?.focus();
  };

  //Handle Save Post
  const handleSavePost = async (idPost: number) => {
    await dispatch(savePostAsync(idPost));
    setSaved(true);
    dispatch(postDetailApi.getPost(postId));

    dispatch(getAllPostSaveAsync());
  };
  const handleUnSavePost = async (idPost: number) => {
    await dispatch(unSavePostAsync(idPost));
    setSaved(false);
    dispatch(postDetailApi.getPost(postId));
    dispatch(getAllPostSaveAsync());
  };

  return (
    <>
      {postDetailData.id !== postId ? (
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
            {/* IMAGES DESKTOP*/}
            {postDetailData.image.length > 1 ? (
              <Slider {...settings}>
                {postDetailData.image.map((image) => (
                  <div className={styles.postDetailImg} key={image}>
                    <img src={image} alt="" />
                  </div>
                ))}
              </Slider>
            ) : (
              postDetailData.image.map((image) => (
                <div className={styles.postDetailImg} key={image}>
                  <img src={image} alt="" />
                </div>
              ))
            )}

            {/* CONTENT */}
            <div className={styles.postDetailContent}>
              {/* HEADER */}
              <div className={styles.contentTop}>
                {isAccount ? (
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
                ) : (
                  <div className={styles.postDetailHeader}>
                    <div className={styles.userName}>
                      <div className={styles.image}>
                        <img
                          src={
                            userProfile.user.avatar
                              ? userProfile.user.avatar
                              : `/assets/images/user-vacant.jpg`
                          }
                          alt=""
                        />
                      </div>
                      <div className={styles.info}>
                        <p className={styles.name}>
                          {userProfile.user.user_name}
                        </p>
                        <p className={styles.description}>
                          {userProfile.user.nick_name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

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
                ) : null}

                {/* COMMENT */}
                <div className={styles.comment}>
                  <Comments
                    postId={postId}
                    isAccount={isAccount}
                    commentList={commentData}
                    isOpenEdit={isOpenEdit}
                  />
                </div>
              </div>

              {/* POST IMAGE MOBILE */}
              {postDetailData.image.length > 1 ? (
                <Slider {...settingsMobile}>
                  {postDetailData.image.map((image) => (
                    <div className={styles.postDetailImgMobile} key={image}>
                      <img src={image} alt="" />
                    </div>
                  ))}
                </Slider>
              ) : (
                postDetailData.image.map((image) => (
                  <div className={styles.postDetailImgMobile} key={image}>
                    <img src={image} alt="" />
                  </div>
                ))
              )}

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

                  {saved ? (
                    <div
                      style={{ lineHeight: 0 }}
                      onClick={() => handleUnSavePost(postId)}
                    >
                      <i className={`fas fa-bookmark ${styles.iconSave}`}></i>
                    </div>
                  ) : (
                    <div
                      style={{ lineHeight: 0 }}
                      onClick={() => handleSavePost(postId)}
                    >
                      <i className={`fal fa-bookmark ${styles.iconSave}`}></i>
                    </div>
                  )}
                </div>

                {loadingLike ? (
                  <div className="d-flex justify-content-start ml-3 my-2">
                    <LoadingSpinner width={20} />
                  </div>
                ) : (
                  <Typography className={styles.likeNumber}>
                    <span>{userLikedData.length}</span> Likes
                  </Typography>
                )}

                <Typography className={styles.dateCreated}>
                  {moment(postDetailData.created_at).fromNow()}
                </Typography>
                {/* COMMENT MOBILE */}

                {isOpenComment && (
                  <Comments
                    postId={postId}
                    isAccount={isAccount}
                    commentList={commentData}
                  />
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

export default PostDetail;
