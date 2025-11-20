import React from "react";
import styles from "./simpleApplicationInfoCard.module.scss";
import { IoDocumentTextOutline } from "react-icons/io5";
import StatusTag from "../statusTag/statusTag";

interface ISimpleApplicationInfoCardProps {
  title: string;
  description?: string;
  tagText?: string;
  tagType?:
    | "applied"
    | "interview_scheduled"
    | "interviewing"
    | "selected"
    | "rejected"
    | "grey"
    | "black"
    | "default";
}

const SimpleApplicationInfoCard: React.FC<ISimpleApplicationInfoCardProps> = ({
  title,
  description,
  tagText,
  tagType,
}) => {
  return (
    <div className={styles.SimpleApplicationInfoCard}>
      <div className={styles.SimpleApplicationInfoCard_document_icon_wrapper}>
        <IoDocumentTextOutline
          className={styles.SimpleApplicationInfoCard_document_icon}
        />
      </div>
      <div className={styles.SimpleApplicationInfoCard_detail_wtapper}>
        <p className={styles.SimpleApplicationInfoCard_text1}>{title}</p>
        <p className={styles.SimpleApplicationInfoCard_text2}>{description}</p>
      </div>
      {tagText && tagType && <StatusTag text={tagText} type={tagType} />}
    </div>
  );
};

export default SimpleApplicationInfoCard;
