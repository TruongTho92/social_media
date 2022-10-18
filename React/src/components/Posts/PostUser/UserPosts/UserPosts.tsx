import React from "react";
import { FaMehRollingEyes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PostAccount } from "~/common/types";
import UserPost from "../UserPost/UserPost";
import styles from "./userPostStyles.module.scss";

type Props = {
  postList: PostAccount[];
};

const UserPosts: React.FC<Props> = ({ postList }) => {
  const reversed = [...postList].reverse();

  return (
    <div className={styles.postList}>
      {postList && postList.length > 0 ? (
        reversed.map((post) => (
          <div className={styles.postItem} key={post.id}>
            <UserPost id={post.id} image={post.image} />
          </div>
        ))
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={styles.nonePost}>
            <FaMehRollingEyes className={styles.iconNone} />
            <span className={styles.nonePostText}>
              Oh No! You dont have post...
            </span>
          </div>
          <Link className={styles.nonePostLink} to="/create-post">
            Create post now
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
