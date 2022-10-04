import { Input } from "antd";
import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsBookmarkPlus, BsChatDots, BsPlusSquare } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { TbSearchOff } from "react-icons/tb";

import { IoSearchOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

import styles from "./headerStyles.module.scss";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpenInput, setIsOpenInput] = useState(false);
  console.log(isOpenInput);
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
          <div className={styles.menuUser}>
            <img src="/assets/images/user-img.jpg" alt="" />
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
        <div className={styles.menuUser}>
          <img src="/assets/images/user-img.jpg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Header;
