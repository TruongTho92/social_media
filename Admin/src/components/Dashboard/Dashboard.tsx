import { Input, Tooltip } from "antd";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Sidebar from "../Sidebar";
import StaticNumber from "../StaticNumber/StaticNumber";
import "./dashboardStyles.scss";
type Props = {};

const Dashboard = (props: Props) => {
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
  };

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="dashboard__container container-fluid">
      {/* Sider */}
      <Sidebar setIsOpenSidebar={setOpenSidebar} isOpenSidebar={openSidebar} />

      {/* HEADER */}
      <div className="dashboard__header d-flex justify-content-between ">
        <div className="menu__bar" onClick={() => setOpenSidebar(!openSidebar)}>
          <i className="far fa-bars menu__bar-icon"></i>
        </div>
        <div className="dashboard__header__search-left search col-8">
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
                    <Link to="/profile">
                      <i className="bi bi-person user__menu-icon"></i>
                      <span className="name">Profile</span>
                    </Link>
                  </li>
                  <li className="user__menu-item">
                    <Link to="/settings">
                      <i className="bi bi-gear user__menu-icon"></i>
                      <span className="name">Settings</span>
                    </Link>
                  </li>
                </ul>
                <li className="user__menu-item-logout">
                  <i className="bi bi-box-arrow-left user__menu-icon"></i>
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

      {/* BODY */}
      <div className="dashboard__body">
        {/* INFO Thong ke */}
        <div className="row ">
          <div className="col-xs-12 col-md-12 col-lg-8">
            <div className="row">
              <div className="col">
                <StaticNumber
                  title="Posts"
                  icon={<i className="far fa-heart-rate like_icon"></i>}
                />
              </div>
              <div className="col">
                <StaticNumber
                  title="Users"
                  icon={<i className="far fa-user-chart"></i>}
                />
              </div>
              <div className="col">
                <StaticNumber
                  title="Likes"
                  icon={<i className="far fa-chart-bar"></i>}
                />
              </div>
              <div className="col">
                <StaticNumber
                  title="Comments"
                  icon={<i className="far fa-chart-pie-alt"></i>}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 static__img-container">
            <div className="static__img">
              <h1 className="static__img-content">
                Welcome to admin dashboard!! <br />{" "}
                <span>Start manage your app now</span>
              </h1>
              <i className="fal fa-sun"></i>
            </div>
          </div>
        </div>

        {/* CHART AND USERS */}
        <div className="row">
          <div className="col-8">123</div>
          <div className="col-4">456</div>
        </div>

        {/* ACCOUNT ADMIN */}
        <div className="row">
          <div className="col-8">123</div>
          <div className="col-4">456</div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="footer">Footer</div>
    </div>
  );
};

export default Dashboard;
