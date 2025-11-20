import React from "react";
import styles from "./featureInfoCard.module.scss";
import { IconType } from "react-icons";
import { IoIosSearch } from "react-icons/io";

type IFeatureInfoCardProps = {
  Icon: IconType;
  iconColor?: string;
  title: string;
  description: string;
};

const FeatureInfoCard: React.FC<IFeatureInfoCardProps> = ({
  Icon,
  iconColor,
  title,
  description,
}) => {
  return (
    <div className={styles.FeatureInfoCard}>
      <div className={styles.FeatureInfoCard_icon_wrapper}>
        <Icon
          className={styles.FeatureInfoCard_icon}
          style={iconColor ? { color: iconColor } : {}}
        />
      </div>
      <p className={styles.FeatureInfoCard_title}>{title}</p>
      <p className={styles.FeatureInfoCard_description}>{description}</p>
    </div>
  );
};

export default FeatureInfoCard;
