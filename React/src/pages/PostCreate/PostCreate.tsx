import { Button, Col, Form, Image, Input, Row, Typography } from "antd";
import Cookies from "js-cookie";
import React, { SyntheticEvent, useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { Link } from "react-router-dom";
import apiClient from "~/apiClient/apiClient";

import { useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/User/UserSlice";

import styles from "./postCreate.module.scss";

const PostCreate: React.FC = () => {
  const getUserData = useAppSelector(getUser);

  const [image, setImage] = useState("");
  const [isHasImage, setIsHasImage] = useState(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setIsHasImage(true);
        setImage(Reader.result as string);
      }
    };
  };

  const hanleCreatePost = async () => {
    const payload = {
      post: {
        image: image,
        caption: "",
      },
    };
  };

  return (
    <div className={`container-fluid ${styles.createPost}`}>
      <div className={styles.createPostContainer}>
        <Typography className={styles.heading}>Create new post</Typography>
        <div className={styles.account}>
          <div className={styles.imageAccount}>
            <img
              src={
                getUserData.user.avatar
                  ? getUserData.user.avatar
                  : "/assets/images/user-img.jpg"
              }
              alt="avatar_account"
            />
          </div>
          <Typography className={styles.nameAccount}>Minh Tai</Typography>
        </div>

        {/* FORM */}
        <Form className={styles.form} onFinish={hanleCreatePost}>
          <Form.Item className={styles.fromInput}>
            <label htmlFor="input-image" className={styles.labelInputImage}>
              <MdDriveFolderUpload className={styles.uploadIcon} />
              <span>{isHasImage ? "Change Image" : "Upload Your image"}</span>
            </label>
            <Input
              type="file"
              id="input-image"
              className={styles.inputForm}
              onChange={handleImageChange}
              hidden
            />

            {isHasImage ? (
              <Image src={image} className={styles.imagePost} />
            ) : null}
          </Form.Item>
          <Form.Item className={styles.fromInput}>
            <Input.TextArea
              className={styles.inputForm}
              placeholder="Write a caption..."
            />
          </Form.Item>

          <Row gutter={[12, 12]} justify="center">
            <Col>
              <Button htmlType="button" className={styles.btnCancel}>
                <Link to="/"> Cancel</Link>
              </Button>
            </Col>

            <Col>
              <Button htmlType="submit" className={styles.btnSubmit}>
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default PostCreate;
