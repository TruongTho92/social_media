import { Switch, Tooltip } from "antd";
import "./headerStyles.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/Auth/userSlice";
import { settings } from "~/Admin/config/slickConfig";
import { allUserApi } from "~/features/Admin/AllUser/allUserApi";
import { getAllUser } from "~/features/Admin/AllUser/allUserSlice";
import { userApi } from "~/features/Auth/userApi";
import ToggleTheme from "../ToggleTheme";

type Props = {
  setIsOpenSidebar?: (e: boolean) => void;
  isOpenSidebar?: boolean;
};

const Header: React.FC<Props> = ({ isOpenSidebar, setIsOpenSidebar }) => {
  const dispatch = useAppDispatch();

  const getAdminData = useAppSelector(getUser);
  const allUser = useAppSelector(getAllUser);

  useEffect(() => {
    dispatch(allUserApi.getAllUser());
  }, []);

  const handeOpenSidebar = () => {
    if (setIsOpenSidebar) {
      setIsOpenSidebar(!isOpenSidebar);
    }
  };
  const handleLogout = async () => {
    const payload = {
      user: {
        email: getAdminData.user.email,
        authentication_token: getAdminData.user.authentication_token,
      },
    };
    await dispatch(userApi.logoutUser(payload));
  };

  return (
    <header className="header__container">
      <div className="dashboard__header d-flex justify-content-between ">
        <div className="menu__bar" onClick={handeOpenSidebar}>
          <i className="far fa-bars menu__bar-icon"></i>
        </div>
        <div className="dashboard__header__search-left col-8">
          <ul className="user__list ">
            <Slider {...settings}>
              {allUser && allUser.length > 0
                ? allUser.map((user) => (
                    <li className="user__item" key={user.id}>
                      <img
                        src={
                          user.avatar
                            ? user.avatar
                            : "/assets/images/user-vacant.jpg"
                        }
                        alt=""
                      />
                    </li>
                  ))
                : null}
            </Slider>
          </ul>
        </div>
        <div className="dashboard__header__search-right col-4 d-flex justify-content-end align-items-center">
          <Tooltip
            color="#fff"
            trigger="click"
            placement="bottomLeft"
            title={() => (
              <>
                <ul className="user__menu-list">
                  <li className="user__menu-item">
                    <Link to="/admin/profile" className="user__menu-link">
                      <div style={{ lineHeight: 0 }}>
                        <i className="bi bi-person user__menu-icon"></i>
                      </div>

                      <span className="name">Profile</span>
                    </Link>
                  </li>
                  <Tooltip
                    color="#fff"
                    trigger="hover"
                    placement="left"
                    title={
                      <ul className="setting__list">
                        <li className="setting__item">
                          <Link
                            className="setting__item-link"
                            to="update-profile"
                          >
                            Update profile
                          </Link>
                        </li>
                        <li className="setting__item">
                          <Link
                            className="setting__item-link"
                            to="update-password"
                          >
                            Change password
                          </Link>
                        </li>
                      </ul>
                    }
                  >
                    <li className="user__menu-item">
                      <div className="user__menu-link">
                        <div style={{ lineHeight: 0 }}>
                          <i className="bi bi-gear user__menu-icon"></i>
                        </div>
                        <span className="name">Settings</span>
                      </div>
                    </li>
                  </Tooltip>

                  <li className="user__menu-item">
                    <Link to="/" className="user__menu-link">
                      <div style={{ lineHeight: 0 }}>
                        <i className="bi bi-house user__menu-icon"></i>
                      </div>

                      <span className="name">User page</span>
                    </Link>
                  </li>
                </ul>
                <li className="user__menu-item-logout">
                  <div style={{ lineHeight: 0 }}>
                    <i className="bi bi-box-arrow-left user__menu-icon"></i>
                  </div>
                  <span className="name" onClick={handleLogout}>
                    Logout
                  </span>
                </li>
              </>
            )}
          >
            <div className="dashboard__header__search-img">
              <img
                src={
                  getAdminData.user.avatar
                    ? getAdminData.user.avatar
                    : "/assets/images/user-vacant.jpg"
                }
                alt=""
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;
