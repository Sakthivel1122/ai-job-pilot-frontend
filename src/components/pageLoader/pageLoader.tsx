import React from "react";
import CircularLoader from "../circularLoader/circularLoader";
import styles from "./pageLoader.module.scss";

const PageLoader = () => {
  return (
    <div className={styles.PageLoader}>
      <CircularLoader />
    </div>
  );
};

export default PageLoader;
