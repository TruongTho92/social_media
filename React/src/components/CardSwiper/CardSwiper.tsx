import React, { useEffect } from "react";
import styles from "./cardSwiperStyles.module.scss";

type Props = {};

const CardSwiper = (props: Props) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     document
  //       .querySelector(`.${styles.cardGroup}`)
  //       ?.classList.add(`${styles.active}`);
  //   }, 500);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);
  return (
    <div className={styles.cardGroup}>
      <div className={`${styles.littleCard} ${styles.card}`}></div>
      <div className={`${styles.bigCard} ${styles.card}`}></div>
      <div className={`${styles.littleCard} ${styles.card}`}></div>
      <div className={`${styles.bigCard} ${styles.card}`}></div>
      <div className={`${styles.littleCard} ${styles.card}`}></div>
      <div className={`${styles.bigCard} ${styles.card}`}></div>
      <div className={`${styles.littleCard} ${styles.card}`}></div>
      <div className={`${styles.bigCard} ${styles.card}`}></div>
    </div>
  );
};

export default CardSwiper;
