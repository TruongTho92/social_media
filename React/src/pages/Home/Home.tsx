import { Col, Row } from "antd";
import PostList from "~/components/Posts/PostMain/PostList";
import UserList from "~/components/UserList";
import styles from "./homeStyles.module.scss";

const HomePage: React.FC = () => {
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
