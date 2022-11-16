import { Typography } from "antd";
import React, { useEffect } from "react";
import styles from "./introStyles.module.scss";
type Props = {};

const Intro = (props: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document
        .querySelector(`.${styles.intro}`)
        ?.classList.add(`${styles.hidden}`);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const card = document.querySelector(`.${styles.cardGroup}`);
      card?.classList.add(`${styles.active}`);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className={styles.intro}>
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
      <Typography className={styles.cardTitle}>Social Media App</Typography>
    </div>
  );
};

export default Intro;
