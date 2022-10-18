import { Col, Input, Radio, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { DataUpdateUser } from "~/common/types";
import { userApi } from "~/features/Auth/userApi";
import { getLoading, getUser } from "~/features/Auth/userSlice";
import styles from "./updateProfileStyles.module.scss";

const UpdateProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const getUserData = useAppSelector(getUser);
  const loading = useAppSelector(getLoading);

  const [avatar, setAvatar] = useState("");
  const [prevAvatar, setPrevAvatar] = useState(getUserData.user.avatar);

  const [email, setEmail] = useState(getUserData.user.email);
  const [username, setUsername] = useState(getUserData.user.user_name);
  const [validateUserName, setValidateUserName] = useState(false);
  const [nickName, setNickName] = useState(getUserData.user.nick_name);
  const [validateNickName, setValidateNickName] = useState(false);
  const [bio, setBio] = useState(getUserData.user.bio);
  const [gender, setGender] = useState(getUserData.user.gender);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setPrevAvatar(Reader.result as string);
        setAvatar(Reader.result as string);
      }
    };
  };

  const handleUpdateProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const payload: DataUpdateUser = {
      user: {
        avatar: prevAvatar,
        user_name: username,
        nick_name: nickName,
        bio: bio,
        gender: gender,
      },
    };

    if (username.length <= 20 || prevAvatar.length > 0) {
      await dispatch(userApi.updateProfile(payload));
      dispatch(userApi.loadUser());
    }
    return;
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <section className={`container-fluid ${styles.profile}`}>
          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <label htmlFor="input-avatar">
                <div className={styles.image}>
                  <img
                    src={
                      prevAvatar ? prevAvatar : `/assets/images/user-vacant.jpg`
                    }
                    alt=""
                  />
                </div>
              </label>
              <div className={styles.info}>
                <span className={styles.username}>
                  {getUserData.user.user_name
                    ? getUserData.user.user_name
                    : "Update your name"}
                </span>
                <input
                  required
                  type="file"
                  name="avatar"
                  hidden
                  id="input-avatar"
                  onChange={handleImageChange}
                  className={styles.inputAvatar}
                />
                <label
                  htmlFor="input-avatar"
                  className={styles.labelInputAvatar}
                >
                  Change profile photo
                </label>
              </div>
            </div>

            {/* FORM UPDATE PROFILE */}
            <form onSubmit={handleUpdateProfile} className={styles.form}>
              <h1 className={styles.formHeading}>Update Your Profile</h1>
              <div className={styles.formItem}>
                <label className={styles.formLabel}>Email</label>
                <div className={styles.validateInput}>
                  <Input
                    disabled={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputInfo}
                    required
                  />
                </div>
              </div>
              <div className={styles.formItem}>
                <label className={styles.formLabel}>User Name</label>
                <div className={styles.validateInput}>
                  <Input
                    defaultValue={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (username.length >= 20) {
                        setValidateUserName(true);
                      } else {
                        setValidateUserName(false);
                      }
                    }}
                    className={styles.inputInfo}
                    required
                  />
                  {validateUserName ? (
                    <div
                      className={`animation-left-to-right ${styles.errorMessage}`}
                    >
                      * Up to 20 characters
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={styles.formItem}>
                <label className={styles.formLabel}>Nick name</label>
                <div className={styles.validateInput}>
                  <Input
                    defaultValue={nickName}
                    onChange={(e) => {
                      setNickName(e.target.value);
                      if (nickName.length >= 20) {
                        setValidateNickName(true);
                      } else {
                        setValidateNickName(false);
                      }
                    }}
                    className={styles.inputInfo}
                  />
                  {validateNickName ? (
                    <div
                      className={`animation-left-to-right ${styles.errorMessage}`}
                    >
                      * Up to 20 characters
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={styles.formItem}>
                <label className={styles.formLabel}>Bio</label>
                <div className={styles.validateInput}>
                  <Input.TextArea
                    defaultValue={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className={`${styles.inputInfo} ${styles.inputBio}`}
                  />
                </div>
              </div>
              <div className={styles.formItem}>
                <label className={styles.formLabel}>Gender</label>
                <div className={styles.validateInput}>
                  <Radio.Group
                    defaultValue={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <Radio value={"male"}>Male</Radio>
                    <Radio value={"female"}>Female</Radio>
                  </Radio.Group>
                </div>
              </div>
              <Row justify="center">
                <Col>
                  <Link to="/">
                    <button type="button" className={styles.btnCancel}>
                      Cancel
                    </button>
                  </Link>
                </Col>
                <Col>
                  <button type="submit" className={styles.btnSubmit}>
                    Submit
                  </button>
                </Col>
              </Row>
            </form>
          </div>
        </section>
      )}

      {/* MESSAGE */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default UpdateProfile;
