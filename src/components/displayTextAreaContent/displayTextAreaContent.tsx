import React from "react";
import styles from "./displayTextAreaContent.module.scss";

const DisplayTextAreaContent = ({
  text,
  customTextClass,
}: {
  text: string;
  customTextClass?: string;
}) => {
  return (
    <div className={styles.DisplayTextAreaContent}>
      <p className={customTextClass}>{text}</p>
    </div>
  );
};

export default DisplayTextAreaContent;
