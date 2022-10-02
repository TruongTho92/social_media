import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "~/app/hooks";
import { UserDataTypes } from "~/common/types";
import { loginUserAsync } from "~/features/Auth/AuthSlice";
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

    dispatch(loginUserAsync(data));
  };

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ width: "100%", height: "100%" }}
      >
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
              <Link to="/auth/forgot-password" className={styles.forgotPass}>
                <span>Forgot password?</span>
              </Link>
            </form>
          </div>
          <div className={styles.signUp}>
            <span className={styles.signUpText}>Don't have account?</span>

            <Link to="/auth/register" className={styles.signUpLink}>
              Sign Up
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
