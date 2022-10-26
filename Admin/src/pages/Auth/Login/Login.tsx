import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch } from "~/app/hooks";
import { UserDataTypes } from "~/common/types";
import { userApi } from "~/features/Auth/userApi";

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

    dispatch(userApi.loginUser(data));
  };

  return (
    <div className={`${styles.login}`}>
      <img
        className={styles.loginBgLeft}
        src="/assets/images/auth-v1-tree.png"
        alt=""
      />
      <img
        className={styles.loginBgRight}
        src="/assets/images/auth-v1-tree-2.png"
        alt=""
      />

      <Row
        justify="center"
        align="middle"
        style={{ width: "100%", height: "100%" }}
      >
        <Col className={styles.loginRight}>
          <div className={styles.loginForm}>
            <div className={styles.loginFormLogo}>
              <img src="/assets/images/Instagram_logo.png" alt="" />
            </div>
            <span className={styles.heading}>Welcome to comeback!! 👋</span>
            <span className={styles.subHeading}>
              Please sign-in to your account and start the adventure
            </span>
            <form onSubmit={handleLogin} className={styles.form}>
              <label className={styles.form__label} htmlFor="input-email">
                Email
              </label>
              <Input
                value={email}
                name="email"
                type="text"
                id="input-email"
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
                placeholder="Enter your email address"
                required
              />
              <label className={styles.form__label} htmlFor="input-password">
                Password
              </label>

              <Input.Password
                value={password}
                name="password"
                type="password"
                id="input-password"
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
                placeholder="**********"
                required
              />
              <button type="submit" className={styles.loginBtn}>
                login
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
