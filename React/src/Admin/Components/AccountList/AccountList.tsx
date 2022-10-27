import { Typography } from "antd";
import React from "react";
import "./accountListStyles.scss";
type Props = {};

const AccountList = (props: Props) => {
  return (
    <div className="search__user-list w-100 ">
      <div className="search__user-item d-flex justify-content-between align-items-center">
        <div className="user__item-left d-flex justify-content-start align-items-center">
          <div className="user__item-img">
            <img src="/assets/images/user-img.jpg" alt="" />
          </div>
          <div className="user__item-info">
            <Typography className="user__item-name">Minh tai</Typography>
            <Typography className="user__item-role">User</Typography>
          </div>
        </div>
        <div className="user__item-right">
          <i className="far fa-expand-arrows-alt"></i>
        </div>
      </div>
      <div className="search__user-item d-flex justify-content-between align-items-center">
        <div className="user__item-left d-flex justify-content-start align-items-center">
          <div className="user__item-img">
            <img src="/assets/images/user-img.jpg" alt="" />
          </div>
          <div className="user__item-info">
            <Typography className="user__item-name">Minh tai</Typography>
            <Typography className="user__item-role">User</Typography>
          </div>
        </div>
        <div className="user__item-right">
          <i className="far fa-expand-arrows-alt"></i>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
