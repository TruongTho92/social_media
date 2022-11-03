import React from "react";
import styles from "./loadingSpinnerStyles.module.scss";

type Props = {
  width: number;
};

const LoadingSpinner: React.FC<Props> = ({ width }) => {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.loader} style={{ width: width }}></div>
    </div>
  );
};

export default LoadingSpinner;
