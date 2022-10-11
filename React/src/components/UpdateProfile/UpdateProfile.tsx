import { Col, Input, Radio, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./updateProfileStyles.module.scss";

const UpdateProfile: React.FC = () => {
  return (
    <section className={`container-fluid ${styles.profile}`}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.image}>
            <img src="/assets/images/user-img.jpg" alt="" />
          </div>
          <div className={styles.info}>
            <span className={styles.username}>Minh Tai</span>
            <input
              type="file"
              name="avatar"
              hidden
              id="input-avatar"
              className={styles.inputAvatar}
            />
            <label htmlFor="input-avatar" className={styles.labelInputAvatar}>
              Change profile photo
            </label>
          </div>
        </div>

        {/* FORM UPDATE PROFILE */}
        <form action="" className={styles.form}>
          <h1 className={styles.formHeading}>Update Your Profile</h1>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>Email</label>
            <Input
              value={"minhtaiday3214@gmail.com"}
              className={styles.inputInfo}
            />
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>Name</label>
            <Input value={"Tran Minh Tai"} className={styles.inputInfo} />
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>User name</label>
            <Input value={"Conianguys"} className={styles.inputInfo} />
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>Bio</label>
            <Input
              value={"http://coniaguys.vercel.app"}
              className={styles.inputInfo}
            />
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>Gender</label>
            <Radio.Group value={"male"}>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"female"}>Female</Radio>
            </Radio.Group>
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>Password</label>
            <Input.Password className={styles.inputInfo} />
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>Confrim password</label>
            <Input.Password className={styles.inputInfo} />
          </div>
          <Row justify="center">
            <Col>
              <Link to="/">
                <button className={styles.btnCancel}>Cancel</button>
              </Link>
            </Col>
            <Col>
              <button type="submit" className={styles.btnSubmit}>
                Submits
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
