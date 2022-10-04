import { Input } from "antd";
import React from "react";

type Props = {
  value: string;
  name: string;
  className: string;
  onChange: (e: any) => void;
};

const InputConfirmPassword = ({ value, name, className, onChange }: Props) => {
  return (
    <Input.Password
      value={value}
      name={name}
      type="password"
      onChange={(e) => onChange(e.target.value)}
      className={className}
      placeholder="confirm password"
      required
    />
  );
};

export default InputConfirmPassword;
