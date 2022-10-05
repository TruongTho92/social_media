import { Col, Row } from "antd";
import { useEffect } from "react";
import { useAppDispatch } from "~/app/hooks";
import PostList from "~/components/PostList";
import UserList from "~/components/UserList";
import { loadUserAsync } from "~/features/User/UserSlice";
import styles from "./homeStyles.module.scss";

export interface postsTypes {
  id: number;
  title: string;
  description: string;
}

const HomePage = () => {
  return (
    <div className={`container-fluid pt-80 ${styles.homePage} `}>
      <Row gutter={[24, 24]}>
        <Col span={16}>
          <PostList />
        </Col>
        <Col span={8}>
          <UserList />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
