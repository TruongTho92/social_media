import { Typography } from "antd";
import React, { useState } from "react";
import { CommentDataResponse } from "~/common/types";
import styles from "./commentsStyles.module.scss";

type Props = {
  commentList?: CommentDataResponse[];
};

const Comments: React.FC<Props> = ({ commentList }) => {
  const [ellipsis, setEllipsis] = useState(true);

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
                  <img src="/assets/images/user-img.jpg" alt="" />
                </div>
                <div className={styles.content}>
                  <span className={styles.name}>Minh Tai</span>
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
            ))
          : null}
      </div>
    </>
  );
};

export default Comments;
