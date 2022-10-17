import { Col, Modal, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import PostDetail from "../PostDetail";

import styles from "./accountPostStyles.module.scss";

type Props = {
  id: number | null;
  image: string;
  isAccount: boolean;
};

const AccountPost: React.FC<Props> = ({ id, image, isAccount }) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const handleOpenDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpenDetail(true);
  };

  useEffect(() => {
    const handleClick = (window.onclick = () => {
      setIsOpenDetail(false);
    });
    return () => {
      window.removeEventListener("click", handleClick);
    };
  });

  return (
    <>
      <div className={styles.postImg} onClick={handleOpenDetail}>
        <img src={`${image}`} alt="" />
      </div>

      <Modal
        style={{ width: "fit-content" }}
        open={isOpenDetail}
        closable={false}
        footer={false}
        centered={true}
      >
        <div
          className={styles.closeModal}
          onClick={() => setIsOpenDetail(false)}
        >
          <Typography className={styles.closeText}>Close</Typography>
        </div>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <PostDetail isAccount={isAccount} id={id} />
        </div>
      </Modal>
    </>
  );
};

export default AccountPost;
