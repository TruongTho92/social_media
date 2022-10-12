import { Col, Input, Radio, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { DataUpdateUser } from "~/common/types";
import { loadUser, updateProfile } from "~/features/User/UserApi";
import { getLoading, getUser } from "~/features/User/UserSlice";
import styles from "./updateProfileStyles.module.scss";

const UpdateProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const getUserData = useAppSelector(getUser);
  const loading = useAppSelector(getLoading);

  const [avatar, setavatar] = useState("");
  const [prevAvatar, setPrevAvatar] = useState(getUserData.user.avatar);
  const [email, setEmail] = useState(getUserData.user.email);
  const [bio, setBio] = useState(getUserData.user.bio);
  const [gender, setGender] = useState(getUserData.user.gender);
  const [username, setUsername] = useState(getUserData.user.user_name);
  const [nickName, setNickName] = useState(getUserData.user.nick_name);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setPrevAvatar(Reader.result as string);
        setavatar(Reader.result as string);
      }
    };
  };

  const handleUpdateProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const payload: DataUpdateUser = {
      user: {
        avatar: avatar,
        user_name: username,
        nick_name: nickName,
        bio: bio,
        gender: gender,
      },
    };

    await dispatch(updateProfile(payload));
    dispatch(loadUser());
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <section className={`container-fluid ${styles.profile}`}>
          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <div className={styles.image}>
                <img
                  src={
                    prevAvatar ? prevAvatar : `/assets/images/user-vacant.jpg`
                  }
                  alt=""
                />
              </div>
              <div className={styles.info}>
                <span className={styles.username}>Minh Tai</span>
                <input
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
                <Input
                  required
                  disabled={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputInfo}
                />
              </div>
              <div className={styles.formItem}>
                <label className={styles.formLabel}>User Name</label>
                <Input
                  required
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.inputInfo}
                />
              </div>
              <div className={styles.formItem}>
                <label className={styles.formLabel}>Nick name</label>
                <Input
                  required
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                  className={styles.inputInfo}
                />
              </div>
              <div className={styles.formItem}>
                <label className={styles.formLabel}>Bio</label>
                <Input.TextArea
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={styles.inputInfo}
                />
              </div>
              <div className={styles.formItem}>
                <label className={styles.formLabel}>Gender</label>
                <Radio.Group
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <Radio value={"male"}>Male</Radio>
                  <Radio value={"female"}>Female</Radio>
                </Radio.Group>
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
    </>
  );
};

export default UpdateProfile;
