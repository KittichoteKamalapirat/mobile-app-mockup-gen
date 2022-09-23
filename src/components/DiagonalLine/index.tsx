import React from "react";
import styles from "./index.module.css";

interface Props {}

const DiagonalLine = ({}: Props) => {
  return (
    <div className={styles.box}>
      <div className={styles.line}></div>
    </div>
  );
};
export default DiagonalLine;
