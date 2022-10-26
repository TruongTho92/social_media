import { Input, Tooltip } from "antd";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ChartColumn from "../Charts/ChartColumn";
import Header from "../Header";
import SearchUser from "../SearchUser";
import Sidebar from "../Sidebar";
import StaticNumber from "../StaticNumber/StaticNumber";
import "./dashboardStyles.scss";
type Props = {};

const Dashboard = (props: Props) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="dashboard__container container-fluid">
      {/* Sider */}
      <Sidebar setIsOpenSidebar={setOpenSidebar} isOpenSidebar={openSidebar} />

      {/* HEADER */}
      <Header setIsOpenSidebar={setOpenSidebar} isOpenSidebar={openSidebar} />

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
          <div className="col-8">
            <ChartColumn />
          </div>
          <div className="col-4">
            <SearchUser />
          </div>
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
