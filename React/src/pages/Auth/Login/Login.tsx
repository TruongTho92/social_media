import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch } from "~/app/hooks";
import { UserDataTypes } from "~/common/types";
import { loginUser } from "~/features/User/UserApi";

import styles from "./LoginStyles.module.scss";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data: UserDataTypes = {
      user: {
        email,
        password,
      },
    };

    dispatch(loginUser(data));
  };

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
          <div className={styles.loginForm}>
            <div className={styles.loginFormLogo}>
              <img src="/assets/images/Instagram_logo.png" alt="" />
            </div>
            <form onSubmit={handleLogin} className={styles.form}>
              <Input
                value={email}
                name="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
                placeholder="email"
                required
              />

              <Input.Password
                value={password}
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
                placeholder="password"
                required
              />
              <button type="submit" className={styles.loginBtn}>
                log In
              </button>
              <div className={styles.formLine}>
                <span className={styles.line}></span>
                <span>or</span>
                <span className={styles.line}></span>
              </div>
              <Link to="/forgot-password" className={styles.forgotPass}>
                <span>Forgot password?</span>
              </Link>
            </form>
          </div>
          <div className={styles.signUp}>
            <span className={styles.signUpText}>Don't have account?</span>

            <Link to="/register" className={styles.signUpLink}>
              Sign Up
            </Link>
          </div>
        </Col>
      </Row>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LoginPage;
