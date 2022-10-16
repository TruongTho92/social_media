import React, { useRef, useState } from "react";
import styles from "./postDetailStyles.module.scss";
import { Link, useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus, BsThreeDots } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { Input, Typography } from "antd";

import Comments from "~/components/Comments";
import { TextAreaRef } from "antd/lib/input/TextArea";
import Tooltip from "antd/es/tooltip";

export type Props = {
  id: number | null;
  isAccount: boolean;
};
const PostDetail: React.FC<Props> = ({ id, isAccount = false }) => {
  const [isOpenSettingPost, setIsOpenSettingPost] = useState(false);
  const [liked, setLiked] = useState(false);

  const [isOpenComment, setisOpenComment] = useState(false);
  const inputRef = useRef<TextAreaRef>(null);

  return (
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
                    <img src="/assets/images/user-img.jpg" alt="" />
                  </div>
                </Link>
                <div className={styles.info}>
                  <p className={styles.name}>Minh Tài</p>
                  <p className={styles.description}>Conianguys</p>
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
                        <Typography className={`${styles.text} ${styles.warn}`}>
                          Delete
                        </Typography>
                        <Typography className={styles.text}>Edit</Typography>
                      </div>
                    )}
                  >
                    <BsThreeDots
                      className={styles.iconSettingPost}
                      onClick={() => setIsOpenSettingPost(!isOpenSettingPost)}
                    />
                  </Tooltip>
                </div>
              ) : null}
            </div>

            {/* CAPTION */}
            <Typography className={styles.caption}>
              adkjhdahsh ahjdh akshdjka shdjkhajk dhajksdh jkashd ahd haksdjka
              djkasdjk sda dasd asd asd ada lajsdkl alskdj aklsdjkla jkld klaslk
              asda dd da sd ad adasdad adawd awd
            </Typography>

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
                <AiFillHeart className={`${styles.icon} ${styles.active} `} />
              ) : (
                <AiOutlineHeart className={styles.icon} />
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
  );
};

export default PostDetail;
