import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import styles from "./authStyles.module.scss";

const Auth = () => {
  return (
    <div className={`container-fluid ${styles.login}`}>
      <Row
        justify="center"
        align="middle"
        style={{ width: "100%", height: "100%" }}
      >
        <Col
          sm={24}
          md={12}
          lg={12}
          span={12}
          xl={12}
          className={styles.loginLeft}
        >
          <img src="/assets/images/login-background.png" alt="" />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          span={12}
          xl={12}
          className={styles.loginRight}
        >
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
