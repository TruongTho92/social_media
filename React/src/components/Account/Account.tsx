import { Col, Row } from "antd";
import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppSelector } from "~/app/hooks";
import { getLoading, getUser } from "~/features/User/UserSlice";
import ModalSetting from "../Modal/ModalSetting";
import styles from "./accountStyles.module.scss";
type Props = {};

const Account: React.FC = (props: Props) => {
  const getUserData = useAppSelector(getUser);
  const loading = useAppSelector(getLoading);
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className={`container-fluid ${styles.account}`}>
          <div className={styles.accountContainer}>
            <div className={styles.accountInfo}>
              <div className={styles.image}>
                <img
                  src={
                    getUserData.user.avatar
                      ? getUserData.user.avatar
                      : "/assets/images/user-vacant.jpg"
                  }
                  alt=""
                />
              </div>
              <div className={styles.info}>
                <div className={`${styles.infoItem} ${styles.infoItemMobile}`}>
                  <span className={styles.name}>
                    {getUserData.user.user_name ? (
                      getUserData.user.user_name
                    ) : (
                      <span className={styles.errorUpdate}>
                        * Update your name
                      </span>
                    )}
                  </span>

                  <Link to="/profile/update" className={styles.linkEdit}>
                    Edit profile
                  </Link>
                  <ModalSetting classNameIconSetting={styles.settingIcon} />
                </div>
                <div className={`${styles.infoItem} ${styles.infoItemFollow}`}>
                  <span className={styles.posts}>
                    <span>12</span> posts
                  </span>
                  <span className={styles.follower}>
                    <span>122312</span> followers
                  </span>
                  <span className={styles.following}>
                    <span>200000</span> following
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <div>
                    <span className={styles.username}>
                      {getUserData.user.nick_name ? (
                        getUserData.user.nick_name
                      ) : (
                        <span className={styles.errorUpdate}>
                          * Update your nick name
                        </span>
                      )}
                    </span>
                    <div className={styles.bio}>
                      {getUserData.user.bio ? (
                        getUserData.user.bio
                      ) : (
                        <span className={styles.errorUpdate}>
                          * Update your Biography
                        </span>
                      )}
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
      )}
    </>
  );
};

export default Account;
