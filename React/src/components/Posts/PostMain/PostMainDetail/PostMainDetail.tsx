import { Input, Typography } from "antd";
import { TextAreaRef } from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import {
  NextArrow,
  PrevArrow,
} from "~/components/ArrowSlickCustom/ArrowSlickCustom";
import Comments from "~/components/Comments";
import Loading from "~/components/Loading";
import LoadingSpinner from "~/components/LoadingSpinner";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import {
  getLikeData,
  getLoadingLike,
  getLoadingPosts,
  getPostDetail,
  getUsersCommented,
  getUsersLiked,
} from "~/features/accountPost/postDetail/postDetailSlice";
import { getUser } from "~/features/Auth/userSlice";
import { postOfFollowingApi } from "~/features/postOfFollowing/postOfFollowingApi";
import { profileUserApi } from "~/features/profileUser/profileUserApi";
import { getProfileUser } from "~/features/profileUser/profileUserSlice";
import {
  getAllPostSave,
  getAllPostSaveAsync,
  getLoadingSave,
  savePostAsync,
  unSavePostAsync,
} from "~/features/savePosts/savePostsSlice";

import styles from "./postMainDetailStyles.module.scss";

export type Props = {};
const PostMainDetail: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const [isOpenComment, setisOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const inputRef = useRef<TextAreaRef>(null);

  const getUserData = useAppSelector(getUser);
  const loadingPost = useAppSelector(getLoadingPosts);
  const loadingLike = useAppSelector(getLoadingLike);
  const likeData = useAppSelector(getLikeData);
  const profileUser = useAppSelector(getProfileUser);
  const postDetailData = useAppSelector(getPostDetail);
  const userLikedData = useAppSelector(getUsersLiked);
  const commentData = useAppSelector(getUsersCommented);
  const allPostSaved = useAppSelector(getAllPostSave);

  const { id } = useParams();
  const postId = Number(id);

  // CONFIG SLICK
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

  // GET DETAIL POST DATA
  useEffect(() => {
    if (postDetailData.user_id) {
      dispatch(profileUserApi.getProfileUser(postDetailData.user_id));
    }
    dispatch(postDetailApi.getPost(postId));

    document.body.classList.add("postDetailOpen");
    return function cleanup() {
      document.body.classList.remove("postDetailOpen");
    };
  }, [postDetailData.user_id]);

  useEffect(() => {
    if (userLikedData.find((like: any) => like.id === getUserData.user.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [userLikedData, likeData]);

  useEffect(() => {
    if (allPostSaved.find((post) => post.id === postId)) {
      setSaved(true);
    }
  }, [allPostSaved, postId]);

  // LIKE
  const handleLike = async () => {
    await dispatch(postDetailApi.like(postId));
    dispatch(postDetailApi.getPost(postId));
    setLiked(true);
  };
  const handleDisLike = async () => {
    await dispatch(postDetailApi.disLike(postId, likeData.id));
    dispatch(postDetailApi.getPost(postId));
    setLiked(false);
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
            navigate("/");
            dispatch(profileUserApi.getProfileUser(getUserData.user.id));
            dispatch(postOfFollowingApi.getPostFollowing());
          }}
        >
          <div
            className={styles.postDetailContainer}
            onClick={(e) => e.stopPropagation()}
          >
            {postDetailData.image.length > 1 ? (
              <Slider {...settings}>
                {postDetailData.image.map((image: string) => (
                  <div className={styles.postDetailImg} key={image}>
                    <img src={image} alt="" />
                  </div>
                ))}
              </Slider>
            ) : (
              postDetailData.image.map((image: string) => (
                <div className={styles.postDetailImg} key={image}>
                  <img src={image} alt="" />
                </div>
              ))
            )}

            <div className={styles.postDetailContent}>
              <div className={styles.contentTop}>
                {/* HEADER */}
                <div className={styles.postDetailHeader}>
                  <div className={styles.userName}>
                    <div className={styles.image}>
                      <Link to={`/user-profile/${profileUser.user.id}`}>
                        <img
                          src={
                            profileUser.user.avatar
                              ? profileUser.user.avatar
                              : `/assets/images/user-vacant.jpg`
                          }
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className={styles.info}>
                      <p className={styles.name}>
                        {profileUser.user.user_name}
                      </p>
                      <p className={styles.description}>
                        {profileUser.user.nick_name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* COMMENT */}
                <div className={styles.comment}>
                  <Comments postId={postId} commentList={commentData} />
                </div>
              </div>

              {/* POST IMAGE MOBILE */}
              {postDetailData.image.length > 1 ? (
                <Slider {...settingsMobile}>
                  {postDetailData.image.map((image: string) => (
                    <div className={styles.postDetailImgMobile} key={image}>
                      <img src={image} alt="" />
                    </div>
                  ))}
                </Slider>
              ) : (
                postDetailData.image.map((image: string) => (
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
                    required={true}
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
