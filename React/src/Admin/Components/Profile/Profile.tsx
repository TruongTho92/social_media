import { Image, Typography } from "antd";
import { useState } from "react";
import Header from "~/Admin/Components/Header";
import { useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/Auth/userSlice";
import AccountList from "~/Admin/Components/AccountList";
import Sidebar from "../Sidebar";
import "./profileStyles.scss";
type Props = {};

const Profile = (props: Props) => {
  const getAdminData = useAppSelector(getUser);

  return (
    <>
      <div className="profile__admin">
        <div className="row mt-5">
          <div className="col-lg-7 ">
            <div className="profile__admin-info d-flex justify-content-start align-items-center">
              <div className="profile__admin-img ">
                <img
                  src={
                    getAdminData.user.avatar
                      ? getAdminData.user.avatar
                      : "/assets/images/user-vacant.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="profile__admin-content">
                <Typography className="profile__admin-content-username">
                  {getAdminData.user.user_name}
                </Typography>
                <Typography className="profile__admin-content-email">
                  {getAdminData.user.email}
                </Typography>
              </div>
              <i className="fal fa-sun sun__icon"></i>
            </div>
          </div>
          <div className="col-lg-5 account__list">
            <AccountList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
