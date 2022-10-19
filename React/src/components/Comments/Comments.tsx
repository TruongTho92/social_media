import { Typography } from "antd";
import React, { useState } from "react";
import { UserCommentResponse } from "~/common/types";
import styles from "./commentsStyles.module.scss";
import { IoIosRemove } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { getCommentData } from "~/features/comment/commentSlice";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import { commenttApi } from "~/features/comment/commentApi";

type Props = {
  commentList?: UserCommentResponse[];
  postId: number | null;
  isAccount?: boolean;
};

const Comments: React.FC<Props> = ({ commentList, postId, isAccount }) => {
  const dispatch = useAppDispatch();
  const [ellipsis, setEllipsis] = useState(true);
  const commentDataId = useAppSelector(getCommentData);

  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    await dispatch(commenttApi.deleteComment(postId, commentDataId.id));
    dispatch(postDetailApi.getPost(postId));
  };
  return (
    <>
      <div
        className={
          commentList
            ? `${styles.commentList}`
            : `${styles.commentList} ${styles.hidden}`
        }
      >
        {commentList && commentList.length > 0
          ? commentList.map((comment, index) => (
              <div className={styles.commentItem} key={index}>
                <div className={styles.userImage}>
                  <img
                    src={
                      comment.avatar
                        ? comment.avatar
                        : `/assets/user-vacant.jpg`
                    }
                    alt=""
                  />
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
                {isAccount ? (
                  <div className="iconRemove">
                    <IoIosRemove size={24} cursor={"pointer"} />
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
