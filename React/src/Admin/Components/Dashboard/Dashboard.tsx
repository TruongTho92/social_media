import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { allUserApi } from "~/features/Admin/AllUser/allUserApi";
import { getAllUser } from "~/features/Admin/AllUser/allUserSlice";
import ChartColumn from "../Charts/ChartColumn";
import Footer from "../Footer";
import SearchUser from "../SearchUser";
import StaticNumber from "../StaticNumber/StaticNumber";
import "./dashboardStyles.scss";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const allUser = useAppSelector(getAllUser);

  useEffect(() => {
    dispatch(allUserApi.getAllUser());
  }, []);

  return (
    <div className="dashboard__container container-fluid">
      {/* BODY */}
      <div className="dashboard__body">
        {/* INFO Thong ke */}
        <div className="row ">
          <div className="col-xs-12 col-md-12 col-lg-8">
            <div className="row">
              <div className="col">
                <StaticNumber
                  data={allUser}
                  title="Posts"
                  icon={<i className="far fa-heart-rate like_icon"></i>}
                />
              </div>
              <div className="col">
                <StaticNumber
                  data={[]}
                  title="Users"
                  icon={<i className="far fa-user-chart"></i>}
                />
              </div>
              <div className="col">
                <StaticNumber
                  data={[]}
                  title="Likes"
                  icon={<i className="far fa-chart-bar"></i>}
                />
              </div>
              <div className="col">
                <StaticNumber
                  data={[]}
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
          <div className="col-xs-12 col-md-6 col-lg-8">
            <ChartColumn />
          </div>
          <div className="col-xs-12 col-md-6 col-lg-4">
            <SearchUser />
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
