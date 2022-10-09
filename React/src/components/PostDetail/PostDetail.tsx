import React from "react";
import styles from "./postDetailStyles.module.scss";
import { Link, useParams } from "react-router-dom";
import Comments from "../Comments";

const PostDetail = () => {
  const { id } = useParams();

  return (
    <div className={`container-fluid ${styles.postDetail}`}>
      <div className={styles.postDetailContainer}>
        <div className={styles.postDetailImg}>
          <img src="/assets/images/post_img.jpg" alt="" />
        </div>
        <div className={styles.postDetailContent}>
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
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
