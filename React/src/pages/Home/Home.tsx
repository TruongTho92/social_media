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
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <PostList />
        </Col>
        <Col xs={0} sm={0} md={8} lg={8} xl={8}>
          <UserList />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
