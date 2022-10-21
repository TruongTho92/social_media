import { Input, Tooltip } from "antd";
import React, { useState } from "react";
import {
  AiFillHome,
  AiOutlineSave,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { BsBookmarkPlus, BsChatDots, BsPlusSquare } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/Auth/userSlice";

import styles from "./headerStyles.module.scss";
import { userApi } from "~/features/Auth/userApi";
import SearchHeader from "../SearchHeader";

const Header: React.FC = () => {
  const [isOpenInput, setIsOpenInput] = useState(false);
  const getUserData = useAppSelector(getUser);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const payload = {
      user: {
        email: getUserData.user.email,
        // password: getUserData.data.data.user.password,
        authentication_token: getUserData.user.authentication_token,
      },
    };
    dispatch(userApi.logoutUser(payload));
  };

  return (
    <>
      <div className={`${styles.headerContainer}`}>
        <div className="logo">
          <Link to="/">
            <img
              className={styles.logoImg}
              src="/assets/images/Instagram_logo.png"
              alt="logo-IG"
            />
          </Link>
        </div>

        <>
          <SearchHeader />
          <Link to="/chat">
            <BsChatDots className={styles.chatIconMobile} />
          </Link>
        </>

        <div className={styles.headerMenu}>
          <div className={styles.icon}>
            <NavLink to="/">
              <AiFillHome className={styles.menuIcon} />
            </NavLink>
          </div>
          <div className={styles.icon}>
            <NavLink to="/chat">
              <BsChatDots className={styles.menuIcon} />
            </NavLink>
          </div>
          <div className={styles.icon}>
            <NavLink to="/create-post">
              <BsPlusSquare className={styles.menuIcon} />
            </NavLink>
          </div>
          <div className={styles.icon}>
            <NavLink to="/saves">
              <BsBookmarkPlus className={styles.menuIcon} />
            </NavLink>
          </div>

          {/* TOOLTIP USER */}
          <Tooltip
            color="#fff"
            trigger="hover"
            placement="bottom"
            title={() => (
              <div className={styles.subUserMenu}>
                <Link to="/profile" className={styles.subMenuItem}>
                  <AiOutlineUser className={styles.iconSub} />
                  <label className={styles.subUserLabel}>Profile</label>
                </Link>
                <Link to="/settings" className={styles.subMenuItem}>
                  <AiOutlineSetting className={styles.iconSub} />
                  <label className={styles.subUserLabel}>Settings</label>
                </Link>
                <Link to="/profile/saves" className={styles.subMenuItem}>
                  <AiOutlineSave className={styles.iconSub} />
                  <label className={styles.subUserLabel}>Saved</label>
                </Link>
                <span className={styles.line}></span>
                <div className={styles.subMenuItem} onClick={handleLogout}>
                  <BiLogOutCircle className={styles.iconSub} />
                  <label className={styles.subUserLabel}>Log out</label>
                </div>
              </div>
            )}
          >
            <div className={styles.menuUser}>
              <img
                src={
                  getUserData.user.avatar === null
                    ? `/assets/images/user-vacant.jpg`
                    : `${getUserData.user.avatar}`
                }
                alt="avatar_account"
              />
            </div>
          </Tooltip>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={styles.menuMobile}>
        <div className={styles.icon}>
          <NavLink to="/">
            <AiFillHome className={styles.menuIcon} />
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/search">
            <FiSearch className={styles.menuIcon} />
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/create-post">
            <BsPlusSquare className={styles.menuIcon} />
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/saves">
            <BsBookmarkPlus className={styles.menuIcon} />
          </NavLink>
        </div>

        <Link to="/profile" className={styles.menuUser}>
          <img
            src={
              getUserData.user.avatar === null
                ? `/assets/images/user-vacant.jpg`
                : `${getUserData.user.avatar}`
            }
            alt=""
          />
        </Link>
      </div>
    </>
  );
};

export default Header;
