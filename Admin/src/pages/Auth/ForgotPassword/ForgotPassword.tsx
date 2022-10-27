import { Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./forgotStyles.module.scss";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
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
          className={styles.forgotRight}
        >
          <div className={styles.forgotForm}>
            <div className={styles.forgotFormLogo}>
              <img src="/assets/images/Instagram_logo.png" alt="" />
            </div>
            <Form className={styles.form}>
              <Input
                value={email}
                name="username"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
                placeholder="email..."
                required
              />

              <button type="submit" className={styles.forgotBtn}>
                Confirm Email
              </button>
            </Form>
          </div>
          <div className={styles.signUp}>
            <span className={styles.signUpText}>Back to login?</span>

            <Link to="/auth/login" className={styles.signUpLink}>
              Back
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
