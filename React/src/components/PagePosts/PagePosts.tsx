import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./pagePostsStyles.module.scss";
type Props = {};

const PagePosts = (props: Props) => {
  return (
    <div className={styles.postPages}>
      <div className={styles.postPageItem}>
        <NavLink
          end
          className={({ isActive }) =>
            isActive
              ? `${styles.postPageLink} ${styles.active}`
              : `${styles.postPageLink}`
          }
          to="/profile"
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <i className={`fas fa-th-large ${styles.postPageIcon}`}></i>
                <span>Posts</span>
              </>
            ) : (
              <>
                <i className={`far fa-th-large ${styles.postPageIcon}`}></i>
                <span>Posts</span>
              </>
            )
          }
        </NavLink>
      </div>
      <div className={styles.postPageItem}>
        <NavLink
          to="/profile/saves"
          className={({ isActive }) =>
            isActive
              ? `${styles.postPageLink} ${styles.active}`
              : `${styles.postPageLink}`
          }
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <i className={`fas fa-bookmark ${styles.postPageIcon}`}></i>
                <span>Saves</span>
              </>
            ) : (
              <>
                <i className={`fal fa-bookmark ${styles.postPageIcon}`}></i>
                <span>Saves</span>
              </>
            )
          }
        </NavLink>
      </div>
    </div>
  );
};

export default PagePosts;
