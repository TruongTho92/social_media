import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "~/app/hooks";
import { UserDataTypes } from "~/common/types";
import InputConfirmPassword from "~/components/Input/ConfirmPassword/InputConfirmPassword";
import InputPassword from "~/components/Input/Password";
import {
  getRegisterMessage,
  registerUserAsync,
} from "~/features/Auth/AuthSlice";
import styles from "./registerStyles.module.scss";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passValidate, setPassValidate] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [isValidatePassword, setIsValidatePassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // Message register successfull
  const getMessageRegister = useSelector(getRegisterMessage);

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
      passValidate.pwdLengthCheck &&
      passValidate.specialCharCheck
    ) {
      setIsValidatePassword(false);
      dispatch(registerUserAsync(data));
    } else {
      setIsValidatePassword(true);
    }
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

            <Link to="/auth/login" className={styles.signUpLink}>
              Log In
            </Link>
          </div>

          {/* ERROR AND REGISTED MESSAGE */}
          {getMessageRegister ? (
            <div className={styles.messageWaitConfirm}>
              {getMessageRegister}
            </div>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default Register;
