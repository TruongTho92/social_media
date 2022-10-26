import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch } from "~/app/hooks";
import { UserDataTypes } from "~/common/types";
import { userApi } from "~/features/Auth/userApi";

import styles from "./registerStyles.module.scss";
import InputPassword from "../../../components/Input/Password/InputPassword";
import InputConfirmPassword from "~/components/Input/ConfirmPassword/InputConfirmPassword";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passValidate, setPassValidate] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
  });
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [isValidatePassword, setIsValidatePassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleRegister = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data: UserDataTypes = {
      user: {
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    };

    // Check password confirmation
    if (password !== passwordConfirmation) {
      setIsMatchPassword(true);
    } else {
      setIsMatchPassword(false);
    }

    // Handle registerUserAsync
    if (
      passValidate.capsLetterCheck &&
      passValidate.numberCheck &&
      passValidate.pwdLengthCheck
    ) {
      setIsValidatePassword(false);
      dispatch(userApi.registerUser(data));
    } else {
      setIsValidatePassword(true);
    }
  };

  return (
    <div className={` ${styles.register}`}>
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
        <Col className={styles.registerRight}>
          <div className={styles.registerForm}>
            <div className={styles.registerFormLogo}>
              <img src="/assets/images/Instagram_logo.png" alt="" />
            </div>
            <p className={styles.heading}>Manage App</p>
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

              <InputPassword
                value={password}
                name={"password"}
                setPassword={setPassword}
                className={styles.formInput}
                validate={passValidate}
                setValidate={setPassValidate}
              />
              {isValidatePassword ? (
                <div className={styles.errorValidatePassword}>
                  * Password incorrect format
                </div>
              ) : null}

              <InputConfirmPassword
                value={passwordConfirmation}
                name="password_confirmation"
                className={styles.formInput}
                onChange={setPasswordConfirmation}
              />

              {isMatchPassword ? (
                <div className={styles.errorMatchPassword}>
                  * Password dont match
                </div>
              ) : null}

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

            <Link to="/" className={styles.signUpLink}>
              Log In
            </Link>
          </div>

          {/* ERROR AND REGISTED MESSAGE */}

          <ToastContainer
            icon={<AiOutlineLoading className={styles.iconLoading} />}
            position="top-right"
            autoClose={false}
            theme="dark"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Col>
      </Row>
    </div>
  );
};

export default Register;
