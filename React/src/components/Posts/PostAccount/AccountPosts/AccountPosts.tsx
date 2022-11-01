import React from "react";
import { FaMehRollingEyes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PostAccount } from "~/common/types";
import AccountPost from "../AccountPost/AccountPost";
import styles from "./accountPostStyles.module.scss";

type Props = {
  isAccount: boolean;
  postList: PostAccount[];
};

const AccountPosts: React.FC<Props> = ({ postList, isAccount = false }) => {
  const reversed = [...postList].sort((a, b) => b.id - a.id);

  return (
    <section className={styles.postList}>
      {postList && postList.length > 0 ? (
        reversed.map((post) => (
          <div className={styles.postItem} key={post.id}>
            <AccountPost id={post.id} image={post.image} />
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
          {isAccount && (
            <Link className={styles.nonePostLink} to="/create-post">
              Create post now
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

export default AccountPosts;
