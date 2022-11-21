import { Col, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { IoChevronDownOutline, IoCreateOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/Auth/userSlice";
import { profileUserApi } from "~/features/profileUser/profileUserApi";
import { getUserFollowings } from "~/features/profileUser/profileUserSlice";

import styles from "./chatStyles.module.scss";

type Props = {};

const Chat = (props: Props) => {
  const dispatch = useAppDispatch();
  const allUserFollowing = useAppSelector(getUserFollowings);
  const getUserData = useAppSelector(getUser);

  useEffect(() => {
    dispatch(profileUserApi.getProfileUser(getUserData.user.id));
  }, []);

  return (
    <div className={styles.chat}>
      <div className={styles.chatContainer}>
        <Row>
          <Col xs={24} sm={24} md={9}>
            <div className={styles.chatUserList}>
              <div className={styles.user}>
                <Typography className={styles.name}>
                  Minhtai
                  <IoChevronDownOutline
                    color={"#00000"}
                    className={styles.iconDown}
                  />
                </Typography>

                <IoCreateOutline
                  color={"#00000"}
                  className={styles.iconCreateChat}
                />
              </div>
              <ul className={styles.userList}>
                {allUserFollowing?.length > 0
                  ? allUserFollowing.map((user) => (
                      <li className={styles.userItem} key={user.id}>
                        <div className={styles.avatar}>
                          <img
                            src={
                              user.avatar
                                ? user.avatar
                                : "/assets/images/user-vacant.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className={styles.info}>
                          <Typography className={styles.name}>
                            {user.user_name}
                          </Typography>
                          <Typography className={styles.onlineTime}>
                            Active 2h ago
                          </Typography>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </Col>
          <Col xs={0} sm={0} md={15}>
            <div className={styles.messagePlaceholder}>
              <div className={styles.iconSend}>
                <i className="fal fa-inbox"></i>
              </div>
              <Typography className={styles.heading}>Your Messages</Typography>
              <Typography className={styles.description}>
                Send private photos and messages to a friend or group.
              </Typography>
              <button className={styles.buttonSend} type="button">
                Send message
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Chat;
