import { Input, MenuProps } from "antd";
import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate, MdSaveAlt } from "react-icons/md";
import { RiMessageLine } from "react-icons/ri";
import { BiMessage } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";

import styles from "./headerStyles.module.scss";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
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
          className={styles.searchInput}
          placeholder="Search"
          value={searchValue}
          prefix={<IoSearchOutline className={styles.searchIcon} />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </>

      <div className={styles.headerMenu}>
        <div className={styles.icon}>
          <NavLink to="/">
            <AiFillHome className={styles.menuIcon} />
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/chat">
            <BiMessage className={styles.menuIcon} />
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/posts">
            <MdOutlineAddPhotoAlternate className={styles.menuIcon} />
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/saves">
            <MdSaveAlt className={styles.menuIcon} />
          </NavLink>
        </div>
        <div className={styles.menuUser}>
          <img src="/assets/images/user-vacant.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
