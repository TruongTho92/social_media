import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginStyles.module.scss";

export interface userTypes {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<userTypes>({ username: "", password: "" });

  const handleLogin = () => {
    const userLocal = JSON.parse(localStorage.getItem("user") || "{}");
    if (
      user.username === userLocal.username &&
      user.password === userLocal.password
    ) {
      navigate("/");
    } else if (
      user.username !== userLocal.username &&
      user.password !== userLocal.password
    ) {
      alert(" Username or password is incorrect");
    } else {
      alert("nhajp day du thong tin");
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
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
                value={user.username}
                name="username"
                type="text"
                onChange={handleLoginChange}
                className={styles.formInput}
                placeholder="username"
                required
              />

              <Input.Password
                value={user.password}
                name="password"
                type="password"
                onChange={handleLoginChange}
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
    </div>
  );
};

export default LoginPage;
