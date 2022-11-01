import { Switch } from "antd";
import React, { useEffect, useState } from "react";

type Props = {};

const ToggleTheme = (props: Props) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme") || "");
  }, []);

  const onChangeSwitch = (checked: boolean) => {
    if (!checked) {
      localStorage.setItem("theme", "light");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "light");
      setIsDark(true);
    } else {
      localStorage.setItem("theme", "dark");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "dark");
      setIsDark(false);
    }
  };
  return <Switch defaultChecked={isDark} onChange={onChangeSwitch} />;
};

export default ToggleTheme;
