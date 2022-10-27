import { Tooltip } from "antd";
import "./headerStyles.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

type Props = {
  setIsOpenSidebar?: (e: boolean) => void;
  isOpenSidebar?: boolean;
};

const Header: React.FC<Props> = ({ isOpenSidebar, setIsOpenSidebar }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    className: "slider variable-width",
    nextArrow: <i className="bi bi-arrow-right-short">123</i>,
    prevArrow: <i className="bi bi-arrow-left-short"></i>,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 769,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handeOpenSidebar = () => {
    if (setIsOpenSidebar) {
      setIsOpenSidebar(!isOpenSidebar);
    }
  };

  return (
    <header>
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
              <img src="/assets/images/user-img.jpg" alt="" />
            </div>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;
