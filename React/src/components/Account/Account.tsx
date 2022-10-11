import { Col, Row } from "antd";
import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./accountStyles.module.scss";
type Props = {};

const Account: React.FC = (props: Props) => {
  return (
    <div className={`container-fluid ${styles.account}`}>
      <div className={styles.accountContainer}>
        <div className={styles.accountInfo}>
          <div className={styles.image}>
            <img src="/assets/images/user-img.jpg" alt="" />
          </div>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.name}>Minh Tai</span>

              <Link to="/profile/update" className={styles.linkEdit}>
                Edit profile
              </Link>
              <AiOutlineSetting className={styles.settingIcon} />
            </div>
            <div className={styles.infoItem}>
              <span className={styles.posts}>
                <span>12</span> posts
              </span>
              <span className={styles.follower}>
                <span>10000</span> followers
              </span>
              <span className={styles.following}>
                <span>200000</span> following
              </span>
            </div>
            <div className={styles.infoItem}>
              <div>
                <span className={styles.username}>Conian Guys </span>
                <div className={styles.bio}>
                  💻Email: minhtaiday3214@gmail.com ⌨️ Behance:
                  https://www.behance.net/imconianguys
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className={styles.line}></span>
      <div className={styles.accountPost}>
        <div className={styles.postImg}>
          <img src="/assets/images/post-img.jpg" alt="" />
        </div>
        <div className={styles.postImg}>
          <img src="/assets/images/post_img.jpg" alt="" />
        </div>
        <div className={styles.postImg}>
          <img src="/assets/images/post-img.jpg" alt="" />
        </div>
        <div className={styles.postImg}>
          <img src="/assets/images/post_img.jpg" alt="" />
        </div>
        <div className={styles.postImg}>
          <img src="/assets/images/post-img.jpg" alt="" />
        </div>
        <div className={styles.postImg}>
          <img src="/assets/images/post_img.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Account;
