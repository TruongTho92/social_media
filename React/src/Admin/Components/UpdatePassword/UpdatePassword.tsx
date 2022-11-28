import { Button, Form, Typography } from "antd";
import React, { SyntheticEvent, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import InputConfirmPassword from "~/components/Input/ConfirmPassword";
import InputPassword from "~/components/Input/Password";
import { userApi } from "~/features/Auth/userApi";
import { getUser } from "~/features/Auth/userSlice";
import "./updatePassStyles.scss";

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
      await dispatch(userApi.updateProfile(data));
      dispatch(userApi.loadUser());
    } else {
      setIsValidatePassword(true);
      return;
    }
  };
  return (
    <div className="updatePassword">
      <div className="updatePassContainer">
        <Typography className="heading">Change your password</Typography>

        <div className="udpatePassContent">
          <div className="acccount">
            <div className="accountImg">
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
          <Form onFinish={handleChangePassword} className={"form"}>
            <Form.Item className={"formItem"}>
              <label className={"labelInput"}>Password</label>
              <InputPassword
                value={password}
                name={"password"}
                setPassword={setPassword}
                className={"formInput"}
                validate={passValidate}
                setValidate={setPassValidate}
              />
              {isValidatePassword ? (
                <div className={"errorValidatePassword"}>
                  * Password incorrect format
                </div>
              ) : null}
            </Form.Item>
            <Form.Item className={"formItem"}>
              <label className={"labelInput"}>Confirm password</label>

              <InputConfirmPassword
                value={passwordConfirmation}
                name="password_confirmation"
                className={"formInput"}
                onChange={setPasswordConfirmation}
              />
              {isMatchPassword ? (
                <div className={"errorValidatePassword"}>
                  * Password dont match
                </div>
              ) : null}
            </Form.Item>

            <Button className={"btnSubmit"} htmlType="submit">
              Change
            </Button>
          </Form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
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

export default UpdatePassword;
