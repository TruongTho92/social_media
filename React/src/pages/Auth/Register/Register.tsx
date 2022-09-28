import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "~/app/hooks";
import {
  getUserRegister,
  registerUserAsync,
} from "~/features/Auth/register/registerSlice";
import styles from "./registerStyles.module.scss";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const getUserRegistered = useSelector(getUserRegister);

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const userSignUp = {
      user: {
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    };
    dispatch(registerUserAsync(userSignUp));
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
          className={styles.registerRight}
        >
          <div className={styles.registerForm}>
            <div className={styles.registerFormLogo}>
              <img src="/assets/images/Instagram_logo.png" alt="" />
            </div>
            <p className={styles.subTitle}>
              Sign up to see photos and videos from your friends.
            </p>
            <form onSubmit={handleRegister} className={styles.form}>
              <Input
                value={email}
                name="email"
                type="email"
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

              <Input.Password
                value={passwordConfirmation}
                name="password_confirmation"
                type="password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className={styles.formInput}
                placeholder="confirm password"
                required
              />

              <button type="submit" className={styles.registerBtn}>
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

            <Link to="/auth/login" className={styles.signUpLink}>
              Log In
            </Link>
          </div>

          <div className="message-confirm">{getUserRegistered}</div>
        </Col>
      </Row>
    </>
  );
};

export default Register;
