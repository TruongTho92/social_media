import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { getUser } from "~/features/Auth/userSlice";
import { profileUserApi } from "~/features/profileUser/profileUserApi";
import { getUserFollowings } from "~/features/profileUser/profileUserSlice";
import { NextArrow, PrevArrow } from "../ArrowSlickCustom/ArrowSlickCustom";
import styles from "./storyStyles.module.scss";
type Props = {};

const Story: React.FC<Props> = () => {
  const userFollowings = useAppSelector(getUserFollowings);
  const getUserData = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const settings = {
    dots: false,
    slidesToShow: userFollowings.length > 6 ? 6 : userFollowings.length,
    slidesToScroll: 1,
    infinite: false,
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
    responsive: [
      {
        breakpoint: 769,
        settings: {
          dots: false,
          infinite: false,

          slidesToShow: userFollowings.length > 5 ? 5 : userFollowings.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: false,
          arrows: false,
          slidesToShow: userFollowings.length > 5 ? 5 : userFollowings.length,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(profileUserApi.getProfileUser(getUserData.user.id));
  }, []);

  return (
    <div className={styles.story}>
      <ul className={styles.userList}>
        <Slider {...settings}>
          {userFollowings.map((item) => (
            <li className={styles.userItem} key={item.id}>
              <Link to={`/user-profile/${item.id}`}>
                <div className={styles.userItemImg}>
                  <img
                    src={
                      item.avatar
                        ? item.avatar
                        : `/assets/images/user-vacant.jpg`
                    }
                    alt=""
                  />
                </div>
              </Link>
            </li>
          ))}
        </Slider>
      </ul>
    </div>
  );
};

export default Story;
