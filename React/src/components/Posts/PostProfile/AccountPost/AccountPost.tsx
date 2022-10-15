import { Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostDetail from "../../PostDetail";

import styles from "./accountPostStyles.module.scss";

type Props = {
  id: number | null;
  image: string;
};

const AccountPost: React.FC<Props> = ({ id, image }) => {
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
      >
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <PostDetail isAccount={true} id={id} />
        </div>
      </Modal>
    </>
  );
};

export default AccountPost;
