import React from "react";
import styles from "./loadingStyles.module.scss";
type Props = {};

const Loading = (props: Props) => {
  return (
    <div className={styles.loadingContainer}>
      <span className={styles.loader}>
        <span className={styles.loaderInner}></span>
      </span>
    </div>
  );
};

export default Loading;
