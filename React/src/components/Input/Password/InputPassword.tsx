import { Input } from "antd";
import React, { useState } from "react";
import { PassRequired } from "./PassRequired";

export interface ValidateTypes {
  capsLetterCheck: boolean;
  numberCheck: boolean;
  pwdLengthCheck: boolean;
  specialCharCheck: boolean;
}

export interface PropsTypes {
  value: string;
  name: string;
  className: string;
  validate: ValidateTypes;
  setPassword: (e: any) => void;
  setValidate: (checked: ValidateTypes) => void;
}

const InputPassword = ({
  value,
  name,
  className,
  validate,
  setPassword,
  setValidate,
}: PropsTypes) => {
  const [passwordRequired, setPasswordRequired] = useState(false);

  const onKeyUpChange = (e: any) => {
    const value = e.target.value;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);

    setValidate({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
  };

  return (
    <>
      <Input.Password
        value={value}
        name={name}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={onKeyUpChange}
        onFocus={() => setPasswordRequired(true)}
        onBlur={() => setPasswordRequired(false)}
        className={className}
        placeholder="password"
        required
      />
      {passwordRequired ? (
        <PassRequired
          capsLetterFlag={validate.capsLetterCheck ? true : false}
          numberFlag={validate.numberCheck ? true : false}
          pwdLengthFlag={validate.pwdLengthCheck ? true : false}
          specialCharFlag={validate.specialCharCheck ? true : false}
        />
      ) : null}
    </>
  );
};

export default InputPassword;
