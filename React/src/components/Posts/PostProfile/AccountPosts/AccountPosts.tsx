import { Col, Row } from "antd";
import React from "react";
import { PostAccount } from "~/common/types";
import AccountPost from "../AccountPost/AccountPost";
import styles from "./accountPostStyles.module.scss";

type Props = {
  postList: PostAccount[];
  isAccount: boolean;
};

const AccountPosts: React.FC<Props> = ({ postList, isAccount }) => {
  const reversed = [...postList].reverse();
  return (
    <div className={styles.postList}>
      {postList &&
        postList.length > 0 &&
        reversed.map((post) => (
          <div className={styles.postItem} key={post.id}>
            <AccountPost
              id={post.id}
              image={post.image}
              isAccount={isAccount}
            />
          </div>
        ))}
    </div>
  );
};

export default AccountPosts;
