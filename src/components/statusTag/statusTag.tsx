import React, { useMemo } from "react";
import styles from "./statusTag.module.scss";
import { TJobApplicationStatus } from "@/types/commonTypes";

interface IStatusTagProps {
  text: string;
  type?: TJobApplicationStatus | "grey" | "black" | "default";
  customClass?: string;
}

const StatusTag: React.FC<IStatusTagProps> = ({ text, type, customClass }) => {
  const styleClassName = useMemo(() => {
    switch (type) {
      case "applied":
        return styles.StatusTag_applied;
      case "interview_scheduled":
        return styles.StatusTag_interview_scheduled;
      case "interviewing":
        return styles.StatusTag_interviewing;
      case "selected":
        return styles.StatusTag_selected;
      case "rejected":
        return styles.StatusTag_rejected;
      case "grey":
        return styles.StatusTag_grey;
      case "black":
        return styles.StatusTag_black;
      case "default":
      default:
        return styles.StatusTag_default;
    }
  }, [type]);
  return (
    <p className={`${styles.StatusTag} ${styleClassName} ${customClass}`}>
      {text}
    </p>
  );
};

export default StatusTag;
