import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { PostAccount } from "~/common/types";
import styles from "./accountPostStyles.module.scss";

type Props = {
  postList: PostAccount[];
};

const AccountPosts: React.FC<Props> = ({ postList }: Props) => {
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
            className={styles.postItem}
            key={post.id}
          >
            <Link to={`/posts/${post.id}`}>
              <div className={styles.postImg}>
                <img src={`${post.image}`} alt="" />
              </div>
            </Link>
          </Col>
        ))}
    </Row>
  );
};

export default AccountPosts;
