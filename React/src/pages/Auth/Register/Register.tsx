import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./registerStyles.module.scss";

export interface userSignUp {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<userSignUp>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = () => {
    if (user.password === user.confirmPassword) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/login");
    } else if (user.password !== user.confirmPassword) {
      alert("password dont match");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <p className={styles.subTitle}>
              Sign up to see photos and videos from your friends.
            </p>
            <form onSubmit={handleRegister} className={styles.form}>
              <Input
                value={user.username}
                name="username"
                type="text"
                onChange={handleChange}
                className={styles.formInput}
                placeholder="username"
                required
              />

              <Input.Password
                value={user.password}
                name="password"
                type="password"
                onChange={handleChange}
                className={styles.formInput}
                placeholder="password"
                required
              />
              <Input.Password
                value={user.confirmPassword}
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                className={styles.formInput}
                placeholder="confirm password"
                required
              />
              <button type="submit" className={styles.loginBtn}>
                Sign Up
              </button>

              <p className={styles.policyText}>
                By signing up, you agree to our <span>Terms</span>,{" "}
                <span>Privacy Policy</span> and <span>Cookies Policy</span> .
              </p>
            </form>
          </div>
          <div className={styles.signUp}>
            <span className={styles.signUpText}>Don't have account?</span>

            <Link to="/login" className={styles.signUpLink}>
              Log In
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
