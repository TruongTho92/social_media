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
  return (
    <div className={styles.postList}>
      {postList &&
        postList.length > 0 &&
        postList.map((post) => (
          <div
            // xs={24}
            // sm={24}
            // md={12}
            // lg={8}
            // xl={8}
            // xxl={8}
            className={styles.postItem}
            key={post.id}
          >
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
