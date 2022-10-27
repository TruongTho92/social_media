import { Tooltip } from "antd";
import "./headerStyles.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/Auth/userSlice";
import { settings } from "~/Admin/config/slickConfig";

type Props = {
  setIsOpenSidebar?: (e: boolean) => void;
  isOpenSidebar?: boolean;
};

const Header: React.FC<Props> = ({ isOpenSidebar, setIsOpenSidebar }) => {
  const getAdminData = useAppSelector(getUser);

  const handeOpenSidebar = () => {
    if (setIsOpenSidebar) {
      setIsOpenSidebar(!isOpenSidebar);
    }
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
              <li className="user__item">
                <img src="/assets/images/user-img.jpg" alt="" />
              </li>
              <li className="user__item">
                <img src="/assets/images/user-img.jpg" alt="" />
              </li>
              <li className="user__item">
                <img src="/assets/images/user-img.jpg" alt="" />
              </li>
              <li className="user__item">
                <img src="/assets/images/user-img.jpg" alt="" />
              </li>
              <li className="user__item">
                <img src="/assets/images/user-img.jpg" alt="" />
              </li>
              <li className="user__item">
                <img src="/assets/images/user-img.jpg" alt="" />
              </li>
              <li className="user__item">
                <img src="/assets/images/user-img.jpg" alt="" />
              </li>
              <li className="user__item">
                <img src="/assets/images/user-img.jpg" alt="" />
              </li>
              <li className="user__item">
                <img src="/assets/images/user-img.jpg" alt="" />
              </li>
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
                  <li className="user__menu-item">
                    <Link to="/settings" className="user__menu-link">
                      <div style={{ lineHeight: 0 }}>
                        <i className="bi bi-gear user__menu-icon"></i>
                      </div>

                      <span className="name">Settings</span>
                    </Link>
                  </li>
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
                  <span className="name">Logout</span>
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
