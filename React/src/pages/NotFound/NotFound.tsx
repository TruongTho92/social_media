import React from "react";
import styles from "./notfoundStyles.module.scss";
import { SiFacepunch } from "react-icons/si";

const NotFound = () => {
  return (
    <div className={`container-fluid pt-80 ${styles.notfound}`}>
      <SiFacepunch className={styles.iconEyes} />
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.description}>Why...?</p>
      </div>
      <SiFacepunch className={styles.iconEyes} />
    </div>
  );
};

export default NotFound;
