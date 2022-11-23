import { Button, Col, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { UserCommentResponse } from "~/common/types";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import {
  getLoadingComment,
  getLoadingPosts,
  getLoadingUpdateCaption,
  getPostDetail,
} from "~/features/accountPost/postDetail/postDetailSlice";
import { getUser } from "~/features/Auth/userSlice";
import { postOfFollowingApi } from "~/features/postOfFollowing/postOfFollowingApi";
import LoadingSpinner from "../LoadingSpinner";

import styles from "./commentsStyles.module.scss";

type Props = {
  commentList?: UserCommentResponse[];
  postId: number | null;
  isAccount?: boolean;
  isOpenEdit?: boolean;
};

const Comments: React.FC<Props> = ({
  commentList,
  postId,
  isAccount,
  isOpenEdit,
}) => {
  const dispatch = useAppDispatch();
  const [ellipsis, setEllipsis] = useState(true);

  const getUserData = useAppSelector(getUser);
  const loadingPost = useAppSelector(getLoadingPosts);
  const loadingComment = useAppSelector(getLoadingComment);
  const postDetailData = useAppSelector(getPostDetail);
  const loadingupdateCaption = useAppSelector(getLoadingUpdateCaption);

  const handleDeleteComment = async (idComment: number | null) => {
    await dispatch(postDetailApi.deleteComment(postId, idComment));
    dispatch(postDetailApi.getPost(postId));
  };

  return (
    <div
      className={
        commentList && commentList?.length > 0
          ? `${styles.commentList}`
          : `${styles.commentList} ${styles.hidden}`
      }
    >
      {!isOpenEdit && (
        <>
          {loadingupdateCaption ? (
            <LoadingSpinner width={20} />
          ) : (
            <Typography.Paragraph
              ellipsis={
                ellipsis ? { rows: 2, expandable: true, symbol: "more" } : false
              }
              className={styles.caption}
            >
              {postDetailData.caption}
            </Typography.Paragraph>
          )}
        </>
      )}

      {loadingComment ? (
        <LoadingSpinner width={20} />
      ) : (
        <div>
          {commentList && commentList.length > 0
            ? commentList.map((comment) => (
                <div className={styles.commentItem} key={comment.id}>
                  <div className={styles.infoComment}>
                    <div className={styles.userImage}>
                      <Link
                        to={
                          comment.user_id === getUserData.user.id
                            ? "/profile"
                            : `/user-profile/${comment.user_id}`
                        }
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
                  {comment.user_id === getUserData.user.id || isAccount ? (
                    <div
                      className={styles.iconRemove}
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <i
                        className={`far fa-backspace ${styles.deleteIcon}`}
                      ></i>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default Comments;
