"use client";
import React, { useState } from "react";
import styles from "./resumeCard.module.scss";
import StatusTag from "@/components/statusTag/statusTag";
import DisplayTextAreaContent from "@/components/displayTextAreaContent/displayTextAreaContent";
import { TResumeData } from "@/types/apiResponseTypes";
import moment from "moment";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface IResumeCardProps {
  data: TResumeData;
}
const ResumeCard: React.FC<IResumeCardProps> = ({ data }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const uploadedDate = moment(data?.created_at).format("DD MMM YYYY, h:mm A");
  return (
    <div className={styles.ResumeCard}>
      <div className={styles.ResumeCard_top}>
        <div className={styles.ResumeCard_top_resume_name_wrapper}>
          <p className={styles.ResumeCard_top_resume_name}>{data?.name}</p>
          <StatusTag text={`${data?.ai_score * 10}% Match`} />
        </div>
        <p className={styles.ResumeCard_top_uploaded_time}>
          Uploaded at {uploadedDate}
        </p>
        <div className={styles.ResumeCard_top_ai_score_wrapper}>
          <div className={styles.ResumeCard_top_ai_score_title_wrapper}>
            <p className={styles.ResumeCard_top_ai_score_title}>
              AI Match Score
            </p>
            <p className={styles.ResumeCard_top_ai_score_text}>
              {`${data?.ai_score * 10}%`}
            </p>
          </div>
          <div className={styles.ResumeCard_top_ai_score_line_wrapper}>
            <span
              className={styles.ResumeCard_top_ai_score_line}
              style={{ width: `${data?.ai_score * 10}%` }}
            />
          </div>
        </div>
        <button
          className={styles.ResumeCard_top_view_feedback_btn}
          onClick={() => setShowFeedback(!showFeedback)}
        >
          <p>{showFeedback ? "Hide Feedback" : "View Feedback"}</p>
          <IoIosArrowDown
            className={`${styles.ResumeCard_top_view_feedback_btn_icon} ${
              showFeedback && styles.open
            }`}
          />
          {/* {showFeedback ? (
            <IoIosArrowUp
              className={styles.ResumeCard_top_view_feedback_btn_icon}
            />
          ) : (
            <IoIosArrowDown
              className={styles.ResumeCard_top_view_feedback_btn_icon}
            />
          )} */}
        </button>
      </div>
      {showFeedback && (
        <div className={styles.ResumeCard_bottom}>
          <p className={styles.ResumeCard_bottom_title}>AI Summary</p>
          <div className={styles.ResumeCard_bottom_text}>
            <DisplayTextAreaContent text={data.ai_summary} />
          </div>
          <p className={styles.ResumeCard_bottom_title}>Key Suggestions</p>
          <div className={styles.ResumeCard_bottom_text_wrapper}>
            <DisplayTextAreaContent
              text={data.ai_feedback}
              customTextClass={styles.ResumeCard_bottom_text}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeCard;
