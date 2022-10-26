import { Typography } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebarStyles.scss";

type Props = {
  isOpenSidebar?: boolean;
  setIsOpenSidebar?: (e: boolean) => void;
};

const Sidebar = ({ setIsOpenSidebar, isOpenSidebar }: Props) => {
  const [openManageMenu, setOpenManageMenu] = useState(false);
  console.log(isOpenSidebar);
  const handleCloseSidebar = () => {
    if (setIsOpenSidebar) {
      setIsOpenSidebar(false);
    }
  };
  return (
    <>
      {isOpenSidebar && <div className="sidebar__mark"></div>}
      <aside className={isOpenSidebar ? "sidebar open" : "sidebar"}>
        <div className="sidebar__close" onClick={handleCloseSidebar}>
          X
        </div>
        <div className="logo">
          <div className="logo__img">
            <img src="/assets/images/user-img.jpg" alt="" />
          </div>
          <div className="logo__username">
            <span className="name">Minh Tai</span>
            <span className="role">Admin</span>
          </div>
        </div>
        <div className="menu">
          <ul className="menu_list">
            <li className="menu__item">
              <NavLink to="/dashboard" className="menu__item-link">
                <div className="link__content">
                  <i className="fas fa-th-large menu__icon"></i>
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
                  <i className="far fa-radiation menu__icon"></i>
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
                  <NavLink to="/manage-posts" className="manage__item-link">
                    <div className="link__content">
                      <i className="far fa-clone manage__icon"></i>
                      <span>Posts</span>
                    </div>
                  </NavLink>
                </li>
                <li className="manage__item">
                  <NavLink to="/manage-users" className="manage__item-link">
                    <i className="far fa-users manage__icon"></i>
                    <span>User</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="menu__item">
              <NavLink to="/more-account" className="menu__item-link">
                <div className="link__content">
                  <i className="far fa-tire-rugged menu__icon"></i>
                  <span> More account</span>
                </div>
              </NavLink>
            </li>
          </ul>
          <div className="menu__item">
            <NavLink to="/settings" className="menu__item-link">
              <div className="link__content">
                <i className="far fa-cog menu__icon"></i>
                <span>Settings</span>
              </div>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
