import { Typography } from "antd";
import { useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/Auth/userSlice";
import Footer from "../Footer";
import "./profileStyles.scss";
type Props = {};

const Profile = (props: Props) => {
  const getAdminData = useAppSelector(getUser);

  return (
    <>
      <div className="profile__admin">
        <div className="row mt-4 w-100">
          <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
            <div className="row">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="profile__admin-left-1"></div>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="profile__admin-left-2"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="profile__admin-left-bottom">
                  <span className="text">
                    Hi! Welcome to comeback <br /> {getAdminData.user.user_name}
                  </span>
                  <i className="fal fa-sun sun__icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5">
            <div className="profile__admin-info d-flex justify-content-center align-items-center flex-column">
              <div className="w-100 d-flex justify-content-center align-items-center">
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
              </div>
              <div className="profile__admin-content">
                <Typography className="profile__admin-content-username">
                  {getAdminData.user.user_name}
                </Typography>
                <Typography className="profile__admin-content-email">
                  {getAdminData.user.email}
                </Typography>
              </div>
              <i className="fas fa-sun sun__icon "></i>
            </div>
          </div>
          <div className="col-0 col-sm-0 col-md-6 col-lg-6 col-xl-3">
            <div className="profile__admin-right"></div>
          </div>
        </div>
        <div className="w-100">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Profile;
