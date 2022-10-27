import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineSetting } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { MdPassword, MdSettingsEthernet } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { userApi } from "~/features/Auth/userApi";
import { getUser } from "~/features/Auth/userSlice";

import styles from "./modalSettingStyles.module.scss";

type Props = {
  classNameIconSetting: string;
};

const ModalSetting = ({ classNameIconSetting }: Props) => {
  const [isAdmin, setIsAdmin] = useState(true);

  const dispatch = useAppDispatch();
  const getUserData = useAppSelector(getUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleClick = (window.onclick = () => {
      setIsModalOpen(false);
    });
    return () => {
      window.removeEventListener("click", handleClick);
    };
  });

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
    <>
      <AiOutlineSetting className={classNameIconSetting} onClick={showModal} />
      <Modal open={isModalOpen} closable={false} footer={false} width={360}>
        <div
          className={styles.modalSetting}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.heading}>
            <MdSettingsEthernet size={40} className={styles.ethernetIcon} />
          </div>
          <Link to="/profile/update-password" className={styles.linkUpdatePass}>
            <MdPassword
              size={20}
              style={{ marginRight: 12 }}
              className={styles.iconLink}
            />
            <span> Change password</span>
          </Link>
          <div className={styles.deleteAccount}>
            <AiOutlineDelete
              size={20}
              style={{ marginRight: 12 }}
              className={styles.iconLink}
            />
            <span> Delete Account</span>
          </div>
          {isAdmin && (
            <Link to="/admin" className={styles.deleteAccount}>
              <div style={{ lineHeight: 0 }}>
                <i
                  className={`fal fa-user-cog ${styles.iconLink}`}
                  style={{ marginRight: 12 }}
                ></i>
              </div>

              <span className={styles.subUserLabel}>Admin manage</span>
            </Link>
          )}
          <div className={styles.deleteAccount} onClick={handleLogout}>
            <BiLogOutCircle
              size={20}
              style={{ marginRight: 12 }}
              className={styles.iconLink}
            />
            <span>Log out</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalSetting;
