import { Col, Input, Radio, Row } from "antd";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Account from "~/components/Account";
import UpdateProfile from "~/components/UpdateProfile";
import styles from "./profileStyles.module.scss";

type Props = {};

const Profile = (props: Props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <div className="">
      {isUpdate ? <UpdateProfile /> : <Account />}
      {/* <Outlet /> */}
    </div>
  );
};

export default Profile;
