import { Col, Row } from "antd";
import PostList from "~/components/PostList";
import styles from "./homeStyles.module.scss";

export interface postsTypes {
  id: number;
  title: string;
  description: string;
}

const HomePage = () => {
  return (
    <div className={`container-fluid ${styles.homePage}`}>
      <Row>
        <Col span={16}>
          <PostList />
        </Col>
        <Col span={8}>User</Col>
      </Row>
    </div>
  );
};

export default HomePage;
