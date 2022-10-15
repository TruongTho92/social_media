import { Col, Row } from "antd";
import React from "react";
import { PostAccount } from "~/common/types";
import AccountPost from "../AccountPost/AccountPost";
import styles from "./accountPostStyles.module.scss";

type Props = {
  postList: PostAccount[];
};

const AccountPosts: React.FC<Props> = ({ postList }) => {
  return (
    <Row gutter={[24, 24]} className={styles.postList}>
      {postList &&
        postList.length > 0 &&
        postList.map((post) => (
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={8}
            xxl={8}
            className={styles.postItem}
            key={post.id}
          >
            <AccountPost id={post.id} image={post.image} />
          </Col>
        ))}
    </Row>
  );
};

export default AccountPosts;
