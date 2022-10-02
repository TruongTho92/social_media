import { Checkbox } from "antd";
import React from "react";
import styles from "./passRequired.module.scss";

export interface PropsTypes {
  capsLetterFlag: boolean;
  numberFlag: boolean;
  pwdLengthFlag: boolean;
  specialCharFlag: boolean;
}

export const PassRequired = ({
  capsLetterFlag,
  numberFlag,
  pwdLengthFlag,
  specialCharFlag,
}: PropsTypes) => {
  return (
    <div className={styles.checkboxContainer}>
      <Checkbox
        checked={capsLetterFlag}
        className={capsLetterFlag ? styles.checkedBoxItem : styles.checkboxItem}
      >
        Must contain 1 capital letter
      </Checkbox>
      <Checkbox
        checked={numberFlag}
        className={numberFlag ? styles.checkedBoxItem : styles.checkboxItem}
      >
        Must contain number
      </Checkbox>
      <Checkbox
        checked={pwdLengthFlag}
        className={pwdLengthFlag ? styles.checkedBoxItem : styles.checkboxItem}
      >
        Must be 8 chars long
      </Checkbox>
      <Checkbox
        checked={specialCharFlag}
        className={
          specialCharFlag ? styles.checkedBoxItem : styles.checkboxItem
        }
      >
        Must contain 1 special character
      </Checkbox>
    </div>
  );
};
