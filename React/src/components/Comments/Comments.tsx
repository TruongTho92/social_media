import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosRemove } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { UserCommentResponse } from "~/common/types";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import { getCommentData } from "~/features/accountPost/postDetail/postDetailSlice";
import { getUser } from "~/features/Auth/userSlice";

import styles from "./commentsStyles.module.scss";

type Props = {
  commentList?: UserCommentResponse[];
  postId: number | null;
  isAccount?: boolean;
};

const Comments: React.FC<Props> = ({ commentList, postId, isAccount }) => {
  const dispatch = useAppDispatch();
  const [ellipsis, setEllipsis] = useState(true);
  const [isAccountComment, setIsAccountComment] = useState(false);

  const getUserData = useAppSelector(getUser);

  useEffect(() => {
    if (
      commentList?.find((comment) => comment.user_id === getUserData.user.id)
    ) {
      setIsAccountComment(true);
    }
  }, []);

  const handleDeleteComment = async (idComment: number | null) => {
    await dispatch(postDetailApi.deleteComment(postId, idComment));
    dispatch(postDetailApi.getPost(postId));
  };

  return (
    <>
      <div
        className={
          commentList && commentList?.length > 0
            ? `${styles.commentList}`
            : `${styles.commentList} ${styles.hidden}`
        }
      >
        {commentList && commentList.length > 0
          ? commentList.map((comment) => (
              <div className={styles.commentItem} key={comment.id}>
                <div className={styles.infoComment}>
                  <div className={styles.userImage}>
                    <Link
                      to={isAccountComment ? "/profile" : "/user-profile/133"}
                    >
                      <img
                        src={
                          comment.avatar
                            ? comment.avatar
                            : `/assets/user-vacant.jpg`
                        }
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className={styles.content}>
                    <span className={styles.name}>{comment.user_name}</span>
                    <Typography.Paragraph
                      ellipsis={
                        ellipsis
                          ? { rows: 1, expandable: true, symbol: "more" }
                          : false
                      }
                      className={styles.commentText}
                    >
                      {comment.content}
                    </Typography.Paragraph>
                  </div>
                </div>
                {isAccount ? (
                  <div
                    className={styles.iconRemove}
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <i className={`far fa-backspace ${styles.deleteIcon}`}></i>
                  </div>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Comments;
