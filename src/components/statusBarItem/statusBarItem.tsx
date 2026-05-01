import React from "react";
import styles from "./statusBarItem.module.scss";

interface IStatusBarItemProps {
  barPercentage?: number;
  barColor?: string;
  title?: string;
  infoText?: string;
}

const StatusBarItem: React.FC<IStatusBarItemProps> = ({
  barPercentage = 10,
  barColor = "",
  title = "Title",
  infoText = "0%",
}) => {
  return (
    <div className={styles.StatusBarItem}>
      <div className={styles.StatusBarItem_content}>
        <p className={styles.StatusBarItem_content_title}>{title}</p>
        <p className={styles.StatusBarItem_content_info_text}>{infoText}</p>
      </div>
      <div className={styles.StatusBarItem_bar}>
        <div
          className={styles.StatusBarItem_bar_active}
          style={{
            width: `${barPercentage}%`,
            ...(barColor && { backgroundColor: barColor }),
          }}
        ></div>
      </div>
    </div>
  );
};

export default StatusBarItem;
