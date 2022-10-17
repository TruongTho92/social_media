import { Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { MdDriveFolderUpload, MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { PostPayloadCreate } from "~/common/types";
import { postsApi } from "~/features/AccountPost/Posts/postsApi";
import { getLoadingPosts } from "~/features/AccountPost/Posts/postsSlice";
import { getUser } from "~/features/User/userSlice";

import styles from "./postCreate.module.scss";

const PostCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const getUserData = useAppSelector(getUser);
  const getLoadingPost = useAppSelector(getLoadingPosts);

  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

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
    const payload: PostPayloadCreate = {
      post: {
        image,
        caption,
      },
    };
    await dispatch(postsApi.create(payload));
    setIsHasImage(false);
    setCaption("");
    setImage("");
  };

  return (
    <>
      {getLoadingPost ? (
        "Loading..."
      ) : (
        <div className={`container-fluid ${styles.createPost}`}>
          <div className={styles.createPostContainer}>
            <div className={styles.createPostHeader}>
              <Link to="/" style={{ lineHeight: 0 }}>
                <HiOutlineArrowLeft className={styles.iconBack} />
              </Link>
              <Typography className={styles.heading}>
                Create new post
              </Typography>
              <div onClick={hanleCreatePost}>
                <Typography className={styles.share}>Share</Typography>
              </div>
            </div>

            {/* FORM */}
            <Form className={styles.form} onFinish={hanleCreatePost}>
              <Form.Item className={styles.formItem}>
                <label htmlFor="input-image" className={styles.labelInputImage}>
                  <MdDriveFolderUpload className={styles.uploadIcon} />
                  <span>
                    {isHasImage ? "Change Image" : "Upload Your image"}
                  </span>
                </label>
                <Input
                  type="file"
                  id="input-image"
                  className={styles.inputForm}
                  onChange={handleImageChange}
                  hidden
                />

                {isHasImage ? (
                  <div className={styles.imagePost}>
                    <img src={image} alt="img-post" />
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item className={`${styles.formItem} ${styles.widthFull}`}>
                {/* AVATAR */}
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
                  <Typography className={styles.nameAccount}>
                    Minh Tai
                  </Typography>
                </div>

                {/* INPUT */}
                <Input.TextArea
                  value={caption}
                  className={styles.inputForm}
                  placeholder="Write a caption..."
                  onChange={(e) => setCaption(e.target.value)}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
      <ToastContainer
        icon={<MdOutlineDone size={30} />}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default PostCreate;
