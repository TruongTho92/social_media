import { Col, Row } from "antd";
import { Outlet, Route, Routes } from "react-router-dom";
import styles from "./authStyles.module.scss";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";

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
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
