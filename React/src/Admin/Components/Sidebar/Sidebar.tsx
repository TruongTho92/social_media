import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { userApi } from "~/features/Auth/userApi";
import { getUser } from "~/features/Auth/userSlice";
import ToggleTheme from "../ToggleTheme";
import "./sidebarStyles.scss";

type Props = {
  isOpenSidebar?: boolean;
  setIsOpenSidebar?: (e: boolean) => void;
};

const Sidebar = ({ setIsOpenSidebar, isOpenSidebar }: Props) => {
  const [openManageMenu, setOpenManageMenu] = useState(false);

  const dispatch = useAppDispatch();
  const getAdminData = useAppSelector(getUser);

  const handleCloseSidebar = () => {
    if (setIsOpenSidebar) {
      setIsOpenSidebar(false);
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
    <>
      {isOpenSidebar && (
        <div className="sidebar__mark" onClick={handleCloseSidebar}></div>
      )}
      <aside className={isOpenSidebar ? "sidebar open" : "sidebar"}>
        <div
          className={isOpenSidebar ? "sidebar__close open" : "sidebar__close"}
          onClick={handleCloseSidebar}
        >
          <i className="fas fa-hand-point-left close__icon"></i>
        </div>
        {/* LOGO */}
        <div className="logo">
          <div className="logo__img">
            <Link to="/admin/profile">
              <img
                src={
                  getAdminData.user.avatar
                    ? getAdminData.user.avatar
                    : "/assets/images/user-vacant.jpg"
                }
                alt=""
              />
            </Link>
          </div>
          <div className="logo__username">
            <span className="name">{getAdminData.user.user_name}</span>
            <span className="role">
              {getAdminData.user.is_admin ? "Admin" : "Supervisor"}
            </span>
          </div>
        </div>

        {/* MENU */}
        <div className="menu">
          <ul className="menu_list">
            <li className="menu__item">
              <NavLink
                to="/admin"
                className="menu__item-link"
                end
                onClick={handleCloseSidebar}
              >
                <div className="link__content">
                  <div style={{ lineHeight: 0 }}>
                    <i className="fas fa-th-large menu__icon"></i>
                  </div>
                  <span> Dashboard</span>
                </div>
              </NavLink>
            </li>
            <li className="menu__item manage_menu">
              <div
                className="menu__item-link"
                onClick={() => setOpenManageMenu(!openManageMenu)}
              >
                <div className="link__content">
                  <div style={{ lineHeight: 0 }}>
                    <i className="far fa-radiation menu__icon"></i>
                  </div>
                  <span>Manage App</span>
                </div>
                <i
                  className={
                    openManageMenu
                      ? "fal fa-angle-right right__icon active"
                      : "fal fa-angle-right right__icon"
                  }
                ></i>
              </div>

              <ul
                className={
                  openManageMenu ? "manage__list open" : "manage__list"
                }
              >
                <li className="manage__item">
                  <NavLink
                    to="/admin/manage-posts"
                    className="manage__item-link"
                    onClick={handleCloseSidebar}
                  >
                    <div className="link__content">
                      <i className="far fa-clone manage__icon"></i>
                      <span>Posts</span>
                    </div>
                  </NavLink>
                </li>
                <li className="manage__item">
                  <NavLink
                    to="/admin/manage-users"
                    className="manage__item-link"
                    onClick={handleCloseSidebar}
                  >
                    <div style={{ lineHeight: 0 }}>
                      <i className="far fa-users manage__icon"></i>
                    </div>
                    <span>Users</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            {getAdminData.user.is_admin && (
              <li className="menu__item">
                <NavLink to="more-account" className="menu__item-link" end>
                  <div className="link__content">
                    <div style={{ lineHeight: 0 }}>
                      <i className="far fa-tire-rugged menu__icon"></i>
                    </div>
                    <span> More account</span>
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
          <div className="menu__item logout">
            <div className="menu__item-link">
              <div className="link__content">
                <div style={{ lineHeight: 0 }}>
                  <i
                    className={`fal fa-sign-out-alt menu__icon menu__icon-logout`}
                  ></i>
                </div>

                <span className="text__logout" onClick={handleLogout}>
                  Logout
                </span>
              </div>
            </div>
            <div className="theme__btn">
              <ToggleTheme />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
