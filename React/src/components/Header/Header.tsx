import { Input } from "antd";
import React, { useEffect, useState } from "react";
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
import apiClient from "~/apiClient/apiClient";

import styles from "./headerStyles.module.scss";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpenInput, setIsOpenInput] = useState(false);

  const [openSubUser, setOpenSubUser] = useState(false);

  useEffect(() => {
    window.onclick = () => {
      setOpenSubUser(false);
    };
  }, []);

  const onOpenSubUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubUser(!openSubUser);
  };

  return (
    <>
      <div className={`${styles.headerContainer} container-fluid`}>
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
          <Input
            className={
              isOpenInput
                ? `${styles.searchInput} ${styles.active}`
                : styles.searchInput
            }
            placeholder="Search"
            value={searchValue}
            prefix={<IoSearchOutline className={styles.searchIcon} />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
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
            <NavLink to="/posts">
              <BsPlusSquare className={styles.menuIcon} />
            </NavLink>
          </div>
          <div className={styles.icon}>
            <NavLink to="/saves">
              <BsBookmarkPlus className={styles.menuIcon} />
            </NavLink>
          </div>
          <div className={styles.menuUser} onClick={onOpenSubUser}>
            <img src="/assets/images/user-img.jpg" alt="" />
            {openSubUser ? (
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
                <span className={styles.logout}>Log out</span>
              </div>
            ) : null}
          </div>
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
          <FiSearch
            className={styles.menuIcon}
            onClick={() => setIsOpenInput(!isOpenInput)}
          />
        </div>
        <div className={styles.icon}>
          <NavLink to="/posts">
            <BsPlusSquare className={styles.menuIcon} />
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/saves">
            <BsBookmarkPlus className={styles.menuIcon} />
          </NavLink>
        </div>
        <Link to="/profile" className={styles.menuUser}>
          <img src="/assets/images/user-img.jpg" alt="" />
        </Link>
      </div>
    </>
  );
};

export default Header;
