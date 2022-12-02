import { Col, Form, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { MdDriveFolderUpload, MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { PostPayloadCreate } from "~/common/types";
import {
  NextArrow,
  PrevArrow,
} from "~/components/ArrowSlickCustom/ArrowSlickCustom";
import Header from "~/components/Header";
import { postsApi } from "~/features/accountPost/Posts/postsApi";
import {
  getLoadingCreate,
  getLoadingPosts,
} from "~/features/accountPost/Posts/postsSlice";
import { getUser } from "~/features/Auth/userSlice";

import styles from "./postCreate.module.scss";

const PostCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const getUserData = useAppSelector(getUser);
  const getLoadingPost = useAppSelector(getLoadingCreate);
  const [openLoading, setOpenLoading] = useState(false);
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [isHasImage, setIsHasImage] = useState(false);
  const [mutipleImage, setMutipleImage] = useState<any[]>([]);
  const [imageURLS, setImageURLs] = useState<any[]>([]);

  // CONFIG Slider
  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    className: `${styles.slider} ${styles.imageCreateSlider}`,
    nextArrow: (
      <NextArrow
        styleArrow={styles.arrow}
        styleNext={styles.next}
        styleIcon={styles.arrowNextIcon}
      />
    ),
    prevArrow: (
      <PrevArrow
        styleArrow={styles.arrow}
        stylePrev={styles.prev}
        styleIcon={styles.arrowNextIcon}
      />
    ),
  };

  // SET MUTIPLE_IMAGE URL
  useEffect(() => {
    if (mutipleImage.length < 1) return;
    const newImageUrls: any = [];
    mutipleImage.forEach((image: any) => {
      const Reader = new FileReader();
      Reader.readAsDataURL(image);
      Reader.onload = () => {
        newImageUrls.push(Reader.result);
        setImageURLs(newImageUrls);
      };
    });
  }, [mutipleImage]);

  useEffect(() => {
    setTimeout(() => {
      setOpenLoading(false);
    }, 3000);
  }, [getLoadingPost]);

  const hanleCreatePost = async () => {
    const payload: PostPayloadCreate = {
      post: {
        image: imageURLS,
        caption,
      },
    };
    await dispatch(postsApi.create(payload));
    setOpenLoading(true);
    setIsHasImage(false);
    setImageURLs([]);
    setCaption("");
  };

  const handleChangeMutipleImg = (e: any) => {
    const file = e.target.files;

    setMutipleImage([...file]);
    setIsHasImage(true);
  };

  return (
    <>
      <Header />
      <div className={`${styles.createPost}`}>
        <div className={styles.createPostContainer}>
          {openLoading ? (
            <>
              {getLoadingPost ? (
                <div className={styles.loadingCreate}>
                  <img src="/assets/images/loading.gif" alt="" />
                </div>
              ) : (
                <div className={`${styles.loadingCreate}`}>
                  <img src="/assets/images/success.gif" alt="" />
                </div>
              )}
            </>
          ) : (
            <>
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
                <Form.Item
                  className={`${styles.formItem} ${styles.widthContent}`}
                >
                  <label
                    htmlFor="input-image"
                    className={styles.labelInputImage}
                  >
                    <MdDriveFolderUpload className={styles.uploadIcon} />
                    <span>
                      {isHasImage ? "Change Image" : "Upload Your images"}
                    </span>
                  </label>
                  <Input
                    type="file"
                    id="input-image"
                    className={styles.inputForm}
                    onChange={handleChangeMutipleImg}
                    hidden
                    multiple
                  />

                  {/* MUTIPLE IMAGE */}
                  <Slider {...settings}>
                    {imageURLS.map((image) => (
                      <div className={styles.imagePost} key={image}>
                        <img key={image} src={image} alt="" />
                      </div>
                    ))}
                  </Slider>
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
            </>
          )}
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default PostCreate;
