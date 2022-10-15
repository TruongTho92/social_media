import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineSetting } from "react-icons/ai";
import { MdPassword, MdSettingsEthernet } from "react-icons/md";
import { Link } from "react-router-dom";

import styles from "./modalSettingStyles.module.scss";

type Props = {
  classNameIconSetting: string;
};

const ModalSetting = ({ classNameIconSetting }: Props) => {
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
        </div>
      </Modal>
    </>
  );
};

export default ModalSetting;
