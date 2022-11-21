import { Col, Row } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "~/components/Header";
import PostList from "~/components/Posts/PostMain/PostList";
import UserList from "~/components/UserList";
import styles from "./homeStyles.module.scss";

const HomePage: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "light");
    }
  }, []);
  return (
    <>
      <Header />
      <div className={`container-fluid  ${styles.homePage} `}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <PostList />
          </Col>
          <Col xs={0} sm={0} md={10} lg={10} xl={10}>
            <UserList />
          </Col>
        </Row>
      </div>
      <Outlet />
    </>
  );
};

export default HomePage;
