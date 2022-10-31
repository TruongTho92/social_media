import { Input, Radio, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { DataUpdateUser } from "~/common/types";
import InputPhone from "~/components/Input/InputPhone";
import Loading from "~/components/Loading";
import { userApi } from "~/features/Auth/userApi";
import { getLoading, getUser } from "~/features/Auth/userSlice";
import "./updateAdminProfile.scss";

const UpdateAdminProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getAdminData = useAppSelector(getUser);
  const loadingUpdateProfile = useAppSelector(getLoading);

  const [prevAvatar, setPrevAvatar] = useState(getAdminData.user.avatar);
  const [email, setEmail] = useState(getAdminData.user.email);
  const [username, setUsername] = useState(getAdminData.user.user_name);
  const [validateUserName, setValidateUserName] = useState(false);
  const [nickName, setNickName] = useState(getAdminData.user.nick_name);
  const [validateNickName, setValidateNickName] = useState(false);
  const [phone, setPhone] = useState(getAdminData.user.phone);
  const [bio, setBio] = useState(getAdminData.user.bio);
  const [gender, setGender] = useState(getAdminData.user.gender);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setPrevAvatar(Reader.result as string);
        // setAvatar(Reader.result as string);
      }
    };
  };

  const handleResetImage = () => {
    setPrevAvatar(getAdminData.user.avatar);
  };

  const handleUpdateProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const payload: DataUpdateUser = {
      user: {
        avatar: prevAvatar,
        user_name: username,
        nick_name: nickName,
        phone: phone,
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
    <section className="updateAdminProfile">
      {loadingUpdateProfile ? (
        <Loading />
      ) : (
        <>
          <div className="updateAdminProfile__header">
            <label
              htmlFor="input-avatar"
              className="updateAdminProfile__header-avatar"
            >
              <img
                src={prevAvatar ? prevAvatar : "/assets/images/user-vacant.jpg"}
                alt=""
              />
            </label>
            <div>
              <div className="updateAdminProfile__header-lable-content">
                <label
                  className="updateAdminProfile__header-lable"
                  htmlFor="input-avatar"
                >
                  Change Avatar
                </label>
                <label
                  className="updateAdminProfile__header-lable-reset"
                  onClick={handleResetImage}
                >
                  Reset
                </label>
              </div>
              <Typography className="updateAdminProfile__header-sublable">
                Allowed JPG, GIF or PNG.
              </Typography>
            </div>
            <input
              className="updateAdminProfile__header-input"
              type="file"
              name="input-avatar"
              hidden
              id="input-avatar"
              onChange={handleImageChange}
            />
          </div>
          <div className="updateAdminProfile__body">
            <div className="row">
              <div className="col-xs-12 col-md-6 col-lg-6 ">
                <label
                  className="updateAdminProfile__body-label"
                  htmlFor="input-name"
                >
                  Name
                </label>
                <Input
                  id="input-name"
                  className="updateAdminProfile__body-input"
                  placeholder="name"
                  defaultValue={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (username.length >= 20) {
                      setValidateUserName(true);
                    } else {
                      setValidateUserName(false);
                    }
                  }}
                />
                {validateUserName ? (
                  <div className={`animation-left-to-right errorInputMessage`}>
                    * Up to 20 characters
                  </div>
                ) : null}

                <label
                  className="updateAdminProfile__body-label"
                  htmlFor="input-email"
                >
                  Email
                </label>
                <Input
                  className="updateAdminProfile__body-input"
                  placeholder="email"
                  disabled={true}
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label
                  className="updateAdminProfile__body-label"
                  htmlFor="input-phone"
                >
                  Phone number
                </label>
                <InputPhone
                  className={"updateAdminProfile__body-inputPhone"}
                  value={phone}
                  setValue={setPhone}
                />

                <label className="updateAdminProfile__body-label mt-5">
                  Gender
                </label>
                <Radio.Group
                  defaultValue={gender}
                  className="updateAdminProfile__body-radio"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <Radio value={"male"}>Male</Radio>
                  <Radio value={"female"}>Female</Radio>
                </Radio.Group>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-6 ">
                <label
                  className="updateAdminProfile__body-label"
                  htmlFor="input-nickname"
                >
                  Nick name
                </label>
                <Input
                  id="input-nickname"
                  className="updateAdminProfile__body-input"
                  placeholder="nick name"
                  defaultValue={nickName}
                  onChange={(e) => {
                    setNickName(e.target.value);
                    if (nickName.length >= 20) {
                      setValidateNickName(true);
                    } else {
                      setValidateNickName(false);
                    }
                  }}
                />
                {validateNickName ? (
                  <div className={`animation-left-to-right errorInputMessage`}>
                    * Up to 20 characters
                  </div>
                ) : null}
                <label
                  className="updateAdminProfile__body-label"
                  htmlFor="input-bio"
                >
                  Bio
                </label>
                <Input.TextArea
                  id="input-bio"
                  defaultValue={bio}
                  className="updateAdminProfile__body-input textarea"
                  placeholder="bio"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="updateAminProfile__btn">
            <div className=" d-flex justify-content-center align-items-center">
              <button
                className="updateAminProfile__btn-cancel"
                type="submit"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                className="updateAminProfile__btn-save"
                type="submit"
                onClick={handleUpdateProfile}
              >
                Save
              </button>
            </div>
          </div>
        </>
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
    </section>
  );
};

export default UpdateAdminProfile;
