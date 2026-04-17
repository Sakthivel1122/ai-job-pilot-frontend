import React, { useMemo } from "react";
import styles from "./countInfoCard.module.scss";
import { IconType } from "react-icons";

interface ICountInfoCardProps {
  type?: "default" | "applied" | "interviews" | "offers" | "plain";
  count: number | string;
  title: string;
  description: string;
  colorTheme?: string;
  Icon: IconType;
}

const CountInfoCard: React.FC<ICountInfoCardProps> = ({
  title,
  description,
  count,
  type = "default",
  colorTheme = "",
  Icon,
}) => {
  const getClassName = useMemo(() => {
    switch (type) {
      case "applied":
        return styles.applied;
      case "interviews":
        return styles.interviews;
      case "offers":
        return styles.offers;
      case "plain":
        return styles.plain;
      default:
        break;
    }
  }, [type]);
  return (
    <div className={`${styles.CountInfoCard} ${getClassName}`}>
      <div className={styles.CountInfoCard_details_wrapper}>
        <p className={styles.CountInfoCard_title}>{title}</p>
        <p
          className={styles.CountInfoCard_count}
          style={colorTheme ? { color: colorTheme } : {}}
        >
          {count}
        </p>
        <p className={styles.CountInfoCard_description}>{description}</p>
      </div>
      <div className={styles.CountInfoCard_icon_wrapper}>
        <Icon
          className={styles.CountInfoCard_icon}
          style={colorTheme ? { color: colorTheme } : {}}
        />
      </div>
    </div>
  );
};

export default CountInfoCard;
