import { Button, Form, Typography } from "antd";
import React, { SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import InputConfirmPassword from "~/components/Input/ConfirmPassword";
import InputPassword from "~/components/Input/Password";
import { loadUser, updateProfile } from "~/features/User/userApi";
import { getUser } from "~/features/User/userSlice";
import styles from "./updatePassStyles.module.scss";

type Props = {};

export interface ChangePassTypes {
  user: {
    password: string;
    password_confirmation: string;
  };
}

const UpdatePassword: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const getUserData = useAppSelector(getUser);

  const [password, setPassword] = useState("");
  const [passValidate, setPassValidate] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
  });
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [isValidatePassword, setIsValidatePassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleChangePassword = async (e: SyntheticEvent) => {
    const data: ChangePassTypes = {
      user: {
        password,
        password_confirmation: passwordConfirmation,
      },
    };

    // Check password confirmation
    if (password !== passwordConfirmation) {
      setIsMatchPassword(true);
      return;
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
      await dispatch(updateProfile(data));
      dispatch(loadUser());
    } else {
      setIsValidatePassword(true);
      return;
    }
  };
  return (
    <div className={`container-fluid ${styles.updatePassword}`}>
      <div className={styles.updatePassContainer}>
        <Typography className={styles.heading}>Change your password</Typography>

        <div className={styles.udpatePassContent}>
          <div className={styles.acccount}>
            <div className={styles.accountImg}>
              <img
                src={
                  getUserData.user.avatar
                    ? getUserData.user.avatar
                    : "/assets/images/user-vacant.jpg"
                }
                alt=""
              />
            </div>
          </div>
          <Form onFinish={handleChangePassword} className={styles.form}>
            <Form.Item className={styles.formItem}>
              <label className={styles.labelInput}>Password</label>
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
            </Form.Item>
            <Form.Item className={styles.formItem}>
              <label className={styles.labelInput}>Confirm password</label>

              <InputConfirmPassword
                value={passwordConfirmation}
                name="password_confirmation"
                className={styles.formInput}
                onChange={setPasswordConfirmation}
              />
              {isMatchPassword ? (
                <div className={styles.errorValidatePassword}>
                  * Password dont match
                </div>
              ) : null}
            </Form.Item>

            <Button className={styles.btnSubmit} htmlType="submit">
              Change
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
