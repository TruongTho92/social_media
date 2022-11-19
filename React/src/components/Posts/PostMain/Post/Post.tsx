import { Typography } from "antd";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import { Link, useLocation } from "react-router-dom";

import moment from "moment";
import Slider from "react-slick";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { LikeDataResponse, SaveReponse } from "~/common/types";
import {
  NextArrow,
  PrevArrow,
} from "~/components/ArrowSlickCustom/ArrowSlickCustom";
import { getUser } from "~/features/Auth/userSlice";
import { postOfFollowingApi } from "~/features/postOfFollowing/postOfFollowingApi";
import {
  getLikePostMain,
  getLoadingPostFollowing,
} from "~/features/postOfFollowing/postOfFollowingSlice";
import {
  getAllPostSaveAsync,
  savePostAsync,
  unSavePostAsync,
} from "~/features/savePosts/savePostsSlice";

import styles from "./postStyles.module.scss";

type Props = {
  avatar: string;
  userId: number;
  postId: number;
  userName: string;
  nickName: string;
  caption: string;
  imagePost: string[];
  dateCreated: string;
  likes: LikeDataResponse[];
  comments: LikeDataResponse[];
  allPostSaved: SaveReponse[];
};

const Post: React.FC<Props> = ({
  avatar,
  userId,
  postId,
  userName,
  nickName,
  imagePost,
  caption,
  dateCreated,
  likes,
  comments,
  allPostSaved,
}) => {
  const [liked, setLiked] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  const [saved, setSaved] = useState(false);
  const dispatch = useAppDispatch();
  const getUserData = useAppSelector(getUser);
  const likePostMain = useAppSelector(getLikePostMain);
  const loadingPostFollowing = useAppSelector(getLoadingPostFollowing);

  const location = useLocation();

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

  useEffect(() => {
    if (allPostSaved.find((post) => post.id === postId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [allPostSaved, postId]);

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

  const handleSavePost = async (idPost: number) => {
    setSaved(true);
    await dispatch(savePostAsync(idPost));
    dispatch(getAllPostSaveAsync());
  };
  const handleUnSavePost = async (idPost: number) => {
    setSaved(false);
    await dispatch(unSavePostAsync(idPost));
    dispatch(getAllPostSaveAsync());
  };

  return (
    <LazyLoad className={styles.height} threshold={0.4}>
      <div className={styles.post}>
        <div className={styles.user}>
          <div className={styles.userName}>
            <Link to={`/user-profile/${userId}`}>
              <div className={styles.image}>
                <img
                  src={avatar ? avatar : "/assets/images/user-img.jpg"}
                  alt=""
                  loading="lazy"
                />
              </div>
            </Link>
            <div className={styles.info}>
              <p className={styles.name}>{userName}</p>
              <p className={styles.description}>{nickName} </p>
            </div>
          </div>
        </div>

        {/* IMAGES */}
        {imagePost.length > 1 ? (
          <Slider {...settings}>
            {imagePost.map((image: string) => (
              <div className={styles.postImage} key={image}>
                <img src={image} alt="" />
              </div>
            ))}
          </Slider>
        ) : (
          imagePost.map((image: string) => (
            <div className={styles.postImage} key={image}>
              <img src={image} alt="" />
            </div>
          ))
        )}

        <div className={styles.postContent}>
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
            {saved ? (
              <div
                style={{ lineHeight: 0 }}
                onClick={() => handleUnSavePost(postId)}
              >
                <i className={`fas fa-bookmark ${styles.saveIcon}`}></i>
              </div>
            ) : (
              <div
                style={{ lineHeight: 0 }}
                onClick={() => handleSavePost(postId)}
              >
                <i className={`fal fa-bookmark ${styles.saveIcon}`}></i>
              </div>
            )}
          </div>

          <Typography className={styles.textUserLiked}>
            <span>{likes?.length}</span> likes
          </Typography>

          <div className={styles.captionContainer}>
            <Typography className={styles.userNameCaption}>
              {userName}
            </Typography>
            <Typography.Paragraph
              ellipsis={
                ellipsis ? { rows: 1, expandable: true, symbol: "more" } : false
              }
              className={styles.caption}
            >
              {caption}
            </Typography.Paragraph>
          </div>
          {comments?.length > 0 ? (
            <Link
              to={`/post-newfeeds/${postId}`}
              className={styles.commentList}
              state={{ background: location }}
            >
              View all {comments.length} comments
            </Link>
          ) : null}
          <Typography className={styles.dateCreated}>
            {moment(dateCreated).fromNow()}
          </Typography>
        </div>
      </div>
    </LazyLoad>
  );
};

export default Post;
