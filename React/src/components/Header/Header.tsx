import { Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/Auth/userSlice";

import { userApi } from "~/features/Auth/userApi";
import SearchHeader from "../SearchHeader";
import styles from "./headerStyles.module.scss";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const getUserData = useAppSelector(getUser);

  const handleLogout = async () => {
    const payload = {
      user: {
        email: getUserData.user.email,
        authentication_token: getUserData.user.authentication_token,
      },
    };
    dispatch(userApi.logoutUser(payload));
  };

  return (
    <header>
      <div className={`${styles.headerContainer}`}>
        <div className={styles.logo}>
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
              <i className={`fas fa-th-large ${styles.menuIcon}`}></i>
            </NavLink>
          </div>
          <div className={styles.icon}>
            <NavLink to="/chat">
              <i className={`far fa-comment ${styles.menuIcon}`}></i>
            </NavLink>
          </div>
          <div className={styles.icon}>
            <NavLink to="/create-post">
              <i
                className={`fal fa-plus ${styles.menuIcon} ${styles.addIcon}`}
              ></i>
            </NavLink>
          </div>
          <div className={styles.icon}>
            <NavLink to="/profile/saves">
              <i className={`fal fa-bookmark ${styles.menuIcon}`}></i>
            </NavLink>
          </div>

          {/* TOOLTIP USER */}
          <Tooltip
            color="#fff"
            trigger="click"
            placement="bottom"
            title={() => (
              <div className={styles.subUserMenu}>
                <Link to="/profile" className={styles.subMenuItem}>
                  <div style={{ lineHeight: 0 }}>
                    <i className={`fal fa-user ${styles.iconSub}`}></i>
                  </div>
                  <label className={styles.subUserLabel}>Profile</label>
                </Link>
                <Tooltip
                  trigger={"hover"}
                  color="#fff"
                  placement="left"
                  title={
                    <div className={styles.settingsMore}>
                      <Link
                        to="/profile/update-password"
                        className={styles.text}
                      >
                        Change password
                      </Link>
                      <Link to="/profile/update" className={styles.text}>
                        Update profile
                      </Link>
                    </div>
                  }
                >
                  <div className={`${styles.subMenuItem} ${styles.settings}`}>
                    <div style={{ lineHeight: 0 }}>
                      <i className={`fal fa-cog ${styles.iconSub}`}></i>
                    </div>
                    <label className={styles.subUserLabel}>Settings</label>
                  </div>
                </Tooltip>
                <Link to="/profile/saves" className={styles.subMenuItem}>
                  <div style={{ lineHeight: 0 }}>
                    <i className={`fal fa-bookmark ${styles.iconSub}`}></i>
                  </div>
                  <label className={styles.subUserLabel}>Saved</label>
                </Link>

                {getUserData.user.is_admin || getUserData.user.is_supervisor ? (
                  <Link to="/admin" className={styles.subMenuItem}>
                    <div style={{ lineHeight: 0 }}>
                      <i className={`fal fa-user-cog ${styles.iconSub}`}></i>
                    </div>

                    <label className={styles.subUserLabel}>Admin manage</label>
                  </Link>
                ) : null}

                <span className={styles.line}></span>
                <div className={styles.subMenuItem} onClick={handleLogout}>
                  <div style={{ lineHeight: 0 }}>
                    <i className={`fal fa-sign-out-alt ${styles.iconSub}`}></i>
                  </div>
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
            <i className={`fas fa-th-large ${styles.menuIcon}`}></i>
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/search">
            <i className={`far fa-search ${styles.menuIcon}`}></i>
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/create-post">
            <i
              className={`fal fa-plus ${styles.menuIcon} ${styles.addIcon}`}
            ></i>
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/profile/saves">
            <i className={`fal fa-bookmark ${styles.menuIcon}`}></i>
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
    </header>
  );
};

export default Header;
