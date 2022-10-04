import React, { useState } from "react";
import styles from "./commentsStyles.module.scss";

type Props = {};

const Comments = (props: Props) => {
  const [comments, setComments] = useState([
    { name: "Minh Tai", data: "hay qu di" },
    {
      name: "My Tien",
      data: "hay qu hjhjhjhjhjhjsdlkfjv ldjflfjdsa kjj dkj asjdasj ljd klad jklasdj lkasdjlk ajkl klj kljkl jkl jklsajkl djklasddi",
    },
    { name: "Truong Tho", data: "hay qu di" },
  ]);
  return (
    <div>
      {comments && comments.length > 0
        ? comments.map((item, index) => (
            <div className={styles.commentItem} key={index}>
              <div className={styles.userImage}>
                <img src="/assets/images/user-img.jpg" alt="" />
              </div>
              <div className={styles.content}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.commentText}>{item.data}</span>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Comments;
