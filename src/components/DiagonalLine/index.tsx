import React from "react";
import styles from "./index.module.css";

interface Props {
  isActive: boolean;
}

const DiagonalLine = ({ isActive }: Props) => {
  return (
    <div
      className={`${styles.box} border-2 border-solid  ${
        isActive ? "border-primary" : "border-grey-200"
      }`}
    >
      <div className={styles.line}></div>
    </div>
  );
};
export default DiagonalLine;
